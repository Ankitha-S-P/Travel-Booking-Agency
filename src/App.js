import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Booking from './pages/Booking';

import MyBookings from './pages/MyBookings';
import FAQ from './pages/FAQ';
import About from './pages/About';
import HotelBooking from './pages/HotelBooking';
import './App.css';
import FlightBooking from './pages/FlightBooking';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="content-wrap">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/booking/:packageId" element={<Booking />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/about" element={<About />} />
            <Route path="/hotels" element={<HotelBooking />} />
            <Route path="/flights" element={<FlightBooking />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;