const User = require('../models/User');
const Project = require('../models/Project');
const ProjectMember = require('../models/ProjectMember');
const jwt = require('jsonwebtoken');

// Create new project controller 
const createProject = async (req, res) => {
    try{
        const {project_title, project_description, project_deadline} = req.body;
        if(!project_title || !project_description || !project_deadline)
        {
            return res.status(400).json({message: 'Please provide all fields for creating the project'});
        }
        // create new Project
        const newProject = await Project.create(
            {
            project_title,
            project_description,
            project_deadline
            }
        );
        
        res.status(201).json({message: 'project created successfully',
            project :{
                title: newProject.project_title,
                description: newProject.project_description,
                deadline: newProject.project_deadline
            }
        });

    }
    catch(error){
        console.log('Error while creating new project ', error);
        res.status(500).json({message: 'Server error while creating new project'});
    }
};