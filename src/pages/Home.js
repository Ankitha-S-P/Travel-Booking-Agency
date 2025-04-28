import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import PackageCard from '../components/PackageCard';
import '../styles/home.css';

const Home = () => {
  const [packages, setPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Load packages from localStorage or use default
    const storedPackages = JSON.parse(localStorage.getItem('travelPackages'));
    if (storedPackages) {
      setPackages(storedPackages);
    } else {
      // Default packages
      const defaultPackages = [
        {
          id: 1,
          name: 'Paris Getaway',
          destination: 'Paris, France',
          duration: '5 days',
          price: 52000,
          seatsAvailable: 13,
          image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        
        {
          id: 2,
          name: 'Tokyo Adventure',
          destination: 'Tokyo, Japan',
          duration: '7 days',
          price: 35000,
          seatsAvailable: 8,
          image: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
          id: 3,
          name: 'New York City Break',
          destination: 'New York, USA',
          duration: '4 days',
          price: 125000,
          seatsAvailable: 12,
          image: 'https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
          id: 4,
          name: 'Rome Historical Tour',
          destination: 'Rome, Italy',
          duration: '6 days',
          price: 58000,
          seatsAvailable: 10,
          image: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
          id: 5,
          name: 'Phi Phi Island Relaxation',
          destination: 'Phi Phi, Thailand',
          duration: '4 days',
          price: 20000,
          seatsAvailable: 6,
          image: 'https://thaiholidayplanner.com/wp-content/uploads/2023/06/Thai-Holiday-Planner-Blog-Thailand-green-tropical-island-Cover.jpg'
        },
        {
          id: 6,
          name: 'Sydney Explorer',
          destination: 'Sydney, Australia',
          duration: '9 days',
          price: 38000,
          seatsAvailable: 5,
          image: 'https://t4.ftcdn.net/jpg/04/12/81/69/360_F_412816969_cpRI2c2aSHobr77aOOzgO3kcW7FWCn9e.jpg'
        }
      ];
      setPackages(defaultPackages);
      
      localStorage.setItem('travelPackages', JSON.stringify(defaultPackages));
    }
  }, []);

  const filteredPackages = packages.filter(pkg =>
    pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-wrapper"> {}
      {}
      <div className="video-background-container">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="background-video"
        >
          <source src="/videos/7wonders.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay">
          <h1 className="display-4 fw-bold mb-3">Explore Our Travel Packages, Hotels & Flights</h1>
          <p className="lead text-light">Discover your dream vacation with our curated collection</p>
        </div>
      </div>
      
      {/* Content Section */}
      <Container className="content-container">
        <Form.Group className="search-box mb-4 mx-auto" style={{ maxWidth: '600px' }}>
          <Form.Control
            type="text"
            placeholder="Search packages by name or destination..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </Form.Group>
    
        <Row xs={1} md={2} lg={3} className="g-4 package-grid">
          {filteredPackages.map(pkg => (
            <Col key={pkg.id}>
              <PackageCard packageItem={pkg} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Home;