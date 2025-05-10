import express from 'express';
const taskRouter = express.Router();
import * as controllers from '../controllers/task.js';
import {auth} from '../middleware/auth.js';
import {projectAuth} from '../middleware/projectAuth.js';

// POST API for creating new task 
taskRouter.post('/create', auth, projectAuth, controllers.create);
  
// POST API for updating task details
taskRouter.post('/update',auth,projectAuth, controllers.update);

export default taskRouter; 