import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MongoDB from './pages/MongoDB';
import DependencyInjection from './pages/DependencyInjection';
import AngularVsReact from './pages/AngularVsReact';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav>
          <h1>📚 Node.js Revision Questions</h1>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mongodb" element={<MongoDB />} />
          <Route path="/dependency-injection" element={<DependencyInjection />} />
          <Route path="/angular-vs-react" element={<AngularVsReact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;