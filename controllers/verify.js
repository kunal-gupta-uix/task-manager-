import * as verificationServices from '../services/verification.js';
import {User} from '../models/index.js';

export async function sendOTP(req, res){
    try{
        const sender_id = req.user.user_id;
        const user =await User.findByPk(sender_id);
        const destination_email = user.email;
        await verificationServices.sendOTP({destination_email});
        return res.status(200).json({message: 'OTP sent on your email id'});
    }
    catch(err)
    {
        res.status(500).json({message:'Error while sending OTP', error: err.message});
    }  
};

export async function verifyOTP(req, res){
    try{
        const sender_id = req.user.user_id;
        const enteredOtp = req.body.otp;
        await verificationServices.verifyOTP({sender_id,enteredOtp});
        return res.status(200).json({message: 'OTP Successfully verified'});
    }
    catch(err)
    {
        res.status(500).json({message:'Error while verifying OTP', error: err.message});
    }
};