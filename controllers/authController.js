const bcrypt = require('bcryptjs');
const User = require('../models/User');
const validator = require('validator');

// Signup Controller
const signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    // check if email is a valid one
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email.' });
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      email,
      password: hashedPassword,
      username,
    });

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser.user_id,
        email: newUser.email,
        username: newUser.username,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error during signup' });
  }
};


// login controller
const login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        //1. Check if both the email and password are provided or not
        if(!email || !password)
            {
              return res.status(400).json({message: 'Both email and password are required'});
            } 
        // 2. Find user by email
        const user = await User.findOne({where:{email}});
        if(!user)
        {
            return res.status(400).json({error: 'User not found'});
        }
        
        //3. check if the password matches 
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
        {
            return res.status(401).json({error: 'Invalid password'});
        }

        //4. Respond with user's data if the password matches
        res.status(200).json({
            message: 'Login successful',
            user: {
                id : user.user_id,
                email: user.email,
                username: user.username
            }
        });
    } 
    catch (error) {
        console.error('Login error ', error);
        res.status(500).json({error: 'Internal error during login'});
    }
};

module.exports = { signup, login };
