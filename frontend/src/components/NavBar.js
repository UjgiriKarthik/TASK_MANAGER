import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

export default function NavBar() {
  return (
    <nav className="nav-container">
      <div className="nav-content">
        <div className="nav-left">
          <Link to="/" className="nav-logo">Task Manager</Link>
        </div>

        <div className="nav-right">
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="nav-link">Register</Link>
        </div>
      </div>
    </nav>
  );
}
