import jwt from 'jsonwebtoken';
import {User} from '../models/index.js';
export async function auth (req,res,next) { 
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
   catch(err)
   {
    console.error('Auth middleware error:', err);
    res.status(401).json({ message: 'Error while verifying token', error : err.message});
   }
};
