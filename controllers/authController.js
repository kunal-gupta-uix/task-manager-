const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Signup Controller
const signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;

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

module.exports = { signup };
