const mongoose = require('mongoose');

const missionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  type: {
    type: String,
    enum: ['planting', 'waste-segregation', 'energy-saving', 'water-conservation', 'pollution-reduction'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  rewardCoins: {
    type: Number,
    default: 50
  },
  rewardExperience: {
    type: Number,
    default: 100
  },
  imageUrl: String,
  instructions: [String],
  verificationMethod: {
    type: String,
    enum: ['photo', 'manual', 'gps', 'automatic'],
    default: 'photo'
  },
  duration: {
    type: Number,
    description: 'Duration in days'
  },
  status: {
    type: String,
    enum: ['active', 'archived'],
    default: 'active'
  },
  completionCount: {
    type: Number,
    default: 0
  },
  environmentalImpact: {
    description: String,
    metric: String,
    value: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Mission', missionSchema);
