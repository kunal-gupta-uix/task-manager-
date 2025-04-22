const express = require('express');
const projectRouter = express.Router();
const {addNewProjectController, updateProjectController, getUserProjectsController, addMemberToProjectController, getMembersOfProjectController} = require('../controllers/projectController');
const {protect} = require('../middleware/verifyToken');
const { projectAccess } = require('../middleware/projectAccess');

//POST API // add new project
projectRouter.post('/addNewProject',protect, addNewProjectController);

// POST API // update project status
projectRouter.post('/updateProject',protect,projectAccess, updateProjectController);

//GET API // get all projects of a user
projectRouter.get('/getUserProjects',protect, getUserProjectsController);

// POST API // add member to project
projectRouter.post('/addMemberToProject',protect,projectAccess, addMemberToProjectController);

// GET API // get all members of a project
projectRouter.get('/getMembersOfProject', protect,projectAccess, getMembersOfProjectController);
module.exports = projectRouter;