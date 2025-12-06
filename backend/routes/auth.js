const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// @route   POST api/auth/login
router.post('/login', authController.login);

// @route   POST api/auth/register
router.post('/register', authController.register);

// @route   GET api/auth/seed
router.get('/seed', authController.seedUsers);

module.exports = router;
