import express from 'express';
const authRouter = express.Router();
import * as controllers from '../controllers/auth.js';

// POST API/auth/signup
authRouter.post('/signup', controllers.controllerForSignup);

// POST API /auth/login
authRouter.post('/login', controllers.controllerForLogin);

export default authRouter;