import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import '../styles/footer.css';
const Footer = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const message = e.target.message.value;
    // In a real app, you would send this to your backend
    alert(`Query submitted! We'll contact you at ${email} soon.`);
    e.target.reset();
  };

  return (
    <footer className="bg-dark text-light py-4 mt-4">
      <Container>
        <Row>
          <Col md={4}>
         
            <h5 className='brand-text'> <img 
    src="/images/logo4.png" 
    alt="Travology Logo" 
    className="navbar-logo me-2"
    style={{
      height: "40px", 
      width: "auto"
    }}
  /> Travology</h5>
            <p>Your perfect travel companion for memorable journeys around the world.</p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/terms" className="text-light">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-light">Privacy Policy</Link></li>
              <li><Link to="/faq" className="text-light">FAQ</Link></li>
              <li><Link to="/about" className="text-light">About Us</Link></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact Us</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <input type="email" name="email" className="form-control" placeholder="Your email" required />
              </div>
              <div className="mb-2">
                <textarea name="message" className="form-control" placeholder="Your query" required></textarea>
              </div>
              <button type="submit" className="submitBtn">Send</button>
            </form>
            <div className="mt-3">
              <a href="https://facebook.com" className="text-light me-2"><FaFacebook size={20} /></a>
              <a href="https://twitter.com" className="text-light me-2"><FaTwitter size={20} /></a>
              <a href="https://instagram.com" className="text-light me-2"><FaInstagram size={20} /></a>
              <a href="https://linkedin.com" className="text-light"><FaLinkedin size={20} /></a>
            </div>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <p>&copy; {new Date().getFullYear()} Travology. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;