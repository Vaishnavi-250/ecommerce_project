const express = require('express');
const authMiddleware = require('../middleware/auth');
const EcoAction = require('../models/EcoAction');
const User = require('../models/User');

const router = express.Router();

// Log eco action
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { actionType, quantity, unit, description, location, missionId } = req.body;

    const ecoAction = new EcoAction({
      userId: req.userId,
      actionType,
      quantity,
      unit,
      description,
      location,
      missionId
    });

    await ecoAction.save();

    const user = await User.findById(req.userId);
    user.ecoActions.push(ecoAction._id);
    user.achievements.totalEcoActionsLogged += 1;
    user.achievements.environmentalImpact += quantity;
    user.coins += 5;
    await user.save();

    res.status(201).json({
      message: 'Eco action logged successfully',
      action: ecoAction,
      coinsGained: 5
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's eco actions
router.get('/user/:userId', async (req, res) => {
  try {
    const actions = await EcoAction.find({ userId: req.params.userId });
    res.json(actions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Verify eco action (admin)
router.patch('/:id/verify', authMiddleware, async (req, res) => {
  try {
    const ecoAction = await EcoAction.findByIdAndUpdate(
      req.params.id,
      { verified: true, verifiedBy: req.userId },
      { new: true }
    );

    if (!ecoAction) {
      return res.status(404).json({ message: 'Action not found' });
    }

    res.json({ message: 'Action verified', action: ecoAction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
