const express = require('express');
const authRouter = express.Router();
const {signupController, loginController} = require('../controllers/authController');

// POST API/auth/signup
authRouter.post('/signup', signupController);

// POST API /auth/login
authRouter.post('/login', loginController);

module.exports = authRouter;
