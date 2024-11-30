// src/components/LandingPage.js

import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="container text-center">
      <h1>Smart Personal Diet Planner</h1>
      <p>Welcome to your personalized diet planner! Enter your dietary preferences, track your meals, and achieve your fitness goals with ease.</p>
      <div className="btn-group mt-4">
        <Link to="/signup" className="btn btn-primary">Sign Up</Link>
        <Link to="/login" className="btn btn-secondary">Log In</Link>
      </div>
      <div className="mt-5">
        <Link to="/profile" className="btn btn-success">Get Started</Link>
      </div>
    </div>
  );
};

export default LandingPage;
