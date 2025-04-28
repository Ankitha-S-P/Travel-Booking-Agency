import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { StarFill, GeoAlt, Clock, People } from 'react-bootstrap-icons';
import '../styles/card.css';
const PackageCard = ({ packageItem }) => {
  return (
<Card className="h-100 border-0 shadow-sm package-card">
  <Card.Img 
    variant="top" 
    src={packageItem.image} 
    className="package-image"
  />
  
  <Card.Body className="d-flex flex-column">
    <div className="package-rating-price">
      <Badge className="d-flex align-items-center">
        <StarFill className="text-warning me-1" />
        {packageItem.rating || '4.5'}
      </Badge>
      <div className="text-success fw-bold">
        Rs.{packageItem.price} <span className="text-muted">/person</span>
      </div>
    </div>

    <Card.Title className="package-title mt-2">{packageItem.name}</Card.Title>
    
    <div className="package-details mb-3">
      <div className="detail-item">
        <GeoAlt className="text-primary me-2" />
        <span>{packageItem.destination}</span>
      </div>
      <div className="detail-item">
        <Clock className="text-primary me-2" />
        <span>{packageItem.duration}</span>
      </div>
      <div className="detail-item">
        <People className="text-primary me-2" />
        <span>{packageItem.seatsAvailable} seats left</span>
      </div>
    </div>

    <div className="mt-auto">
      <Link to={`/booking/${packageItem.id}`} className="w-100 text-decoration-none">
        <Button variant="primary" className="w-100 book-button">
          Book Adventure
        </Button>
      </Link>
    </div>
  </Card.Body>
</Card>

  );
};

export default PackageCard;