import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>PropSpace</Link>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Properties</Link>
        {user ? (
          <>
            <Link to="/my-listings" style={styles.link}>My Listings</Link>
            <Link to="/profile" style={styles.link}>Profile</Link>
            <button onClick={handleLogout} style={styles.btn}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#1a1a2e',
    padding: '15px 30px',
    marginBottom: '30px',
  },
  brand: {
    color: '#e94560',
    fontSize: '24px',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '15px',
  },
  btn: {
    background: '#e94560',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '15px',
  },
};

export default Navbar;