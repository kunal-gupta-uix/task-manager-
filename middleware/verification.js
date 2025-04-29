import {User} from '../models/index.js';

export async function isVerified(req, res, next){
    try{
        const user_id = req.user.user_id;
        const user = await User.findByPk(user_id);
        const isVerified = user.isVerified;
        if(!isVerified)
        {
            return res.status(403).json({message:'Verify yourself first in order to use the services'});
        }
        next();
    }
    catch(err)
    {
        console.error('Verification middleware error', err);
        res.status(500).json({message:'Error while checking verification status', error:err.message});
    }
};