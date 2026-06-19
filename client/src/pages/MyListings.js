import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import PropertyCard from '../components/PropertyCard';
import { Link } from 'react-router-dom';

function MyListings() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyProperties = async () => {
      try {
        const { data } = await API.get('/properties/my-listings');
        setProperties(data);
      } catch (err) {
        setError('Failed to load your listings');
      } finally {
        setLoading(false);
      }
    };
    fetchMyProperties();
  }, []);

  const handleDelete = (id) => {
    setProperties(properties.filter((p) => p._id !== id));
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>My Listings</h2>
        <Link to="/create" style={styles.createBtn}>
          + Add New Property
        </Link>
      </div>

      {loading && <p style={styles.status}>Loading your listings...</p>}
      {error && <p style={styles.error}>{error}</p>}
      {!loading && properties.length === 0 && (
        <div style={styles.empty}>
          <p>You have no listings yet.</p>
          <Link to="/create" style={styles.createBtn}>
            Create your first listing
          </Link>
        </div>
      )}

      <div style={styles.grid}>
        {properties.map((property) => (
          <PropertyCard
            key={property._id}
            property={property}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '0 20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  title: {
    fontSize: '24px',
    color: '#1a1a2e',
  },
  createBtn: {
    background: '#e94560',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
  status: {
    textAlign: 'center',
    color: '#666',
    padding: '40px',
  },
  error: {
    textAlign: 'center',
    color: '#e94560',
    padding: '20px',
  },
  empty: {
    textAlign: 'center',
    padding: '40px',
    color: '#666',
  },
};

export default MyListings;