const express = require('express');
const authMiddleware = require('../middleware/auth');
const Mission = require('../models/Mission');
const User = require('../models/User');

const router = express.Router();

// Get all active missions
router.get('/', async (req, res) => {
  try {
    const missions = await Mission.find({ status: 'active' });
    res.json(missions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get mission by ID
router.get('/:id', async (req, res) => {
  try {
    const mission = await Mission.findById(req.params.id);
    if (!mission) {
      return res.status(404).json({ message: 'Mission not found' });
    }
    res.json(mission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Accept mission
router.post('/:id/accept', authMiddleware, async (req, res) => {
  try {
    const mission = await Mission.findById(req.params.id);
    if (!mission) {
      return res.status(404).json({ message: 'Mission not found' });
    }

    const user = await User.findById(req.userId);
    if (!user.completedMissions.includes(req.params.id)) {
      user.completedMissions.push(req.params.id);
      await user.save();
    }

    res.json({ message: 'Mission accepted', mission });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Complete mission
router.post('/:id/complete', authMiddleware, async (req, res) => {
  try {
    const mission = await Mission.findById(req.params.id);
    if (!mission) {
      return res.status(404).json({ message: 'Mission not found' });
    }

    const user = await User.findById(req.userId);
    user.coins += mission.rewardCoins;
    user.experience += mission.rewardExperience;
    user.achievements.totalMissionsCompleted += 1;

    await user.save();
    mission.completionCount += 1;
    await mission.save();

    res.json({
      message: 'Mission completed',
      coinsGained: mission.rewardCoins,
      experienceGained: mission.rewardExperience
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
