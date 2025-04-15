const {User} = require('../models/User');
const bcrypt = require('bcryptjs');

const signup = async (req, res) => {
    try{
        const new_username = req.body.username;
        const email_id = req.body.email;
        const password = req.body.password;

        //check for bad request
        if(!new_username || !email_id || !password)
        {
            return res.status(400).json({message: 'All fields are necessary'});
        }

        // check if user is already registered
        const already = await User.findOne({
            where:{
                email : email_id
            }
        });

        if(already)
        {
            return res.status(409).json({message: 'User already registered, please login'});
        }

        // hash the password for further storage
        const hashed_password = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            email: email_id,
            password: hashed_password,
            username: new_username
        });

        return res.status(201).json({message: 'Signup Successful'});

    }
    catch(err)
    {
        return res.status(500).json({message: 'Error while signup', error: err.message});
    }
};

module.exports = {signup};
