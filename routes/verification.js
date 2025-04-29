import express from 'express';
const verificationRouter = express.Router();
import * as controllers from '../controllers/verify.js';
import {auth} from '../middleware/auth.js';
//POST API for sending otp 
verificationRouter.post('/sendOtp',auth, controllers.sendOTP);

//POST API for verifying otp 
verificationRouter.post('/verifyOtp',auth, controllers.verifyOTP);

export default verificationRouter;