// utils/generateOtp.js
export function generateOtp () {
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    return otp.toString();
  };  
  
  
