import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import PropertyCard from '../components/PropertyCard';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [city, setCity] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const { user } = useAuth();

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const params = {};
      if (city) params.city = city;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;
      const { data } = await API.get('/properties', { params });
      setProperties(data);
    } catch (err) {
      setError('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleDelete = (id) => {
    setProperties(properties.filter((p) => p._id !== id));
  };

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Find Your Perfect Property</h1>
        <p style={styles.heroSub}>
          Browse thousands of properties for rent and sale
        </p>
        {user && (
          <Link to="/create" style={styles.createBtn}>
            + Add New Property
          </Link>
        )}
      </div>

      <div style={styles.filters}>
        <input
          style={styles.filterInput}
          type="text"
          placeholder="Search by city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          style={styles.filterInput}
          type="number"
          placeholder="Min price (XAF)"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          style={styles.filterInput}
          type="number"
          placeholder="Max price (XAF)"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <button style={styles.searchBtn} onClick={fetchProperties}>
          Search
        </button>
      </div>

      {loading && (
        <p style={styles.status}>Loading properties...</p>
      )}
      {error && (
        <p style={styles.error}>{error}</p>
      )}
      {!loading && properties.length === 0 && (
        <p style={styles.status}>No properties found.</p>
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
  hero: {
    background: 'linear-gradient(135deg, #1a1a2e, #e94560)',
    padding: '50px 30px',
    borderRadius: '12px',
    textAlign: 'center',
    marginBottom: '30px',
  },
  heroTitle: {
    color: 'white',
    fontSize: '32px',
    marginBottom: '10px',
  },
  heroSub: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: '16px',
    marginBottom: '20px',
  },
  createBtn: {
    background: 'white',
    color: '#e94560',
    padding: '12px 24px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '15px',
  },
  filters: {
    display: 'flex',
    gap: '10px',
    marginBottom: '30px',
    flexWrap: 'wrap',
  },
  filterInput: {
    padding: '10px 15px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '14px',
    flex: '1',
    minWidth: '150px',
  },
  searchBtn: {
    background: '#e94560',
    color: 'white',
    border: 'none',
    padding: '10px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '15px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
  status: {
    textAlign: 'center',
    color: '#666',
    fontSize: '16px',
    padding: '40px',
  },
  error: {
    textAlign: 'center',
    color: '#e94560',
    fontSize: '16px',
    padding: '20px',
  },
};

export default Home;