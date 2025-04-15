const {User} = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try{
    const email_id = req.body.email;
    const actual_password = req.body.password;
    
    // check for bad request
    if(!email_id || !actual_password)
    {
        return res.status(400).json({message:'All fields are mandatory'});
    }


    //check if the email is present in database or not
    const existingUser = await User.findOne({
        where:{
            email : email_id
        }
    });
    
    if(!existingUser)
    {
        return res.status(404).json({message: 'No details found'});
    }

    const hashed_password = existingUser.password;
    const valid_details = await bcrypt.compare(actual_password, hashed_password);
    
    if(!valid_details)
    {
        return res.status(401).json({message: 'Invalid password'});
    }
    
    const token  = jwt.sign({id: existingUser.user_id},process.env.JWT_SECRET ,{expiresIn: '1h'} );
    
    return res.status(200).json({message: 'Logged in successfully', token});
    }
    catch(err)
   {
    return res.status(500).json({message:'Error while login', error : err.message});
   }

};

module.exports = {login};