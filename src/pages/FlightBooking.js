import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Modal, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/flightbooking.css';

const FlightBooking = () => {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    tripType: 'one-way',
    passengers: 1
  });
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    email: '',
    passport: '',
    seatPreference: 'any'
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const navigate = useNavigate();

  // Sample flight data with dates after April 28, 2025
  const sampleFlights = [
    {
      id: 1,
      airline: 'AirIndia',
      flightNumber: 'AI101',
      origin: 'Chennai (MAA)',
      destination: 'New Delhi(DEL)',
      departureTime: '2025-05-15T08:00:00',
      arrivalTime: '2025-05-15T10:30:00',
      duration: '2h 30m',
      price: 5500,
      seatsAvailable: 120,
      aircraft: 'Boeing 787',
      baggageAllowance: '15kg',
      cabinClass: 'Economy'
    },
    {
      id: 2,
      airline: 'Indigo',
      flightNumber: '6E205',
      origin: 'New Delhi (DEL)',
      destination: 'Chennai (MAA)',
      departureTime: '2025-05-20T14:30:00',
      arrivalTime: '2025-05-21T16:45:00',
      duration: '2h 15m',
      price: 5200,
      seatsAvailable: 80,
      aircraft: 'Airbus A350',
      baggageAllowance: '15kg',
      cabinClass: 'Economy'
    },
    {
      id: 3,
      airline: 'Vistara',
      flightNumber: 'VI789',
      origin: 'Bengaluru (BLR)',
      destination: 'Paris (CDG)',
      departureTime: '2025-06-10T06:45:00',
      arrivalTime: '2025-06-10T15:30:00',
      duration: '9h 45m',
      price: 38000,
      seatsAvailable: 95,
      aircraft: 'Boeing 777',
      baggageAllowance: '2 x 23kg',
      cabinClass: 'Economy'
    },
    {
      id: 4,
      airline: 'Continental',
      flightNumber: 'CT302',
      origin: 'London (LHR)',
      destination: 'New York (JFK)',
      departureTime: '2025-05-18T09:45:00',
      arrivalTime: '2025-05-18T15:30:00',
      duration: '6h 45m',
      price: 45000,
      seatsAvailable: 110,
      aircraft: 'Boeing 787',
      baggageAllowance: '2 x 23kg',
      cabinClass: 'Economy'
    },
    {
      id: 5,
      airline: 'Pacific Air',
      flightNumber: 'PA456',
      origin: 'Tokyo (NRT)',
      destination: 'Sydney (SYD)',
      departureTime: '2025-07-05T22:15:00',
      arrivalTime: '2025-07-06T09:30:00',
      duration: '9h 15m',
      price: 68000,
      seatsAvailable: 75,
      aircraft: 'Airbus A380',
      baggageAllowance: '2 x 23kg',
      cabinClass: 'Economy'
    }
  ];

  useEffect(() => {
    setFlights(sampleFlights);
    setFilteredFlights(sampleFlights);
    setLoading(false);

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
    const filtered = flights.filter(flight => {
      const matchesOrigin = searchParams.origin === '' || 
        flight.origin.toLowerCase().includes(searchParams.origin.toLowerCase());
      const matchesDestination = searchParams.destination === '' || 
        flight.destination.toLowerCase().includes(searchParams.destination.toLowerCase());
      const matchesDate = searchParams.departureDate === '' || 
        new Date(flight.departureTime).toDateString() === new Date(searchParams.departureDate).toDateString();
      
      return matchesOrigin && matchesDestination && matchesDate;
    });
    setFilteredFlights(filtered);
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

  const openBookingModal = (flight) => {
    setSelectedFlight(flight);
    setShowBookingModal(true);
  };

  const closeBookingModal = () => {
    setShowBookingModal(false);
    setSelectedFlight(null);
  };

  const calculateTotalPrice = () => {
    if (!selectedFlight) return 0;
    return selectedFlight.price * searchParams.passengers;
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    const booking = {
      id: Date.now(),
      type: 'flight',
      flightId: selectedFlight.id,
      airline: selectedFlight.airline,
      flightNumber: selectedFlight.flightNumber,
      origin: selectedFlight.origin,
      destination: selectedFlight.destination,
      departureTime: selectedFlight.departureTime,
      arrivalTime: selectedFlight.arrivalTime,
      passengers: searchParams.passengers,
      seatPreference: bookingDetails.seatPreference,
      totalPrice: calculateTotalPrice(),
      status: 'confirmed',
      bookingDate: new Date().toISOString(),
      userEmail: bookingDetails.email
    };

    const existingBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    localStorage.setItem('bookings', JSON.stringify([...existingBookings, booking]));

    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      closeBookingModal();
      navigate('/my-bookings');
    }, 2000);
  };

  const formatTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateTime) => {
    const date = new Date(dateTime);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <Container className="flight-booking-container my-4">
      <h2 className="text-center mb-4">Find Your Perfect Flight</h2>
      
      {/* Search Form */}
      <Card className="mb-4">
        <Card.Body>
          <Form onSubmit={handleSearch}>
            <Row>
              <Col md={2}>
                <Form.Group controlId="tripType">
                  <Form.Label>Trip Type</Form.Label>
                  <Form.Control
                    as="select"
                    name="tripType"
                    value={searchParams.tripType}
                    onChange={handleInputChange}
                  >
                    <option value="one-way">One Way</option>
                    <option value="round-trip">Round Trip</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group controlId="origin">
                  <Form.Label>From</Form.Label>
                  <Form.Control
                    type="text"
                    name="origin"
                    value={searchParams.origin}
                    onChange={handleInputChange}
                    placeholder="City or Airport"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group controlId="destination">
                  <Form.Label>To</Form.Label>
                  <Form.Control
                    type="text"
                    name="destination"
                    value={searchParams.destination}
                    onChange={handleInputChange}
                    placeholder="City or Airport"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group controlId="departureDate">
                  <Form.Label>Departure Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="departureDate"
                    value={searchParams.departureDate}
                    onChange={handleInputChange}
                    required
                    min="2025-04-29"
                  />
                </Form.Group>
              </Col>
              {searchParams.tripType === 'round-trip' && (
                <Col md={2}>
                  <Form.Group controlId="returnDate">
                    <Form.Label>Return Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="returnDate"
                      value={searchParams.returnDate}
                      onChange={handleInputChange}
                      required
                      min={searchParams.departureDate || '2025-04-29'}
                    />
                  </Form.Group>
                </Col>
              )}
              <Col md={2}>
                <Form.Group controlId="passengers">
                  <Form.Label>Passengers</Form.Label>
                  <Form.Control
                    as="select"
                    name="passengers"
                    value={searchParams.passengers}
                    onChange={handleInputChange}
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <div className="text-center mt-3">
              <Button  type="submit" className="px-5 submitBtn">
                Search Flights
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* Results */}
      {loading ? (
        <p>Loading flights...</p>
      ) : filteredFlights.length === 0 ? (
        <Alert variant="info">
          No flights found matching your criteria. Please try different search parameters.
        </Alert>
      ) : (
        <div className="flight-list">
          {filteredFlights.map(flight => (
            <Card key={flight.id} className="mb-3 flight-card">
              <Card.Body>
                <Row className="align-items-center">
                  <Col md={2} className="text-center">
                    <div className="airline-logo">
                      <i className="fas fa-plane fa-3x"></i>
                    </div>
                    <div className="airline-name">{flight.airline}</div>
                    <div className="flight-number">{flight.flightNumber}</div>
                  </Col>
                  <Col md={3}>
                    <div className="flight-time">
                      <div className="time">{formatTime(flight.departureTime)}</div>
                      <div className="airport">{flight.origin}</div>
                      <div className="date">{formatDate(flight.departureTime)}</div>
                    </div>
                  </Col>
                  <Col md={2} className="text-center">
                    <div className="flight-duration">
                      <div>{flight.duration}</div>
                      <div className="flight-route">
                        <hr />
                        <i className="fas fa-plane"></i>
                      </div>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="flight-time">
                      <div className="time">{formatTime(flight.arrivalTime)}</div>
                      <div className="airport">{flight.destination}</div>
                      <div className="date">{formatDate(flight.arrivalTime)}</div>
                    </div>
                  </Col>
                  <Col md={2} className="text-center">
                    <div className="flight-price">
                    <h4 className="text-success">Rs.{flight.price}</h4>
                      <div className="text-muted">per passenger</div>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => openBookingModal(flight)}
                        className="mt-2 submitBtn"
                      >
                        Book Now
                      </Button>
                    </div>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col>
                    <div className="flight-details">
                      <span className="badge bg-light text-dark me-2">
                        <i className="fas fa-chair me-1"></i> {flight.cabinClass}
                      </span>
                      <span className="badge bg-light text-dark me-2">
                        <i className="fas fa-suitcase me-1"></i> {flight.baggageAllowance}
                      </span>
                      <span className="badge bg-light text-dark">
                        <i className="fas fa-plane me-1"></i> {flight.aircraft}
                      </span>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}

      {/* Booking Modal */}
      <Modal show={showBookingModal} onHide={closeBookingModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Book Flight {selectedFlight?.flightNumber}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleBookingSubmit}>
          <Modal.Body>
            {bookingSuccess ? (
              <Alert variant="success" className="text-center">
                <h4>Booking Confirmed!</h4>
                <p>Your flight with {selectedFlight?.airline} has been successfully booked.</p>
                <p>Total: Rs.{calculateTotalPrice()}</p>
                <p>You will be redirected to your bookings shortly.</p>
              </Alert>
            ) : (
              <>
                <Row>
                  <Col md={6}>
                    <div className="flight-summary p-3 mb-3 bg-light rounded">
                      <h5>Flight Details</h5>
                      <Table borderless size="sm">
                        <tbody>
                          <tr>
                            <td>Airline:</td>
                            <td>{selectedFlight?.airline}</td>
                          </tr>
                          <tr>
                            <td>Flight Number:</td>
                            <td>{selectedFlight?.flightNumber}</td>
                          </tr>
                          <tr>
                            <td>From:</td>
                            <td>{selectedFlight?.origin}</td>
                          </tr>
                          <tr>
                            <td>To:</td>
                            <td>{selectedFlight?.destination}</td>
                          </tr>
                          <tr>
                            <td>Departure:</td>
                            <td>{formatTime(selectedFlight?.departureTime)} on {formatDate(selectedFlight?.departureTime)}</td>
                          </tr>
                          <tr>
                            <td>Arrival:</td>
                            <td>{formatTime(selectedFlight?.arrivalTime)} on {formatDate(selectedFlight?.arrivalTime)}</td>
                          </tr>
                          <tr>
                            <td>Duration:</td>
                            <td>{selectedFlight?.duration}</td>
                          </tr>
                          <tr>
                            <td>Aircraft:</td>
                            <td>{selectedFlight?.aircraft}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </Col>
                  <Col md={6}>
                    <h5>Passenger Details</h5>
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
                    <Form.Group className="mb-3" controlId="passport">
                      <Form.Label>Passport Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="passport"
                        value={bookingDetails.passport}
                        onChange={handleBookingInputChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="seatPreference">
                      <Form.Label>Seat Preference</Form.Label>
                      <Form.Control
                        as="select"
                        name="seatPreference"
                        value={bookingDetails.seatPreference}
                        onChange={handleBookingInputChange}
                      >
                        <option value="any">Any</option>
                        <option value="window">Window</option>
                        <option value="aisle">Aisle</option>
                        <option value="middle">Middle</option>
                      </Form.Control>
                    </Form.Group>
                    <div className="total-price p-3 bg-light rounded">
                      <h5>Total Price: ${calculateTotalPrice()}</h5>
                      <small className="text-muted">
                        {searchParams.passengers} passenger(s) × ${selectedFlight?.price}
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

export default FlightBooking;