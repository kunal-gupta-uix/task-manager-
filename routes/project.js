import express from 'express';
const projectRouter = express.Router();
import * as controllers from '../controllers/project.js';
import {auth} from '../middleware/auth.js';
import { projectAuth } from '../middleware/projectAuth.js';
import {isVerified} from '../middleware/verification.js';

//POST API // add new project
projectRouter.post('/createProject',auth,isVerified, controllers.createProject);

// POST API // update project status
projectRouter.post('/updateProject',auth,isVerified,projectAuth, controllers.updateProject);

//GET API // get all projects of a user
projectRouter.get('/getAllProjectsOfUser',auth,isVerified, controllers.getAllProjectsOfUser);

// POST API // add member to project
projectRouter.post('/addMember',auth,isVerified,projectAuth, controllers.addMember);

// GET API // get all members of a project
projectRouter.get('/getAllMembers', auth,isVerified,projectAuth, controllers.getAllMembers);

export default projectRouter;