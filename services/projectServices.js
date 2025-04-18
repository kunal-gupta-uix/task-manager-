const {Project} = require('../models/Project');
const {User} = require('../models/User');
const {ProjectMember} = require('../models/ProjectMember');
const {project_member_roles, project_status} = require('../utils/constants');


// add new member to project
const addMemberToProject = async ({project_id, member_id, role}) => {
    try{
     
    //check if all necessary attributes have been passed or not
    if(!member_id || !role || !project_id)
    {
        throw new Error('All necessary fields must be filled');
    }
    
    if(!Object.values(project_member_roles).includes(role))
    {
        throw new Error('Invalid role');
    }
    
    const user = await User.findByPk(member_id);
    if(!user)
    {
        throw new Error('User not found');
    }
    
    const existing = await ProjectMember.findOne({
        where:{
            project_id,
            project_member_id : member_id
        }
    });
  
    if(existing)
    {
        throw new Error('User already in project');
    }

    // If request is a valid one, let's add the project member 
    return await ProjectMember.create({
        project_id,
        project_member_id: member_id,
        project_member_role: role
    });
}
catch(error)
{
    throw error;
}  
};


const addNewProject = async ({project_title, project_description, project_status, project_deadline, sender_id}) => {
  try
  {
    //check if all fields are present or not
    if(!project_title || !project_description || !project_status || !project_deadline|| !sender_id)
    {
        throw new Error('All necessary fields must be filled');
    }
    // create new project in the projects table
    const newProject = await Project.create({
        project_title,
        project_description,
        project_status,
        project_deadline
    });
    const project_id = newProject.project_id;
    const role = 'owner';
    const newProjectOwner = await addMemberToProject({project_id, member_id : sender_id, role});
    return newProject;
  }
  catch(err)
    {
        throw err;
    }
}


// get all projects of a user
const getUserProjects = async ({user_id}) => {
    try{
        if(!user_id)
        {
            throw new Error('All necessary fields must be filled');
        }
        //check if the sender is a valid one 
        const existing = await User.findByPk(user_id);
        if(!existing)
        {
            throw new Error('User not found');
        }
        
        // Proceed with the request if sender is a valid one
        return await ProjectMember.findAll({
            where:{
                project_member_id : user_id
            },
            include: [
                {
                    model: Project
                }
            ]
        });

    }
    catch(err)
    {
        throw err;
    }
};


const updateProjectStatus = async ({project_id, sender_id, new_status}) => {
    try{
        if(!new_status || !project_id || !sender_id)
        {
            throw new Error('All necessary fields must be filled');
        }
        
        if(!Object.values(project_status).includes(new_status))
        {
            throw new Error('Invalid status');
        }

        const sender = await ProjectMember.findOne({
            where:{
                project_id,
                project_member_id: sender_id
            }
        });

        if(!sender || sender.project_member_role != 'owner')
        {
            throw new Error('Not authorised to change project status');
        }
        
        //update the project status if everything is fine
        const req_project = await Project.findByPk(project_id);
        req_project.project_status = new_status;
        await req_project.save();
        return req_project;
    }
    catch(err)
    {
        throw err;
    }

};

module.exports = {addNewProject, updateProjectStatus, getUserProjects, addMemberToProject};