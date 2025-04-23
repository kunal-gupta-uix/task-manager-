const {User} = require('../models/User');
const {sendEmail} = require('./emailServices');

const generateOTP = async (destination_email) => {
    try{
        if(!destination_email)
        {
            throw new Error("All necessary fields must be filled");
        }
        const newOtp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

        const user =await User.findOne({
            where:{
                email: destination_email
            }
        });

        user.otp = newOtp;
        const currExpiration = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now
        user.otpExpiration = currExpiration;

        await user.save();

        // create email html
        const emailHtml = `<p>Your OTP is: <b>${newOtp} </b>. It is valid for 15 minutes </p>`;
        await sendEmail(destination_email, emailHtml);
        return {success: true, message: 'OTP successfully sent'};
    }
    catch(err)
    {
        throw err;
    }
};

const verifyOTP = async (sender_id, enteredOtp) => {
    try{
        if(!sender_id || !enteredOtp)
        {
            throw new Error('All necessary fields must be filled');
        }
        const user =await User.findByPk(sender_id);
        const actualOtp = user.otp;
        const currTime = new Date();
        const otpExpiration = user.otpExpiration;
        if(actualOtp != enteredOtp || currTime > otpExpiration)
        {
            throw new Error('Invalid or expired otp, please generate again');
        }
        user.isVerified = true;
        return {success: true, message:'OTP verified successfully'};
    }
    catch(err)
    {
        throw err;
    }
};

module.exports = {generateOTP, verifyOTP};