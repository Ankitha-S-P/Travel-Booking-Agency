import React, { useState, useEffect } from 'react';
import { Container, Table, Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/mybookings.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    
    const userEmail = localStorage.getItem('userEmail');
    const allBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const userBookings = allBookings.filter(booking => booking.userEmail === userEmail);
    
    setBookings(userBookings);
    setLoading(false);
  }, [navigate]);

  const handleCancelBooking = (bookingId) => {
    // Update bookings in localStorage
    const updatedBookings = bookings.filter(booking => booking.id !== bookingId);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    setBookings(updatedBookings);

    // Update available seats (optional - if you want to return seats when cancelled)
    const bookingToCancel = bookings.find(b => b.id === bookingId);
    if (bookingToCancel) {
      const packages = JSON.parse(localStorage.getItem('travelPackages')) || [];
      const updatedPackages = packages.map(pkg => {
        if (pkg.id === bookingToCancel.packageId) {
          return {
            ...pkg,
            seatsAvailable: pkg.seatsAvailable + bookingToCancel.travelers
          };
        }
        return pkg;
      });
      localStorage.setItem('travelPackages', JSON.stringify(updatedPackages));
    }
  };

  if (loading) {
    return <Container className="my-4"><p>Loading your bookings...</p></Container>;
  }
  const renderBookingDetails = (booking) => {
    switch (booking.type) {
      case 'package':
        return `${booking.packageName} to ${booking.destination}`;
      case 'hotel':
        return `${booking.hotelName} in ${booking.destination} (${booking.roomType})`;
      case 'flight':
        return `${booking.airline} Flight ${booking.flightNumber} (${booking.origin} to ${booking.destination})`;
      default:
        return 'Details not available';
    }
  };
  
  return (
    <Container className="mybookings-container">
      <h2 className="custom-top-margin mb-4">My Bookings</h2>
      {bookings.length === 0 ? (
        <Alert variant="info">
          You don't have any bookings yet. <a href="/">Browse our packages</a> to get started!
        </Alert>
      ) : (
        // Update the table rendering in MyBookings.js
<Table striped bordered hover responsive>
  <thead>
    <tr>
      <th>Type</th>
      <th>Details</th>
      <th>Date</th>
      <th>Total Price</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {bookings.map(booking => (
      <tr key={booking.id}>
        <td>{booking.type}</td>
        <td>
        <td>{renderBookingDetails(booking)}</td>

        </td>
        <td>
          {booking.type === 'hotel' ? (
            <>
              {new Date(booking.checkIn).toLocaleDateString()} - 
              {new Date(booking.checkOut).toLocaleDateString()}
            </>
          ) : (
            booking.travelDate ? new Date(booking.travelDate).toLocaleDateString() : 
            new Date(booking.departureTime).toLocaleDateString()
          )}
        </td>
        <td>Rs.{booking.totalPrice}</td>
        <td>
          <span className={`status-badge ${booking.status}`}>
            {booking.status}
          </span>
        </td>
        <td>
          <Button 
            variant="danger" 
            size="sm" 
            onClick={() => handleCancelBooking(booking.id)}
          >
            Cancel
          </Button>
        </td>
      </tr>
    ))}
  </tbody>
</Table>
      )}
    </Container>
  );
};

export default MyBookings;