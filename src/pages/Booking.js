import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert, Card, Row, Col } from 'react-bootstrap';
import '../styles/booking.css';

const Booking = () => {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const [packageItem, setPackageItem] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    travelers: 1,
    travelDate: '',
    specialRequests: ''
  });
  const [errors, setErrors] = useState({});
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

   
    const userEmail = localStorage.getItem('userEmail');
    setFormData(prev => ({
      ...prev,
      email: userEmail || ''
    }));

    
    const packages = JSON.parse(localStorage.getItem('travelPackages')) || [];
    const selectedPackage = packages.find(pkg => pkg.id === parseInt(packageId));

    if (selectedPackage) {
      setPackageItem(selectedPackage);
    } else {
      navigate('/');
    }
  }, [packageId, navigate]);

  const validateForm = () => {
    const newErrors = {};
    const phoneRegex = /^[6-9]\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (formData.fullName.length < 5) {
      newErrors.fullName = 'Full name must be at least 5 characters';
    }

    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Phone number must start with 6-9 and have 10 digits';
    }

    if (!formData.address) {
      newErrors.address = 'Please enter your address';
    }

    if (formData.travelers < 1 || formData.travelers > packageItem.seatsAvailable) {
      newErrors.travelers = `Number of travelers must be between 1 and ${packageItem.seatsAvailable}`;
    }

    if (!formData.travelDate) {
      newErrors.travelDate = 'Please select a travel date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      
      const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
      const booking = {
        id: Date.now(),
        type: 'package',
        packageId: packageItem.id,
        packageName: packageItem.name,
        destination: packageItem.destination, 
        duration: packageItem.duration, 
        price: packageItem.price, 
        userEmail: localStorage.getItem('userEmail'),
        ...formData,
        totalPrice: packageItem.price * formData.travelers, 
        bookingDate: new Date().toISOString(),
        status: 'confirmed',
        image: packageItem.image 
      };
      bookings.push(booking);
      localStorage.setItem('bookings', JSON.stringify(bookings));

     
      const packages = JSON.parse(localStorage.getItem('travelPackages')) || [];
      const updatedPackages = packages.map(pkg => {
        if (pkg.id === packageItem.id) {
          return {
            ...pkg,
            seatsAvailable: pkg.seatsAvailable - formData.travelers
          };
        }
        return pkg;
      });
      localStorage.setItem('travelPackages', JSON.stringify(updatedPackages));

      setBookingSuccess(true);
    }
  };

  if (!packageItem) return null;

  return (
    <Container className="booking-container">
      <h2 className="text-center mb-4 mt-5">Book Your Package: {packageItem.name}</h2>
      
      {bookingSuccess ? (
        <Alert variant="success">
          <h4>Booking Confirmed!</h4>
          <p>Thank you for booking {packageItem.name}.</p>
          <p>A confirmation has been sent to your email at {formData.email}.</p>
          <div className="d-flex gap-2">
            <Button variant="primary" onClick={() => navigate('/')}>Back to Home</Button>
            <Button variant="outline-primary" onClick={() => navigate('/my-bookings')}>View My Bookings</Button>
          </div>
        </Alert>
      ) : (
        <Row>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Img variant="top" src={packageItem.image} style={{ height: '200px', objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title>{packageItem.name}</Card.Title>
                <Card.Text>
                  <strong>Destination:</strong> {packageItem.destination}<br />
                  <strong>Duration:</strong> {packageItem.duration}<br />
                  <strong>Price per person:</strong> Rs.{packageItem.price}<br />
                  <strong>Seats Available:</strong> {packageItem.seatsAvailable}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  isInvalid={!!errors.fullName}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.fullName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                  required
                  disabled // Disabled since we're auto-populating from logged-in user
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  isInvalid={!!errors.phone}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  isInvalid={!!errors.address}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.address}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Number of Travelers</Form.Label>
                <Form.Control
                  type="number"
                  name="travelers"
                  min="1"
                  max={packageItem.seatsAvailable}
                  value={formData.travelers}
                  onChange={handleChange}
                  isInvalid={!!errors.travelers}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.travelers}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Travel Date</Form.Label>
                <Form.Control
                  type="date"
                  name="travelDate"
                  value={formData.travelDate}
                  onChange={handleChange}
                  isInvalid={!!errors.travelDate}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.travelDate}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Special Requests</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                />
              </Form.Group>

              <div className="d-flex justify-content-between align-items-center">
                <Button variant="primary" type="submit">
                  Confirm Booking
                </Button>
                <div className="text-end">
                  <h5>Total: ${packageItem.price * formData.travelers}</h5>
                </div>
              </div>
            </Form>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Booking;