import React, { useEffect, useState } from 'react';
import { missions } from '../api';
import '../styles/Missions.css';

const MissionList = () => {
  const [missionList, setMissionList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMissions();
  }, []);

  const loadMissions = async () => {
    try {
      const data = await missions.getAll();
      setMissionList(data);
    } catch (err) {
      console.error('Failed to load missions', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptMission = async (missionId) => {
    try {
      await missions.accept(missionId);
      alert('Mission accepted! Start taking real-world eco-actions.');
    } catch (err) {
      alert('Failed to accept mission');
    }
  };

  return (
    <div className="missions-container">
      <h1>🎯 Eco Missions</h1>
      <p className="subtitle">Complete real-world environmental actions and earn rewards!</p>

      {loading ? (
        <p>Loading missions...</p>
      ) : (
        <div className="missions-grid">
          {missionList.map((mission) => (
            <div key={mission._id} className="mission-card">
              <img src={mission.imageUrl} alt={mission.title} />
              <h3>{mission.title}</h3>
              <p>{mission.description}</p>
              
              <div className="mission-details">
                <span className="type">{mission.type}</span>
                <span className="difficulty">{mission.difficulty}</span>
              </div>

              <div className="rewards">
                <span>💰 {mission.rewardCoins} coins</span>
                <span>⭐ {mission.rewardExperience} XP</span>
              </div>

              <ul className="instructions">
                {mission.instructions.map((instruction, idx) => (
                  <li key={idx}>{instruction}</li>
                ))}
              </ul>

              <button
                className="accept-btn"
                onClick={() => handleAcceptMission(mission._id)}
              >
                Accept Mission
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MissionList;
