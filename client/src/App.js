import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MyListings from './pages/MyListings';
import Profile from './pages/Profile';
import CreateProperty from './pages/CreateProperty';
import EditProperty from './pages/EditProperty';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/my-listings" element={<PrivateRoute><MyListings /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/create" element={<PrivateRoute><CreateProperty /></PrivateRoute>} />
            <Route path="/edit/:id" element={<PrivateRoute><EditProperty /></PrivateRoute>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;