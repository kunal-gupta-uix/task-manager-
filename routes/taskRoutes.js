const express = require('express');
const taskRouter = express.Router();
const {createTaskController, updateTaskController, deleteTaskController} = require('../controllers/taskController');
const {protect} = require('../middleware/verifyToken');
const {projectAccess} = require('../middleware/projectAccess');
const {taskAccess} = require('../middleware/taskAccess');

// POST API for creating new task 
taskRouter.post('/createTask', protect, projectAccess, createTaskController);

// POST API for updating task details
taskRouter.post('/updateTask',protect,projectAccess, taskAccess, updateTaskController);

// POST API for deleting a task
taskRouter.post('/deleteTask', protect, projectAccess, taskAccess, deleteTaskController);

module.exports = taskRouter;