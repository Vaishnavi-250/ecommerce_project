const express = require('express');
const authMiddleware = require('../middleware/auth');
const User = require('../models/User');
const Badge = require('../models/Badge');

const router = express.Router();

// Get user rewards
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('badges');
    res.json({
      coins: user.coins,
      experience: user.experience,
      level: user.level,
      badges: user.badges
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all available badges
router.get('/badges/available', async (req, res) => {
  try {
    const badges = await Badge.find();
    res.json(badges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Award badge to user
router.post('/badges/award', authMiddleware, async (req, res) => {
  try {
    const { badgeId } = req.body;
    const user = await User.findById(req.userId);
    
    if (!user.badges.includes(badgeId)) {
      user.badges.push(badgeId);
      await user.save();
    }

    res.json({ message: 'Badge awarded', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Redeem coins for rewards
router.post('/redeem', authMiddleware, async (req, res) => {
  try {
    const { rewardType, amount } = req.body;
    const user = await User.findById(req.userId);

    if (user.coins < amount) {
      return res.status(400).json({ message: 'Insufficient coins' });
    }

    user.coins -= amount;
    await user.save();

    res.json({
      message: 'Reward redeemed successfully',
      rewardType,
      amountRedeemed: amount,
      remainingCoins: user.coins
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
