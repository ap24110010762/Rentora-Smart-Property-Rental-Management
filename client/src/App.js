import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  const navStyle = {
    padding: '20px 80px',
    background: '#FFFFFF',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '2px solid #E6DCD3',
    /* Using position relative ensures the content starts AFTER the navbar */
    position: 'relative', 
    zIndex: 100
  };

  const brandingStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  const titleStyle = {
    color: '#5D4037',
    margin: 0,
    fontSize: '24px',
    fontWeight: '700',
    letterSpacing: '-1px'
  };

  const subtitleStyle = {
    color: '#A1887F',
    fontSize: '14px',
    fontWeight: '400',
    borderLeft: '1px solid #D7CCC8',
    paddingLeft: '12px'
  };

  return (
    <Router>
      <nav style={navStyle}>
        <div style={brandingStyle}>
          <h2 style={titleStyle}>Rentora</h2>
          <span style={subtitleStyle}>Smart Property Rental Management</span>
        </div>
        
        <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#8D6E63', fontWeight: '500' }}>Login</Link>
          <Link to="/register" style={{ 
            textDecoration: 'none', 
            background: '#7D5A50', 
            color: '#FFF', 
            padding: '10px 25px', 
            borderRadius: '12px', 
            fontWeight: '600', 
            fontSize: '14px' 
          }}>
            Sign Up
          </Link>
        </div>
      </nav>
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;