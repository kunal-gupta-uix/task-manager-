const express = require('express');
const projectRouter = express.Router();
const {addNewProjectController, updateProjectStatusController, getUserProjectsController, addMemberToProjectController} = require('../controllers/projectController');
const {protect} = require('../middleware/verifyToken');

//POST API // add new project
projectRouter.post('/addNewProject',protect, addNewProjectController);

// POST API // update project status
projectRouter.post('/updateProjectStatus',protect, updateProjectStatusController);

//POST API // get all projects of a user
projectRouter.get('/getUserProjects',protect, getUserProjectsController);

// POST API // add member to project
projectRouter.post('/addMemberToProject',protect, addMemberToProjectController);

module.exports = projectRouter;