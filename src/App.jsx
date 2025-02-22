// src/App.jsx
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link, // Import Link here
} from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoutes from './components/ProtectedRoutes'; // Use a wrapper for protected routes

import TopColleges from './pages/TopColleges';
import CollegeList from './pages/CollegeList';
import CollegeSelection from './pages/CollegeSelection';
import CollegeAllocation from './pages/CollegeAllocation';

function App() {
  const [token, setToken] = useState(() => localStorage.getItem('authToken'));

  useEffect(() => {
    console.log('Token State Updated:', token); // Debugging log

    const handleStorageChange = () => {
      setToken(localStorage.getItem('authToken'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <div>
        {/* Header */}
        <header style={{ background: '#4CAF50', padding: '10px', color: 'white', textAlign: 'center' }}>
          <h1>Aarna Consulting</h1>
          <nav style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
            <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>About</Link>
            <Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</Link>
            <Link to="/TopColleges" style={{ color: 'white', textDecoration: 'none' }}>Top Colleges</Link>
            <Link to="/CollegeList" style={{ color: 'white', textDecoration: 'none' }}>Colleges</Link>
            <Link to="/CollegeSelection" style={{ color: 'white', textDecoration: 'none' }}>CollegeSelection</Link>
            <Link to="/CollegeAllocation" style={{ color: 'white', textDecoration: 'none' }}>College Allocation</Link>
            {token ? (
              <button
                onClick={() => {
                  setToken(null);
                  localStorage.removeItem('authToken');
                }}
                style={{ color: 'white', cursor: 'pointer' }}
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
                <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link>
              </>
            )}
          </nav>
        </header>

        {/* Main Content */}
        <Routes>
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoutes token={token} />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/TopColleges" element={<TopColleges />} />
            <Route path="/CollegeList" element={<CollegeList />} />
            <Route path="/CollegeSelection" element={<CollegeSelection />} />
            <Route path="/CollegeAllocation" element={<CollegeAllocation />} />

          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;