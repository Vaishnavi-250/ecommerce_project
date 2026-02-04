import React, { useEffect, useState } from 'react';
import { leaderboard } from '../api';
import '../styles/Leaderboard.css';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [category, setCategory] = useState('global');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, [category]);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      let data;
      if (category === 'global') {
        data = await leaderboard.getGlobal(10, 0);
        setLeaders(data.leaderboard);
      } else {
        data = await leaderboard.getByCategory(category, 10);
        setLeaders(data);
      }
    } catch (err) {
      console.error('Failed to load leaderboard', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="leaderboard-container">
      <h1>🏆 Leaderboard</h1>
      
      <div className="category-tabs">
        <button
          className={category === 'global' ? 'active' : ''}
          onClick={() => setCategory('global')}
        >
          Global
        </button>
        <button
          className={category === 'quizzes' ? 'active' : ''}
          onClick={() => setCategory('quizzes')}
        >
          Quiz Masters
        </button>
        <button
          className={category === 'missions' ? 'active' : ''}
          onClick={() => setCategory('missions')}
        >
          Mission Heroes
        </button>
        <button
          className={category === 'eco-actions' ? 'active' : ''}
          onClick={() => setCategory('eco-actions')}
        >
          Eco Warriors
        </button>
      </div>

      {loading ? (
        <p>Loading leaderboard...</p>
      ) : (
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Level</th>
              <th>Experience</th>
              <th>Coins</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((player) => (
              <tr key={player._id} className={`rank-${player.rank}`}>
                <td className="rank-badge">#{player.rank}</td>
                <td className="player-name">
                  <img src={player.avatar} alt={player.username} />
                  {player.username}
                </td>
                <td>{player.level}</td>
                <td>{player.experience}</td>
                <td className="coins">💰 {player.coins}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Leaderboard;
