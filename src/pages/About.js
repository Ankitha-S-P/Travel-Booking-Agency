import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../styles/about.css';

const About = () => {
  return (
    <Container className="about-container">
      <h1 className="text-center mt-5 mb-4">About Travology</h1>
      
      <Row className="mb-4">
        <Col>
          <Card className="about-card">
            <Card.Body>
              <Card.Title>Our Story</Card.Title>
              <Card.Text>
                Founded in 2010, Travology has been helping travelers discover the world with ease. 
                What started as a small local agency has grown into a trusted name in travel, 
                offering curated experiences in over 50 destinations worldwide.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <Card className="about-card">
            <Card.Body>
              <Card.Title>Our Mission</Card.Title>
              <Card.Text>
                To make travel planning effortless and enjoyable, providing our customers with 
                unforgettable experiences at the best value. We believe travel should be about 
                creating memories, not stress.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="about-card">
            <Card.Body>
              <Card.Title>Our Team</Card.Title>
              <Card.Text>
                Our team consists of passionate travelers and destination experts who have 
                personally visited the locations we offer. We're here to share our knowledge 
                and help you plan your perfect trip.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="about-card">
            <Card.Body>
              <Card.Title>Why Choose Us?</Card.Title>
              <Card.Text>
                <ul>
                  <li>Handpicked accommodations and experiences</li>
                  <li>24/7 customer support during your travels</li>
                  <li>Competitive prices with no hidden fees</li>
                  <li>Flexible booking options</li>
                  <li>Sustainable and responsible travel options</li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default About;