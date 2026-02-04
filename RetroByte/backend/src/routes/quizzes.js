const express = require('express');
const authMiddleware = require('../middleware/auth');
const Quiz = require('../models/Quiz');
const User = require('../models/User');

const router = express.Router();

// Get all quizzes
router.get('/', async (req, res) => {
  try {
    const { category, difficulty } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;

    const quizzes = await Quiz.find(filter);
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get quiz by ID
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Submit quiz answers
router.post('/:id/submit', authMiddleware, async (req, res) => {
  try {
    const { answers } = req.body;
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    let score = 0;
    const feedback = [];

    quiz.questions.forEach((question, index) => {
      const isCorrect = answers[index] === question.correctAnswer;
      if (isCorrect) {
        score += question.points;
      }
      feedback.push({
        questionIndex: index,
        isCorrect,
        explanation: question.explanation
      });
    });

    const percentage = (score / (quiz.questions.length * 10)) * 100;
    const passed = percentage >= quiz.passingScore;

    // Update user
    const user = await User.findById(req.userId);
    user.completedQuizzes.push({
      quizId: quiz._id,
      score: percentage,
      completedAt: Date.now()
    });

    if (passed) {
      user.experience += 50;
      user.coins += 10;
      user.achievements.totalQuizzesCompleted += 1;
    }

    await user.save();
    quiz.completionCount += 1;
    await quiz.save();

    res.json({
      score: percentage,
      passed,
      feedback,
      experienceGained: passed ? 50 : 0,
      coinsGained: passed ? 10 : 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
