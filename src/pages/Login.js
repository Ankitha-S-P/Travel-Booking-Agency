import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validate form
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    // Check user credentials
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === formData.email && user.password === formData.password);

    if (user) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('userName', user.name);
      window.dispatchEvent(new Event('authChange'));
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <Container className="auth-container mt-5">
      <div className="auth-form">
        <h2 className="text-center mb-4">Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="mb-3 text-end">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <Button variant="primary" type="submit" className="w-100 mb-3">
            Login
          </Button>

          <div className="text-center">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default Login;