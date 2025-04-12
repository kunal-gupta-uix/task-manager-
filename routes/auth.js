const express = require('express');
const router = express.Router();
const {signup, login} = require('../controllers/authController');

// POST API/auth/signup
router.post('/signup', signup);

// POST API /auth/login
router.post('login', login);

module.exports = router;
