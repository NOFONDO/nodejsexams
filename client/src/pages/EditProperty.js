import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api/axios';

function EditProperty() {
  const { id } = useParams();
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    city: '',
    country: '',
    type: 'Apartment',
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [currentImage, setCurrentImage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const { data } = await API.get('/properties');
        const property = data.find((p) => p._id === id);
        if (property) {
          setForm({
            title: property.title,
            description: property.description,
            price: property.price,
            city: property.city,
            country: property.country,
            type: property.type,
          });
        if (property.imagePath) {
            let imageUrl = property.imagePath;
            if (!imageUrl.startsWith('http')) {
              imageUrl = `http://localhost:5000${imageUrl.startsWith('/uploads') ? '' : '/uploads/'}${imageUrl.startsWith('/uploads') ? imageUrl.slice(9) : imageUrl}`;
            }
            setCurrentImage(imageUrl);
          }
        }
      } catch (err) {
        setError('Failed to load property');
      }
    };
    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('price', form.price);
      formData.append('city', form.city);
      formData.append('country', form.country);
      formData.append('type', form.type);
      if (image) {
        formData.append('image', image);
      }
      await API.put(`/properties/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/my-listings');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update property');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Edit Property</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input
          style={styles.input}
          type="text"
          name="title"
          placeholder="Property title"
          value={form.title}
          onChange={handleChange}
        />
        <textarea
          style={styles.textarea}
          name="description"
          placeholder="Property description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          style={styles.input}
          type="number"
          name="price"
          placeholder="Price (XAF)"
          value={form.price}
          onChange={handleChange}
        />
        <input
          style={styles.input}
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
        />
        <input
          style={styles.input}
          type="text"
          name="country"
          placeholder="Country"
          value={form.country}
          onChange={handleChange}
        />
        <select
          style={styles.input}
          name="type"
          value={form.type}
          onChange={handleChange}
        >
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Studio">Studio</option>
        </select>

        {currentImage && !imagePreview && (
          <div style={styles.previewContainer}>
            <p style={styles.previewLabel}>Current Image:</p>
            <img src={currentImage} alt="current" style={styles.preview} />
          </div>
        )}

        <label style={styles.fileLabel}>
          Upload New Property Image
          <input
            style={styles.fileInput}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>

        {imagePreview && (
          <div style={styles.previewContainer}>
            <p style={styles.previewLabel}>New Preview:</p>
            <img src={imagePreview} alt="preview" style={styles.preview} />
          </div>
        )}

        <button
          style={styles.btn}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Property'}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: '0 20px',
  },
  card: {
    background: 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '500px',
  },
  title: {
    fontSize: '24px',
    color: '#1a1a2e',
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
  textarea: {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '15px',
    boxSizing: 'border-box',
    height: '100px',
    resize: 'vertical',
  },
  fileLabel: {
    display: 'block',
    padding: '16px',
    marginBottom: '15px',
    borderRadius: '8px',
    border: '2px dashed #e94560',
    cursor: 'pointer',
    textAlign: 'center',
    fontSize: '14px',
    color: '#e94560',
    fontWeight: 'bold',
    background: '#fff5f7',
    transition: 'all 0.3s ease',
  },
  fileInput: {
    display: 'none',
  },
  previewContainer: {
    marginBottom: '15px',
    textAlign: 'center',
    padding: '10px',
    background: '#f9f9f9',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
  },
  previewLabel: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  preview: {
    maxWidth: '100%',
    width: '100%',
    height: 'auto',
    maxHeight: '400px',
    borderRadius: '8px',
    display: 'block',
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
  },
  error: {
    background: '#ffe0e0',
    color: '#e94560',
    padding: '10px',
    borderRadius: '6px',
    marginBottom: '15px',
    fontSize: '14px',
  },
};

export default EditProperty;