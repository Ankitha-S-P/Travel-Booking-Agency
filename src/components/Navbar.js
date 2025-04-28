import React, { useEffect, useState } from 'react'; 
import { Link } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Container, Button } from 'react-bootstrap';
import '../styles/navbar.css';
const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    window.location.href = '/login';
  };
  useEffect(() => {
    const handleAuthChange = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    };

    window.addEventListener('authChange', handleAuthChange);
    return () => window.removeEventListener('authChange', handleAuthChange);
  }, []);
  // Add this effect for scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        document.querySelector('.navbar').classList.add('scrolled');
      } else {
        document.querySelector('.navbar').classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <BootstrapNavbar 
      bg="dark" 
      variant="dark" 
      expand="lg" 
      className="fixed-top shadow-sm navbar" // Added classes here
      style={{ transition: 'all 0.3s ease' }} // Added inline style
    >
      <Container>
      <BootstrapNavbar.Brand as={Link} to="/" className="d-flex align-items-center">
  <img 
    src="/images/logo4.png" 
    alt="Travology Logo" 
    className="navbar-logo me-2"
    style={{
      height: "40px", // Adjust as needed
      width: "auto"
    }}
  />
  <span className="navbar-brand-text">Travology</span>
</BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              className="nav-link-hover" // Added hover class
            >
              Home
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/about" 
              className="nav-link-hover"
            >
              About Us
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/faq" 
              className="nav-link-hover"
            >
              FAQ
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/hotels" 
              className="nav-link-hover" // Added hover class
            >
              Hotels
              </Nav.Link>
              <Nav.Link 
              as={Link} 
              to="/flights" 
              className="nav-link-hover" // Added hover class
            >
              Flights
              </Nav.Link>
              <Nav.Link 
              as={Link} 
              to="/" 
              className="nav-link-hover" // Added hover class
            >
              Packages
              </Nav.Link>
          </Nav>
          
          <Nav>
            {isLoggedIn ? (
              <>
                <Nav.Link 
                  as={Link} 
                  to="/my-bookings" 
                  className="nav-link-hover me-3"
                >
                  My Bookings
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/" 
                  className="nav-link-hover me-3"
                >
                  Welcome, {localStorage.getItem('userName')}
                </Nav.Link>
                <Button 
                  variant="outline-light" 
                  onClick={handleLogout}
                  className="logout-btn" // Added class for button
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link 
                  as={Link} 
                  to="/login" 
                  className="nav-link-hover me-3"
                >
                  Login
                </Nav.Link>
                <Button 
                  as={Link} 
                  to="/signup" 
                  variant="primary"
                  className="signup-btn ms-2"
                >
                  Sign Up
                </Button>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;