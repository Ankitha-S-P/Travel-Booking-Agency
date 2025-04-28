import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/hotelbooking.css';

const HotelBooking = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({
    destination: '',
    roomType: '',
    checkIn: '',
    checkOut: ''
  });
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    email: '',
    adults: 1,
    children: 0,
    specialRequests: ''
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const navigate = useNavigate();

  // Sample hotel data - in a real app, this would come from an API
  const sampleHotels = [
    {
      id: 1,
      name: 'ITC Grand',
      destination: 'Chennai',
      description: 'Luxury hotel in the heart of Manhattan with stunning city views.',
      price: 8500,
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      amenities: ['Free WiFi', 'Swimming Pool', 'Spa', 'Fitness Center'],
      roomTypes: ['Deluxe', 'Suite', 'Executive']
    },
    {
      id: 2,
      name: 'Beach Resort & Spa',
      destination: 'Goa',
      description: 'Oceanfront resort with private beach access and full-service spa.',
      price: 3200,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4.6,
      amenities: ['Private Beach', 'Restaurant', 'Bar', 'Kids Club'],
      roomTypes: ['Standard', 'Ocean View', 'Family Suite']
    },
    {
      id: 3,
      name: 'Mountain View Lodge',
      destination: 'Shimla',
      description: 'Cozy lodge with breathtaking mountain views and outdoor activities.',
      price: 1800,
      image: 'https://media-cdn.tripadvisor.com/media/photo-s/0e/66/1f/75/hotel-facade.jpg',
      rating: 4.5,
      amenities: ['Free Parking', 'Hot Tub', 'Hiking Trails', 'Restaurant'],
      roomTypes: ['Standard', 'Mountain View', 'Family Room']
    },
    {
      id: 4,
      name: 'Le Meridian',
      destination: 'Kochi',
      description: 'Breath taking marine drive view and amazing sea food.',
      price: 8999,
      image: 'https://www.capertravelindia.com/images/kerala-hotels-6.jpg',
      rating: 4.9,
      amenities: ['Free Parking', 'Hot Tub', 'Hiking Trails', 'Restaurant'],
      roomTypes: ['Standard', 'Sea View', 'Family Room']
    }
  ];

  useEffect(() => {
    setHotels(sampleHotels);
    setFilteredHotels(sampleHotels);
    setLoading(false);

    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      const userEmail = localStorage.getItem('userEmail');
      setBookingDetails(prev => ({
        ...prev,
        email: userEmail
      }));
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = hotels.filter(hotel => {
      const matchesDestination = searchParams.destination === '' || 
        hotel.destination.toLowerCase().includes(searchParams.destination.toLowerCase());
      const matchesRoomType = searchParams.roomType === '' || 
        hotel.roomTypes.includes(searchParams.roomType);
      return matchesDestination && matchesRoomType;
    });
    setFilteredHotels(filtered);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBookingInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const openBookingModal = (hotel) => {
    setSelectedHotel(hotel);
    setShowBookingModal(true);
  };

  const closeBookingModal = () => {
    setShowBookingModal(false);
    setSelectedHotel(null);
  };

  const calculateTotalPrice = () => {
    if (!selectedHotel) return 0;
    const nights = Math.ceil((new Date(searchParams.checkOut) - new Date(searchParams.checkIn)) / (1000 * 60 * 60 * 24));
    return selectedHotel.price * nights * (parseInt(bookingDetails.adults) + Math.ceil(parseInt(bookingDetails.children) / 2));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    const booking = {
      id: Date.now(),
      type: 'hotel',
      hotelId: selectedHotel.id,
      hotelName: selectedHotel.name,
      destination: selectedHotel.destination,
      checkIn: searchParams.checkIn,
      checkOut: searchParams.checkOut,
      roomType: searchParams.roomType,
      adults: bookingDetails.adults,
      children: bookingDetails.children,
      specialRequests: bookingDetails.specialRequests,
      totalPrice: calculateTotalPrice(),
      status: 'confirmed',
      bookingDate: new Date().toISOString(),
      userEmail: bookingDetails.email
    };

    // Save booking to localStorage
    const existingBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    localStorage.setItem('bookings', JSON.stringify([...existingBookings, booking]));

    // Show success message
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      closeBookingModal();
      navigate('/my-bookings');
    }, 2000);
  };

  return (
    <Container className="hotel-booking-container my-4">
      <h2 className="text-center mb-4">Find Your Perfect Hotel</h2>
      
      {/* Search Form */}
      <Card className="mb-4">
        <Card.Body>
          <Form onSubmit={handleSearch}>
            <Row>
              <Col md={3}>
                <Form.Group controlId="destination">
                  <Form.Label>Destination</Form.Label>
                  <Form.Control
                    type="text"
                    name="destination"
                    value={searchParams.destination}
                    onChange={handleInputChange}
                    placeholder="City or Hotel"
                  />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group controlId="roomType">
                  <Form.Label>Room Type</Form.Label>
                  <Form.Control
                    as="select"
                    name="roomType"
                    value={searchParams.roomType}
                    onChange={handleInputChange}
                  >
                    <option value="">Any Type</option>
                    <option value="Standard">Standard</option>
                    <option value="Deluxe">Deluxe</option>
                    <option value="Suite">Suite</option>
                    <option value="Executive">Executive</option>
                    <option value="Family Room">Family Room</option>
                    <option value="Ocean View">Ocean View</option>
                    <option value="Mountain View">Mountain View</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group controlId="checkIn">
                  <Form.Label>Check In</Form.Label>
                  <Form.Control
                    type="date"
                    name="checkIn"
                    value={searchParams.checkIn}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group controlId="checkOut">
                  <Form.Label>Check Out</Form.Label>
                  <Form.Control
                    type="date"
                    name="checkOut"
                    value={searchParams.checkOut}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={3} className="d-flex align-items-end">
                <Button y type="submit" className="w-100 submitBtn">
                  Search Hotels
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {/* Results */}
      {loading ? (
        <p>Loading hotels...</p>
      ) : filteredHotels.length === 0 ? (
        <Alert variant="info">
          No hotels found matching your criteria. Please try different search parameters.
        </Alert>
      ) : (
        <div className="hotel-list">
          {filteredHotels.map(hotel => (
            <Card key={hotel.id} className="mb-4 hotel-card">
              <Row className="g-0">
                <Col md={4}>
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="img-fluid rounded-start hotel-image"
                  />
                </Col>
                <Col md={8}>
                  <Card.Body>
                    <Row>
                      <Col md={8}>
                        <Card.Title>{hotel.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {hotel.destination} • Rating: {hotel.rating}/5
                        </Card.Subtitle>
                        <Card.Text>{hotel.description}</Card.Text>
                        <div className="amenities mb-3">
                          {hotel.amenities.map((amenity, index) => (
                            <span key={index} className="badge bg-secondary me-2">{amenity}</span>
                          ))}
                        </div>
                      </Col>
                      <Col md={4} className="text-end">
                        <h4>Rs.{hotel.price} <small className="text-muted">/ night</small></h4>
                        <Button
                          variant="primary"
                          onClick={() => openBookingModal(hotel)}
                          className="mt-3 submitBtn"
                        >
                          Book Now
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          ))}
        </div>
      )}

      {/* Booking Modal */}
      <Modal show={showBookingModal} onHide={closeBookingModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Book {selectedHotel?.name}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleBookingSubmit}>
          <Modal.Body>
            {bookingSuccess ? (
              <Alert variant="success" className="text-center">
                <h4>Booking Confirmed!</h4>
                <p>Your reservation at {selectedHotel?.name} has been successfully booked.</p>
                <p>Total: Rs.{calculateTotalPrice()}</p>
                <p>You will be redirected to your bookings shortly.</p>
              </Alert>
            ) : (
              <>
                <Row>
                  <Col md={6}>
                    <img
                      src={selectedHotel?.image}
                      alt={selectedHotel?.name}
                      className="img-fluid rounded mb-3"
                    />
                    <h5>{selectedHotel?.name}</h5>
                    <p>{selectedHotel?.destination}</p>
                    <p>${selectedHotel?.price} per night</p>
                  </Col>
                  <Col md={6}>
                    <h5>Booking Details</h5>
                    <Form.Group className="mb-3" controlId="name">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={bookingDetails.name}
                        onChange={handleBookingInputChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={bookingDetails.email}
                        onChange={handleBookingInputChange}
                        required
                      />
                    </Form.Group>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="checkIn">
                          <Form.Label>Check In</Form.Label>
                          <Form.Control
                            type="date"
                            name="checkIn"
                            value={searchParams.checkIn}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="checkOut">
                          <Form.Label>Check Out</Form.Label>
                          <Form.Control
                            type="date"
                            name="checkOut"
                            value={searchParams.checkOut}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="adults">
                          <Form.Label>Adults</Form.Label>
                          <Form.Control
                            as="select"
                            name="adults"
                            value={bookingDetails.adults}
                            onChange={handleBookingInputChange}
                          >
                            {[1, 2, 3, 4, 5].map(num => (
                              <option key={num} value={num}>{num}</option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="children">
                          <Form.Label>Children</Form.Label>
                          <Form.Control
                            as="select"
                            name="children"
                            value={bookingDetails.children}
                            onChange={handleBookingInputChange}
                          >
                            {[0, 1, 2, 3, 4].map(num => (
                              <option key={num} value={num}>{num}</option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group className="mb-3" controlId="specialRequests">
                      <Form.Label>Special Requests</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="specialRequests"
                        value={bookingDetails.specialRequests}
                        onChange={handleBookingInputChange}
                      />
                    </Form.Group>
                    <div className="total-price p-3 bg-light rounded">
                      <h5>Total Price: Rs.{calculateTotalPrice()}</h5>
                      <small className="text-muted">
                        {Math.ceil((new Date(searchParams.checkOut) - new Date(searchParams.checkIn)) / (1000 * 60 * 60 * 24))} nights
                      </small>
                    </div>
                  </Col>
                </Row>
              </>
            )}
          </Modal.Body>
          {!bookingSuccess && (
            <Modal.Footer>
              <Button variant="secondary" onClick={closeBookingModal}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Confirm Booking
              </Button>
            </Modal.Footer>
          )}
        </Form>
      </Modal>
    </Container>
  );
};

export default HotelBooking;