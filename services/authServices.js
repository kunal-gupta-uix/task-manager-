const {User} = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// login service
const login = async ({email_id, password}) => {
    try{
        // check for bad request
        if(!email_id || !password)
        {
            throw new Error('All necessary fields must be filled');
        }
        //check if the email is present in database or not
        const existing = await User.findOne({
            where:{
                email : email_id
            }
        });
    
        if(!existing)
        {
            throw new Error('Not an existing user, you must signup first');
        }
    
        const hashed_password = existing.password;
        const valid_details = await bcrypt.compare(password, hashed_password);
    
        if(!valid_details)
        {
            throw new Error('Invalid password');
        }
        const token  = jwt.sign({id: existing.user_id},process.env.JWT_SECRET ,{expiresIn: '1h'} );  
        return {token, user : existing};
    }
    catch(err)
    {      
        throw err;  
    }

};


//signup service
const signup = async ({username, email, password}) => {
    try{
        //check for bad request
        if(!username || !email || !password)
        {
            throw new Error('All necessary fields must be filled');
        }
        // check if user is already registered
        const already = await User.findOne({
            where:{
                email : email
            }
        });

        if(already)
        {
            throw new Error('Already registered user, please login to continue');
        }

        // hash the password for further storage
        const hashed_password = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            email: email,
            password: hashed_password,
            username: username
        });
        return newUser;
    }
    catch(err)
    {
        throw err;
    }
};

module.exports = {login, signup};
