import * as authServices from '../services/auth.js'; 

export async function login (req, res) {
  try{
    const email_id = req.body.email;
    const password = req.body.password;
    const {token, user} = await authServices.login({email_id, password});
    return res.status(200).json({message: 'Login successful', token, user});
  }
  catch(err)
  {
    res.status(500).json({message: 'Error while login', error: err.message});
  }

}; 

export async function signup (req, res) {
  try{
    const username = req.body.username;
    const email  = req.body.email;
    const password = req.body.password;
    const user = await authServices.signup({username, email, password});
    return res.status(201).json({message: 'signup successful', user});
  }
  catch(err)
  {
    return res.status(500).json({message: 'Error while signUp', error: err.message});
  }
}
