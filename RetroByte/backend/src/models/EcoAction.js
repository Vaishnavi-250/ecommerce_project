const mongoose = require('mongoose');

const ecoActionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  actionType: {
    type: String,
    enum: ['tree-planted', 'waste-segregated', 'energy-saved', 'water-saved', 'pollution-reduced'],
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  unit: String,
  description: String,
  imageUrl: String,
  location: {
    latitude: Number,
    longitude: Number,
    address: String
  },
  verified: {
    type: Boolean,
    default: false
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  environmentalImpactScore: {
    type: Number,
    default: 0
  },
  coinsRewarded: {
    type: Number,
    default: 0
  },
  missionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mission'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('EcoAction', ecoActionSchema);
