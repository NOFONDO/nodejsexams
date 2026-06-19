import React, { useState, useEffect } from 'react';
import API from '../api/axios';

function Profile() {
  const [profile, setProfile] = useState({
    username: '',
    phone: '',
    avatar: '',
  });
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
  });
  const [profileMsg, setProfileMsg] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await API.get('/users/profile');
        setProfile({
          username: data.username,
          phone: data.phone || '',
          avatar: data.avatar || '',
        });
      } catch (err) {
        console.error('Failed to load profile');
      }
    };
    fetchProfile();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await API.put('/users/profile', profile);
      setProfileMsg('Profile updated successfully!');
    } catch (err) {
      setProfileMsg('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (!passwords.oldPassword || !passwords.newPassword) {
      return setPasswordMsg('Both fields are required');
    }
    try {
      setLoading(true);
      await API.put('/users/password', passwords);
      setPasswordMsg('Password updated successfully!');
      setPasswords({ oldPassword: '', newPassword: '' });
    } catch (err) {
      setPasswordMsg(err.response?.data?.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>

      <div style={styles.card}>
        <h2 style={styles.title}>My Profile ⚙️</h2>
        {profileMsg && <p style={styles.success}>{profileMsg}</p>}
        <input
          style={styles.input}
          type="text"
          placeholder="Username"
          value={profile.username}
          onChange={(e) => setProfile({ ...profile, username: e.target.value })}
        />
        <input
          style={styles.input}
          type="text"
          placeholder="Phone number"
          value={profile.phone}
          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
        />
        <input
          style={styles.input}
          type="text"
          placeholder="Avatar URL"
          value={profile.avatar}
          onChange={(e) => setProfile({ ...profile, avatar: e.target.value })}
        />
        <button
          style={styles.btn}
          onClick={handleProfileUpdate}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Update Profile'}
        </button>
      </div>

      <div style={styles.card}>
        <h2 style={styles.title}>Change Password 🔒</h2>
        {passwordMsg && <p style={styles.success}>{passwordMsg}</p>}
        <input
          style={styles.input}
          type="password"
          placeholder="Current password"
          value={passwords.oldPassword}
          onChange={(e) =>
            setPasswords({ ...passwords, oldPassword: e.target.value })
          }
        />
        <input
          style={styles.input}
          type="password"
          placeholder="New password"
          value={passwords.newPassword}
          onChange={(e) =>
            setPasswords({ ...passwords, newPassword: e.target.value })
          }
        />
        <button
          style={styles.btn}
          onClick={handlePasswordUpdate}
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Password'}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0 20px',
    gap: '20px',
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
    fontSize: '22px',
    color: '#1a1a2e',
    marginBottom: '20px',
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
  },
  success: {
    background: '#e0ffe0',
    color: '#28a745',
    padding: '10px',
    borderRadius: '6px',
    marginBottom: '15px',
    fontSize: '14px',
  },
};

export default Profile;