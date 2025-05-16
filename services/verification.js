import {Otp,User} from '../models/index.js';
import * as emailServices from './email.js';
import { sequelize } from '../config/db.js';
import { generateOtp } from '../utils/generateOtp.js';

export async function sendOTP ({destination_email}) {
    const t = await sequelize.transaction();
    try{
        if(!destination_email)
        {
            throw new Error("All necessary fields must be filled");
        }
        const newOtp = generateOtp(); // 6-digit OTP
        const currExpiration = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now
        const user =await User.findOne({
            where:{
                email: destination_email
            }
        });
        
        const alreadyPresentInOtpTable =await Otp.findOne({
            where:{
                user_id: user.user_id
            }
        });
        
        if(alreadyPresentInOtpTable)
        {
            alreadyPresentInOtpTable.otp = newOtp;
            alreadyPresentInOtpTable.otp_expiry = currExpiration;
            await alreadyPresentInOtpTable.save({ transaction: t });
        }
        else{
            await Otp.create({
                user_id: user.user_id,
                email: user.email,
                otp: newOtp,
                otp_expiry: currExpiration
            },{transaction: t});
        }
        
        // create email html
        const html = `<p>Your OTP is: <b>${newOtp} </b>. It is valid for 15 minutes </p>`;
        await emailServices.sendEmail({destination_email, html});
        await t.commit();
        return {success: true, message: 'OTP successfully sent'};
    }
    catch(err)
    {
        await t.rollback();
        throw err;
    }
};

export async function verifyOTP ({sender_id, enteredOtp}) {
    const t = await sequelize.transaction();
    try{
        if(!sender_id || !enteredOtp)
        {
            throw new Error('All necessary fields must be filled');
        }
        const user =await User.findByPk(sender_id);
        const userInOtpTable =await Otp.findByPk(sender_id);
        if(!userInOtpTable)
        {
            throw new Error('Send otp first in order to verify');
        }
        const actualOtp = userInOtpTable.otp;
        const currTime = new Date();
        const otpExpiration = userInOtpTable.otp_expiry;
        if(actualOtp != enteredOtp || currTime > otpExpiration)
        {
            throw new Error('Invalid or expired otp, please generate again');
        }
        user.isVerified = true;
        await user.save({transaction: t});
        await t.commit();
        return {success: true, message:'OTP verified successfully'};
    }
    catch(err)
    {
        await t.rollback();
        throw err;
    }
};
