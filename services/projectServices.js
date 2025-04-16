const {Project} = require('../models/Project');
const {User} = require('../models/User');
const {ProjectMember} = require('../models/ProjectMember');
const {project_status} = require('../utils/constants');


// add new member to project
const addMemberToProject = async (req, res) => {
    try{
    const sender_id = req.user.id;
    const new_member_id = req.body.project_member_id;
    const member_role = req.body.project_member_role;
    const project_id = req.body.project_id;

    //check if all necessary attributes have been passed or not
    if(!new_member_id || !member_role || !project_id)
    {
        return res.status(400).json({message: 'All necessary fields must be filled'});
    }
    
    if(member_role != 'member' && member_role != 'owner')
    {
        return res.status(400).json({message: 'invalid role specified'});
    }
    
    const valid_member = await User.findByPk(new_member_id);
    if(!valid_member)
    {
        return res.status(404).json({message: 'Not a member of the database'});
    }
    
    const already_added = await ProjectMember.findOne({
        where:{
            project_id,
            project_member_id : new_member_id
        }
    }
    );
  
    if(already_added)
    {
        return res.status(409).json({message: 'This is an already added member'});
    }


    if(member_role == 'owner')
    {
        if(sender_id != new_member_id)
        {
           return res.status(403).json({message: 'Unauthorized user'});
        }
    }

    // If request is a valid one, let's add the project member 
    try{
    const newProjectMember = await ProjectMember.create({
        project_id,
        project_member_id: new_member_id,
        member_role : member_role
    });

    return res.status(201).json({message: 'new Member added successfully'});
    }
    catch(err)
    {
        return res.status(500).json({message: 'Error while adding new member', error: err.message});
    }
}
catch(error)
{
    return res.status(500).json({message: 'Error while adding project member', error: error.message});
}  
};


const addNewProject = async (req, res) => {
  try
  {
    const sender_id = req.user.id;
    const project_title = req.body.project_title;
    const project_description = req.body.project_description;
    const project_status = req.body.project_status;
    const project_deadline = req.body.project_deadline;

    //check if all fields are present or not
    if(!project_title || !project_description || !project_status || !project_deadline)
    {
        return res.status(400).json({message:'All necessary fields must be filled'});
    }

    // check if the sender is a genuine person 
    const validSender = await User.findByPk(sender_id);
    if(!validSender)
    {
        return res.status(404).json({message: 'Unauthorised request'});
    }

    
    // Create new project in the projects table
    const newProject = await Project.create({
        project_title,
        project_description,
        project_status,
        project_deadline
    }
    );

    // add new Project member in the projectMembers table as an owner
    req.body.project_id = newProject.project_id;
    req.body.member_role = 'owner';
    req.body.project_member_id = sender_id;
    
    try{
       await addMemberToProject(req, res);
       return res.status(201).json({message: 'Project created successfully'});
    }
    catch(er)
    {
        await newProject.destroy();
        return res.status(500).json({message:'Project created successfully but error while adding owner', error: er.message});
    }
  }

  catch(err)
    {
        return res.status(500).json({message:'Error while creating project', error: err.message});
    }
}



// get all projects of a user
const getUserProjects = async (req, res) => {
    try{
        const sender_id = req.user.id;
        if(!sender_id)
        {
            return res.status(401).json({message: 'Unauthorised user'});
        }
        //check if the sender is a valid one 
        const valid_sender = await User.findByPk(sender_id);
        if(!valid_sender)
        {
            return res.status(401).json({message: 'Unauthorised user'});
        }

        const projects = await ProjectMember.findAll({
            where:{
                project_member_id : sender_id
            },
            include: [
                {
                    model: Project
                }
            ]
        });

        return res.status(200).json({message: 'Projects fetched successfully', projects});
    }
    catch(err)
    {
        return res.status(500).json({message: 'Error while fetching projects', error: err.message});
    }
};


const updateProjectStatus = async (req, res) => {
    try{
        const sender_id = req.user.id;
        const new_status = req.body.project_status;
        const project_id = req.body.project_id;
        if(!new_status || !project_id || !sender_id)
        {
            return res.status(400).json({message: 'All fields are necessary'});
        }
        if(!project_status.includes(new_status))
        {
            return res.status(400).json({message: 'invalid project status value'});
        }

        const sender = await ProjectMember.findOne({
            where:{
                project_id,
                project_member_id: sender_id
            }
        });

        if(!sender)
        {
            return res.status(404).json({message: 'You are not a member of this project'});
        }

        const designation = sender.project_member_role;
        if(designation != 'owner')
        {
            return res.status(403).json({message: 'Not authorised to change the project status'});
        }
        
        //update the project status if everything is working fine
        const req_project = await Project.findByPk(project_id);
        req_project.project_status = new_status;
        await req_project.save();
        return res.status(200).json({message: 'Project status updated successfully'});

    }
    catch(err)
    {
        return res.status(500).json({message: 'Error while updating project status', error: err.message});
    }

};

module.exports = {addNewProject, updateProjectStatus, getUserProjects, addMemberToProject};