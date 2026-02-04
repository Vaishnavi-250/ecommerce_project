const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  category: {
    type: String,
    enum: ['climate', 'waste', 'energy', 'water', 'biodiversity', 'pollution'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'intermediate'
  },
  questions: [{
    question: String,
    options: [String],
    correctAnswer: Number,
    explanation: String,
    points: { type: Number, default: 10 }
  }],
  timeLimit: {
    type: Number,
    default: 300
  },
  passingScore: {
    type: Number,
    default: 70
  },
  icon: String,
  imageUrl: String,
  completionCount: {
    type: Number,
    default: 0
  },
  averageScore: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Quiz', quizSchema);
