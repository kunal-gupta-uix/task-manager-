import express from 'express';
const projectRouter = express.Router();
import * as controllers from '../controllers/project.js';
import {protect} from '../middleware/verifyToken.js';
import { projectAccess } from '../middleware/projectAccess.js';

//POST API // add new project
projectRouter.post('/addNewProject',protect, controllers.addNewProject);

// POST API // update project status
projectRouter.post('/updateProjectDetails',protect,projectAccess, controllers.updateProjectDetails);

//GET API // get all projects of a user
projectRouter.get('/getAllProjectsOfUser',protect, controllers.getAllProjectsOfUser);

// POST API // add member to project
projectRouter.post('/addNewMemberToProject',protect,projectAccess, controllers.addNewMemberToProject);

// GET API // get all members of a project
projectRouter.get('/getAllMembersOfProject', protect,projectAccess, controllers.getAllMembersOfProject);

export default projectRouter;