import express from 'express';
import {connectDB} from './config/db.js';
import authRouter from './routes/auth.js';
import projectRouter from './routes/project.js';
import taskRouter from './routes/task.js';
import { sequelize } from './config/db.js';
import * as associatedModels from './models/index.js';

// Sync models with DB
sequelize.sync({ alter : true })  // or use { force: true } during development to drop and recreate
  .then(() => {
    console.log("All models synced with the database.");
  })
  .catch(err => {
    console.error("Failed to sync models:", err);
  });

import dotenv from 'dotenv'; // Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json()); // Middleware to parse json in requests

//connect to mysql database  
connectDB();

//basic/default route
app.get('/', (req, res)=>{
    res.send('Welcome to the task manager API');
});

app.use('/auth', authRouter);
app.use('/project',projectRouter);
app.use('/task',taskRouter);

// start the server
app.listen(PORT, ()=>{
    console.log(`Server started on PORT number http://localhost:${PORT}`);
});

