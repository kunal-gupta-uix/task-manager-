import {Project,ProjectMember,User} from '../models/index.js';
import * as enums from '../utils/constants.js';
import { sequelize } from '../config/db.js';
import * as emailServices from './email.js';

// add new member to project
export async function addMember ({project_id, member_id, role, transaction = null}) {
    const t = transaction || await sequelize.transaction();
    const shouldCommit = !transaction;
    try{
    //check if all necessary attributes have been passed or not
    if(!member_id || !role || !project_id)
    {
        throw new Error('All necessary fields must be filled');
    }
    
    if(!Object.values(enums.project_member_roles).includes(role))
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
        });
        if(project_owner_already_exists)
        {
            throw new Error('There can be only one project owner and owner can not be changed');
        }
    }

    const existing = await ProjectMember.findOne({
        where:{
            project_id,
            project_member_id : member_id
        }});
  
    if(existing)
    {
        throw new Error('User already in project');
    }

    // If request is a valid one, let's add the project member 
    const newMember =  await ProjectMember.create({
        project_id,
        project_member_id: member_id,
        project_member_role: role
    },{transaction : t});
    const destination_email = (await User.findByPk(member_id)).email;
    const html = `<html>
    <body>
    <h1>Added to new project</h1>
    <p>
    You have been added as a member to a project 
    <br> To know more about this project, check the project details
    </p>
    </body>
    </html>`;

    await emailServices.sendEmail({destination_email, html});
    if(shouldCommit)
    {
        await t.commit();
    } 
    return newMember;
}
catch(error)
{
    if(shouldCommit)
    {
        await t.rollback();
    }
    throw error;
}  
};


export async function createProject ({project_title, project_description, project_deadline, sender_id}) {
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
        await addMember({project_id, member_id : sender_id, role,transaction: t});
        const destination_email = (await User.findByPk(sender_id)).email;
        const html = `<html>
        <body>
        <h1>Project has been created successfully</h1>
        <p> You have successfully created a new project
        <br> Project title: ${project_title}</p>
        </body>
        </html>`;
        
        await emailServices.sendEmail({destination_email,html});
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
export async function getAllProjectsOfUser ({user_id}) {
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
            include:{
                    model: Project
                }
        });
    }
    catch(err)
    {
        throw err;
    }
};


export async function updateProject ({project_id, sender_id, new_status, new_title, new_description, new_deadline}) {
    const t = await sequelize.transaction();
    try{
        if(!new_status || !project_id || !sender_id || !new_title ||!new_description || !new_deadline)
        {
            throw new Error('All necessary fields must be filled');
        }
        
        if(!Object.values(enums.project_status).includes(new_status))
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
        const old_title = req_project.project_title;
        req_project.project_status = new_status;
        req_project.project_title = new_title;
        req_project.project_description = new_description;
        req_project.project_deadline = new_deadline;
        await req_project.save({transaction : t});

        const html = `<html>
        <body>
        <p>There has been an update in the project ${old_title}
        <br> To check all the details, please check the project details section
        <br> Thank you
        </p>
        </body>
        </html>`;

        const members = await getAllMembers({ project_id });
        const memberEmails = members.map(member => member.User.email);


        for (let destination_email of memberEmails)
        {
            await emailServices.sendEmail({destination_email,html});
        }
        await t.commit();
        return req_project;
    }
    catch(err)
    {
        await t.rollback();
        throw err;
    }

};

//get all members of a project 
export async function getAllMembers ({project_id}) {
    try{
        const allProjectsMembers = await ProjectMember.findAll({
            where:{
                project_id
            },
            include:{
                model: User,
                attributes: ['email']
            }
        });
        return allProjectsMembers;
    }
    catch(err)
    {
        throw err;
    }
};

