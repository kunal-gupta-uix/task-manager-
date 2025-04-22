const {transporter} = require('../utils/emailTransporter');
const sendEmail = async (destination_email, html) =>{
    try{
        if(!destination_email || !html)
        {
            throw new Error('All necessary fields must be passed');
        }
        
        const info = await transporter.sendMail({
            from: `"Task Manager" <${process.env.EMAIL_USER}>`,
            to: destination_email,
            subject: "Task Manager Verification Email",
            html
          });

        return { success: true, message: "Email sent", info: info.response };

    }
    catch(err)
    {
        throw err;
    }

};

module.exports = {sendEmail};