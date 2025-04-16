const express = require('express');
const authRouter = express.Router();
const {signup, login} = require('../controllers/authController');

// POST API/auth/signup
authRouter.post('/signup', signup);

// POST API /auth/login
authRouter.post('/login', login);

module.exports = authRouter;
