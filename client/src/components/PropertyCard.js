import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

function PropertyCard({ property, onDelete }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isAuthor = user && user.id === property.author._id;

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await API.delete(`/properties/${property._id}`);
        onDelete(property._id);
      } catch (error) {
        alert('Error deleting property');
      }
    }
  };

  const getImageUrl = () => {
    if (property.imagePath) {
      if (property.imagePath.startsWith('http')) {
        return property.imagePath;
      }
      if (property.imagePath.startsWith('/uploads')) {
        return `http://localhost:5000${property.imagePath}`;
      }
      return `http://localhost:5000/uploads/${property.imagePath}`;
    }
    return '';
  };

  const imageUrl = getImageUrl();

  return (
    <div style={styles.card}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={property.title}
          style={styles.img}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      ) : null}
      <div style={styles.body}>
        <span style={styles.type}>{property.type}</span>
        <h3 style={styles.title}>{property.title}</h3>
        <p style={styles.location}>{property.city}, {property.country}</p>
        <p style={styles.price}>XAF {property.price.toLocaleString()}</p>
        <p style={styles.desc}>{property.description}</p>
        {isAuthor && (
          <div style={styles.actions}>
            <button
              onClick={() => navigate(`/edit/${property._id}`)}
              style={styles.editBtn}>
              Edit
            </button>
            <button
              onClick={handleDelete}
              style={styles.deleteBtn}>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: 'white',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    marginBottom: '20px',
  },
  img: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  body: {
    padding: '15px',
  },
  type: {
    background: '#e94560',
    color: 'white',
    padding: '4px 10px',
    borderRadius: '4px',
    fontSize: '12px',
  },
  title: {
    margin: '10px 0 5px',
    fontSize: '18px',
    color: '#1a1a2e',
  },
  location: {
    color: '#666',
    fontSize: '14px',
    marginBottom: '5px',
  },
  price: {
    color: '#e94560',
    fontWeight: 'bold',
    fontSize: '20px',
    marginBottom: '8px',
  },
  desc: {
    color: '#555',
    fontSize: '14px',
    lineHeight: '1.5',
  },
  actions: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
  },
  editBtn: {
    background: '#1a1a2e',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  deleteBtn: {
    background: '#e94560',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default PropertyCard;