// src/pages/CollegeSelection.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function CollegeSelection() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>College Selection</h2>
      <nav style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <Link to="/college-selection/college-list" style={{ textDecoration: 'none' }}>College List</Link>
        <Link to="/college-selection/top-colleges" style={{ textDecoration: 'none' }}>Top Colleges</Link>
        <Link to="/college-selection/college-allocation" style={{ textDecoration: 'none' }}>College Allocation</Link>
      </nav>
    </div>
  );
}

export default CollegeSelection;