const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  icon: String,
  criterion: {
    type: {
      type: String,
      enum: ['quizzes-completed', 'missions-completed', 'eco-actions', 'experience', 'streak'],
      required: true
    },
    value: Number
  },
  rarity: {
    type: String,
    enum: ['common', 'uncommon', 'rare', 'epic', 'legendary'],
    default: 'common'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Badge', badgeSchema);
