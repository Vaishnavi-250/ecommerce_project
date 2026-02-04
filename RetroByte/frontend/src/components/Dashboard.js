import React, { useEffect, useState } from 'react';
import { user } from '../api';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const profile = await user.getProfile();
      const stats = await user.getStats();
      setUserData({ ...profile, ...stats });
    } catch (err) {
      console.error('Failed to load user data', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading dashboard...</p>;
  if (!userData) return <p>Failed to load profile</p>;

  return (
    <div className="dashboard-container">
      <div className="profile-header">
        <img src={userData.avatar} alt={userData.username} className="avatar" />
        <div className="profile-info">
          <h1>{userData.username}</h1>
          <p className="level">Level {userData.level}</p>
          <p className="bio">{userData.bio || 'Eco-warrior in training'}</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Experience</h3>
          <p className="stat-value">{userData.experience}</p>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${(userData.experience % 1000) / 10}%` }}></div>
          </div>
        </div>

        <div className="stat-card">
          <h3>Coins</h3>
          <p className="stat-value">💰 {userData.coins}</p>
        </div>

        <div className="stat-card">
          <h3>Badges</h3>
          <p className="stat-value">{userData.badges?.length || 0}</p>
        </div>

        <div className="stat-card">
          <h3>Eco Impact</h3>
          <p className="stat-value">{userData.achievements?.environmentalImpact || 0}</p>
        </div>
      </div>

      <div className="achievements-section">
        <h2>🏆 Achievements</h2>
        <div className="achievements-list">
          <div className="achievement-item">
            <span>📚 Quizzes Completed:</span>
            <strong>{userData.achievements?.totalQuizzesCompleted || 0}</strong>
          </div>
          <div className="achievement-item">
            <span>🎯 Missions Completed:</span>
            <strong>{userData.achievements?.totalMissionsCompleted || 0}</strong>
          </div>
          <div className="achievement-item">
            <span>🌱 Eco-Actions Logged:</span>
            <strong>{userData.achievements?.totalEcoActionsLogged || 0}</strong>
          </div>
          <div className="achievement-item">
            <span>⭐ Highest Quiz Score:</span>
            <strong>{userData.achievements?.highestQuizScore || 0}%</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
