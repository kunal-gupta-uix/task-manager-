const {login, signup} = require('../services/authServices');

const loginController = async (req, res) => {
  try{
    const email_id = req.body.email;
    const password = req.body.password;
    const {token, user} = await login({email_id, password});
    return res.status(200).json({message: 'Login successful', token, user});
  }
  catch(err)
  {
    res.status(500).json({message: 'Error while login', error: err.message});
  }

}; 

const signupController = async (req, res) => {
  try{
    const username = req.body.username;
    const email  = req.body.email;
    const password = req.body.password;
    const user = await signup({username, email, password});
    return res.status(201).json({message: 'signup successful', user});
  }
  catch(err)
  {
    return res.status(500).json({message: 'Error while signUp', error: err.message});
  }
}

module.exports = { loginController, signupController};