import React from 'react';
import { Container, Accordion } from 'react-bootstrap';
import '../styles/faq.css';

const FAQ = () => {
  const faqs = [
    {
      question: 'How do I book a travel package?',
      answer: 'You can browse our packages on the home page and click "Book Now" on the package you\'re interested in. You\'ll need to create an account or log in if you already have one.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, UPI) as well as NetBanking.'
    },
    {
      question: 'Can I cancel or modify my booking?',
      answer: 'Yes, you can cancel or modify your booking up to 7 days before your travel date. Please contact our customer service for assistance.'
    },
    {
      question: 'Is travel insurance included?',
      answer: 'Basic travel insurance is included with all our packages. You can upgrade to premium insurance during the booking process.'
    },
    {
      question: 'How do I know if my booking is confirmed?',
      answer: 'You will receive a confirmation email with all the details of your booking once your payment is processed.'
    },
    {
      question: 'What happens if my flight is delayed or cancelled?',
      answer: 'Our 24/7 customer service team will assist you with any flight disruptions. We recommend arriving at the airport early and purchasing comprehensive travel insurance.'
    }
  ];

  return (
    <Container className="faq-container">
      <h1 className="text-center mt-5 mb-4">Frequently Asked Questions</h1>
      <Accordion defaultActiveKey="0">
        {faqs.map((faq, index) => (
          <Accordion.Item eventKey={index.toString()} key={index}>
            <Accordion.Header >{faq.question}</Accordion.Header>
            <Accordion.Body>{faq.answer}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
};

export default FAQ;