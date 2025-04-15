const {Project} = require('../models/Project');
const {User} = require('../models/User');
const {addProjectMember} = require('../services/addProjectMember');

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
       await addProjectMember(req, res);
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

module.exports = {addNewProject};