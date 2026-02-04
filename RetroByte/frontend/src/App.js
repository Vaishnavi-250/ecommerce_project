import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import QuizList from './components/QuizList';
import MissionList from './components/MissionList';
import Leaderboard from './components/Leaderboard';
import LogEcoAction from './components/LogEcoAction';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <Router>
        <Routes>
          <Route path="/register" element={<Register onRegister={handleLogin} />} />
          <Route path="/*" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <Link to="/" className="logo">🌍 RetroByte</Link>
          <div className="nav-links">
            <Link to="/">Dashboard</Link>
            <Link to="/quizzes">Quizzes</Link>
            <Link to="/missions">Missions</Link>
            <Link to="/log-action">Log Action</Link>
            <Link to="/leaderboard">Leaderboard</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/quizzes" element={<QuizList />} />
            <Route path="/missions" element={<MissionList />} />
            <Route path="/log-action" element={<LogEcoAction />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
