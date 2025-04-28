import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Check if email exists (in a real app, you would send this to your backend)
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.email === email);

    if (userExists) {
      setSubmitted(true);
    } else {
      setError('No account found with this email address');
    }
  };

  return (
    <Container className="auth-container">
      <div className="auth-form">
        <h2 className="text-center mb-4">Forgot Password</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        
        {submitted ? (
          <Alert variant="success">
            <p>An email with password reset instructions has been sent to {email}.</p>
            <p className="mb-0">Please check your inbox and follow the instructions to reset your password.</p>
          </Alert>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Form.Text className="text-muted">
                We'll send you a link to reset your password
              </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-3">
              Send Reset Link
            </Button>

            <div className="text-center">
              Remember your password? <Link to="/login">Login</Link>
            </div>
          </Form>
        )}
      </div>
    </Container>
  );
};

export default ForgotPassword;