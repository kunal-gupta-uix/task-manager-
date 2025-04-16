const express = require('express');
const {connectDB} = require('./config/db');
const authRouter = require('./routes/authRoutes');
const projectRouter = require('./routes/projectRoutes');
const { sequelize } = require('./config/db');
const { User } = require('./models/User');
const { Project } = require('./models/Project');
const { ProjectMember } = require('./models/ProjectMember');

// Sync models with DB
sequelize.sync({ alter: true })  // or use { force: true } during development to drop and recreate
  .then(() => {
    console.log("All models synced with the database.");
  })
  .catch(err => {
    console.error("Failed to sync models:", err);
  });


require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse json in requests

//connect to mysql database
connectDB();


// routes 
app.use('/auth', authRouter);
app.use('/project',projectRouter);

//basic/default route
app.get('/', (req, res)=>{
    res.send('Welcome to the task manager API');
});

// start the server
app.listen(PORT, ()=>{
    console.log(`Server started on PORT number http://localhost:${PORT}`);
});

