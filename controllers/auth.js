import * as authServices from '../services/auth.js'; 
import * as validators from '../validators/auth.js';

export async function login (req, res) {
  try{
    const validatedInput = validators.validateLoginRequest({...req.body});
    const {token, user} = await authServices.login({...validatedInput});
    return res.status(200).json({message: 'Login successful', token, user});
  }
  catch(err)
  {
    res.status(400).json({message: 'Error while login', error: err.message});
  }
}; 

export async function signup (req, res) {
  try{
    const validatedInput = validators.validateSignupRequest({...req.body});
    const user = await authServices.signup({...validatedInput});
    return res.status(201).json({message: 'signup successful', user});
  }
  catch(err)
  {
    return res.status(400).json({message: 'Error while signUp', error: err.message});
  }
};
