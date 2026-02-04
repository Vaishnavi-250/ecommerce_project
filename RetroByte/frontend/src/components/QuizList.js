import React, { useEffect, useState } from 'react';
import { quizzes } from '../api';
import '../styles/Quiz.css';

const QuizList = () => {
  const [quizList, setQuizList] = useState([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuizzes();
  }, [category]);

  const loadQuizzes = async () => {
    try {
      setLoading(true);
      const data = await quizzes.getAll(category);
      setQuizList(data);
    } catch (err) {
      console.error('Failed to load quizzes', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="quiz-list-container">
      <h1>📚 Environmental Quizzes</h1>
      
      <div className="filters">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="climate">Climate</option>
          <option value="waste">Waste</option>
          <option value="energy">Energy</option>
          <option value="water">Water</option>
          <option value="biodiversity">Biodiversity</option>
          <option value="pollution">Pollution</option>
        </select>
      </div>

      {loading ? (
        <p>Loading quizzes...</p>
      ) : (
        <div className="quiz-grid">
          {quizList.map((quiz) => (
            <div key={quiz._id} className="quiz-card">
              <img src={quiz.imageUrl} alt={quiz.title} />
              <h3>{quiz.title}</h3>
              <p>{quiz.description}</p>
              <div className="quiz-meta">
                <span className="category">{quiz.category}</span>
                <span className="difficulty">{quiz.difficulty}</span>
              </div>
              <p className="quiz-stats">
                {quiz.completionCount} completed • {quiz.averageScore}% avg
              </p>
              <button onClick={() => window.location.href = `/quiz/${quiz._id}`}>
                Start Quiz
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizList;
