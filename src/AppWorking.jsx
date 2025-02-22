// src/App.jsx
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import CollegeSelection from './pages/CollegeSelection';
import CollegeList from './pages/CollegeList';
import TopColleges from './pages/TopColleges';
import CollegeAllocation from './pages/CollegeAllocation';

function App() {
  return (
    <Router>
      <div>
        {/* Header */}
        <header style={{ background: '#4CAF50', padding: '10px', color: 'white', textAlign: 'center' }}>
          <h1>ABC Consulting</h1>
          <nav style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
            <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>About</Link>
            <Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</Link>
            <Link to="/college-selection" style={{ color: 'white', textDecoration: 'none' }}>College Selection</Link>
          </nav>
        </header>

        {/* Main Content */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/college-selection" element={<CollegeSelection />} />
          <Route path="/college-selection/college-list" element={<CollegeList />} />
          <Route path="/college-selection/top-colleges" element={<TopColleges />} />
          <Route path="/college-selection/college-allocation" element={<CollegeAllocation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;