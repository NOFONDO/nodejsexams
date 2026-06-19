import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

function Register() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.username || !form.email || !form.password) {
      return setError('All fields are required');
    }
    if (form.password.length < 6) {
      return setError('Password must be at least 6 characters');
    }
    try {
      setLoading(true);
      const { data } = await API.post('/auth/register', form);
      login(data.user, data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account 🏠</h2>
        <p style={styles.sub}>Join PropSpace today</p>
        {error && <p style={styles.error}>{error}</p>}
        <div>
          <input
            style={styles.input}
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
          />
          <input
            style={styles.input}
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
          />
          <input
            style={styles.input}
            type="password"
            name="password"
            placeholder="Password (min 6 characters)"
            value={form.password}
            onChange={handleChange}
          />
          <button
            style={styles.btn}
            onClick={handleSubmit}
            disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </div>
        <p style={styles.bottom}>
          Already have an account?{' '}
          <Link to="/login" style={styles.link}>Login here</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
  },
  card: {
    background: 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    fontSize: '24px',
    color: '#1a1a2e',
    marginBottom: '8px',
  },
  sub: {
    color: '#666',
    marginBottom: '24px',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '15px',
    boxSizing: 'border-box',
  },
  btn: {
    width: '100%',
    padding: '12px',
    background: '#e94560',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '5px',
  },
  error: {
    background: '#ffe0e0',
    color: '#e94560',
    padding: '10px',
    borderRadius: '6px',
    marginBottom: '15px',
    fontSize: '14px',
  },
  bottom: {
    textAlign: 'center',
    marginTop: '20px',
    color: '#666',
  },
  link: {
    color: '#e94560',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default Register;