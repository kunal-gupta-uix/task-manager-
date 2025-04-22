const {Project} = require('../models/Project');
const {User} = require('../models/User');
const {ProjectMember} = require('../models/ProjectMember');
const {project_member_roles, project_status} = require('../utils/constants');
const { sequelize } = require('../config/db');


// add new member to project
const addMemberToProject = async ({project_id, member_id, role}, transaction = null) => {
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
    if(role == 'owner')
    {
        const project_owner_already_exists = await ProjectMember.findOne({
            where:{
                project_id,
                project_member_role : 'owner'
            }
        , transaction});
        if(project_owner_already_exists)
        {
            throw new Error('There can be only one project owner and owner can not be changed');
        }
    }

    const existing = await ProjectMember.findOne({
        where:{
            project_id,
            project_member_id : member_id
        }
    , transaction});
  
    if(existing)
    {
        throw new Error('User already in project');
    }

    // If request is a valid one, let's add the project member 
    return await ProjectMember.create({
        project_id,
        project_member_id: member_id,
        project_member_role: role
    },{transaction});
}
catch(error)
{
    throw error;
}  
};


const addNewProject = async ({project_title, project_description, project_deadline, sender_id}) => {
    const t = await sequelize.transaction();
    try
    {
      //check if all fields are present or not
      if(!project_title || !project_description || !project_deadline|| !sender_id)
      {
        throw new Error('All necessary fields must be filled');
      }
      // create new project in the projects table
      const newProject = await Project.create({
        project_title,
        project_description,
        project_status : 'active',
        project_deadline
      },{transaction : t});
    
        const project_id = newProject.project_id;
        const role = 'owner';
        await addMemberToProject({project_id, member_id : sender_id, role}, t);
        await t.commit();
        return newProject;
  }
  catch(err)
    { 
        await t.rollback();
        throw err;
    }
};


// get all projects of a user
const getUserProjects = async ({user_id}) => {
    try{
        if(!user_id)
        {
            throw new Error('All necessary fields must be filled');
        }
        
        // Proceed with the request 
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


const updateProject = async ({project_id, sender_id, new_status, new_title, new_description, new_deadline}) => {
    try{
        if(!new_status || !project_id || !sender_id || !new_title ||!new_description || !new_deadline)
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

        if(sender.project_member_role != 'owner')
        {
            throw new Error('Not authorised to update project details');
        }
        
        //update the project status if everything is fine
        const req_project = await Project.findByPk(project_id);
        req_project.project_status = new_status;
        req_project.project_title = new_title;
        req_project.project_description = new_description;
        req_project.project_deadline = new_deadline;
        await req_project.save();
        return req_project;
    }
    catch(err)
    {
        throw err;
    }

};

//get members of a project 
const getMembersOfProject = async ({req_project_id}) =>{
    try{
        const allProjectsMembers = await ProjectMember.findAll({
            where:{
                project_id: req_project_id
            }
        });
        return allProjectsMembers;
    }
    catch(err)
    {
        throw err;
    }
};

module.exports = {addNewProject, updateProject, getUserProjects, addMemberToProject, getMembersOfProject};