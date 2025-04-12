const express = require('express');
const {connectDB} = require('./config/db');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Middleware to parse json in requests

//connect to mysql database
connectDB();

//basic route
app.get('/', (req, res)=>{
    res.send('Welcome to the task manager API');
});

// start the server
app.listen(PORT, ()=>{
    console.log(`Server started on PORT number https://localhost:{PORT}`);
});

