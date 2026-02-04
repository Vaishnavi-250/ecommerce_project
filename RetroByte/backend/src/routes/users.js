const express = require('express');
const authMiddleware = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate('badges')
      .populate('ecoActions');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { bio, avatar, preferences } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      { bio, avatar, preferences, updatedAt: Date.now() },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user stats
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({
      level: user.level,
      experience: user.experience,
      coins: user.coins,
      badges: user.badges.length,
      achievements: user.achievements
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
