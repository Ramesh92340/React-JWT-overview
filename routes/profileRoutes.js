const express = require('express');
const profileController = require('../controllers/profileController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Use the authenticateToken middleware to protect this route
router.get('/profile', authenticateToken, profileController.getProfile);

module.exports = router;
