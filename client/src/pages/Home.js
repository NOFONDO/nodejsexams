import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="page">
      <h2>Welcome to Node.js Revision Questions 👋</h2>
      <p>
        This project covers three key topics from the revision 
        questions assignment. Click any topic below to view the 
        full answer and code examples.
      </p>

      <div style={{ marginTop: '30px' }}>
        <Link to="/mongodb" className="btn btn-blue">
          📦 Q1 — MongoDB Aggregation Pipeline
        </Link>

        <Link to="/dependency-injection" className="btn btn-green">
          🔧 Q2 — Dependency Injection in Node.js
        </Link>

        <Link to="/angular-vs-react" className="btn btn-purple">
          ⚛️ Q3 — Angular vs React
        </Link>
      </div>
    </div>
  );
}

export default Home;