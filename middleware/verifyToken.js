const jwt = require('jsonwebtoken');
const User = require('../models/User');
const protect = async (req,res,next)=>{
    try{
    const authHeader = req.headers.authorization;
    if(! authHeader || !authHeader.startsWith('Bearer '))
    {
        return res.status(401).json({message: 'No token provided'});
    }
    const token = authHeader.split(' ')[1];  

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
   }
   catch(error)
   {
    console.error('Auth middleware error:', error);
    res.status(401).json({ message: 'Invalid or expired token' });
   }

};

module.exports = protect;