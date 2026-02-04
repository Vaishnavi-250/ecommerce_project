const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false
  },
  avatar: {
    type: String,
    default: 'https://via.placeholder.com/150'
  },
  bio: {
    type: String,
    default: ''
  },
  level: {
    type: Number,
    default: 1
  },
  experience: {
    type: Number,
    default: 0
  },
  coins: {
    type: Number,
    default: 0
  },
  badges: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Badge'
  }],
  completedQuizzes: [{
    quizId: mongoose.Schema.Types.ObjectId,
    score: Number,
    completedAt: Date
  }],
  completedMissions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mission'
  }],
  ecoActions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EcoAction'
  }],
  achievements: {
    totalQuizzesCompleted: { type: Number, default: 0 },
    totalMissionsCompleted: { type: Number, default: 0 },
    totalEcoActionsLogged: { type: Number, default: 0 },
    highestQuizScore: { type: Number, default: 0 },
    environmentalImpact: { type: Number, default: 0 }
  },
  preferences: {
    notifications: { type: Boolean, default: true },
    language: { type: String, default: 'en' },
    theme: { type: String, default: 'light' }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
