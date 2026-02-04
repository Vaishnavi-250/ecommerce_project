import React, { useState } from 'react';
import { ecoActions } from '../api';
import '../styles/EcoAction.css';

const LogEcoAction = () => {
  const [formData, setFormData] = useState({
    actionType: '',
    quantity: '',
    unit: '',
    description: '',
    location: {
      latitude: null,
      longitude: null,
      address: ''
    }
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setFormData(prev => ({
          ...prev,
          location: {
            ...prev.location,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        }));
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await ecoActions.log(formData);
      setSuccess(true);
      setFormData({
        actionType: '',
        quantity: '',
        unit: '',
        description: '',
        location: { latitude: null, longitude: null, address: '' }
      });
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      alert('Failed to log eco-action');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="eco-action-container">
      <h1>🌱 Log Eco-Action</h1>
      <p>Document your real-world environmental contributions and earn rewards!</p>

      {success && <div className="success-message">✅ Action logged successfully! +5 coins earned.</div>}

      <form onSubmit={handleSubmit} className="eco-action-form">
        <div className="form-group">
          <label>Action Type</label>
          <select
            name="actionType"
            value={formData.actionType}
            onChange={handleInputChange}
            required
          >
            <option value="">Select action type</option>
            <option value="tree-planted">🌳 Trees Planted</option>
            <option value="waste-segregated">♻️ Waste Segregated (kg)</option>
            <option value="energy-saved">⚡ Energy Saved (kWh)</option>
            <option value="water-saved">💧 Water Saved (liters)</option>
            <option value="pollution-reduced">🌍 Pollution Reduced (kg CO2)</option>
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              step="0.1"
              required
            />
          </div>
          <div className="form-group">
            <label>Unit</label>
            <input
              type="text"
              name="unit"
              value={formData.unit}
              onChange={handleInputChange}
              placeholder="e.g., kg, liters, kWh"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe what you did..."
            rows="4"
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <button
            type="button"
            onClick={handleLocationClick}
            className="location-btn"
          >
            📍 Get Current Location
          </button>
          {formData.location.latitude && (
            <p>Location set: ({formData.location.latitude.toFixed(4)}, {formData.location.longitude.toFixed(4)})</p>
          )}
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Logging...' : 'Log Action'}
        </button>
      </form>
    </div>
  );
};

export default LogEcoAction;
