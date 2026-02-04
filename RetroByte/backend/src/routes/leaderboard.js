const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Get global leaderboard
router.get('/', async (req, res) => {
  try {
    const { limit = 10, offset = 0 } = req.query;
    const users = await User.find()
      .sort({ experience: -1, coins: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(offset))
      .select('username avatar level experience coins achievements');

    const total = await User.countDocuments();

    res.json({
      leaderboard: users.map((user, index) => ({
        rank: parseInt(offset) + index + 1,
        ...user.toObject()
      })),
      total,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get leaderboard by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const { limit = 10 } = req.query;

    let sortQuery = {};
    if (category === 'quizzes') sortQuery = { 'achievements.totalQuizzesCompleted': -1 };
    else if (category === 'missions') sortQuery = { 'achievements.totalMissionsCompleted': -1 };
    else if (category === 'eco-actions') sortQuery = { 'achievements.totalEcoActionsLogged': -1 };
    else sortQuery = { experience: -1 };

    const users = await User.find()
      .sort(sortQuery)
      .limit(parseInt(limit))
      .select('username avatar level experience coins achievements');

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user rank
router.get('/user/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const rank = await User.countDocuments({ experience: { $gt: user.experience } });

    res.json({
      user: {
        username: user.username,
        experience: user.experience,
        coins: user.coins,
        level: user.level
      },
      rank: rank + 1
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
