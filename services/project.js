import {Project,ProjectMember,User} from '../models/index.js';
import * as enums from '../utils/constants.js';
import { sequelize } from '../config/db.js';
import * as emailServices from './email.js';

// add new member to project
export async function addMember ({project_id, user_id, role, transaction = null}) {
    const t = transaction || await sequelize.transaction();
    const shouldCommit = !transaction;
    try{
    //check if all necessary attributes have been passed or not
    if(!user_id || !role || !project_id)
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
                role : 'owner'
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
            user_id : user_id
        }});
  
    if(existing)
    {
        throw new Error('User already in project');
    }

    // If request is a valid one, let's add the project member 
    const newMember =  await ProjectMember.create({
        project_id,
        user_id: user_id,
        role: role
    },{transaction : t});
    const destination_email = (await User.findByPk(user_id)).email;
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


export async function createProject ({title, description, deadline, sender_id}) {
    const t = await sequelize.transaction();
    try
    {
      // create new project in the projects table
      const newProject = await Project.create({
        title,
        description,
        status : 'active',
        deadline
      },{transaction : t});
        const project_id = newProject.id;
        const role = 'owner';
        await addMember({project_id, user_id : sender_id, role,transaction: t});
        const destination_email = (await User.findByPk(sender_id)).email;
        const html = `<html>
        <body>
        <h1>Project has been created successfully</h1>
        <p> You have successfully created a new project
        <br> Project title: ${title}</p>
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
        // Proceed with the request 
        return await ProjectMember.findAll({
            where:{
                user_id : user_id
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


export async function updateProject ({id, sender_id, status, title, description, deadline}) {
    const t = await sequelize.transaction();
    try{
        
        if(!Object.values(enums.project_status).includes(status))
        {
            throw new Error('Invalid status');
        }

        const sender = await ProjectMember.findOne({
            where:{
                id,
                user_id: sender_id
            }
        });

        if(sender.role != 'owner')
        {
            throw new Error('Not authorised to update project details');
        }
        //update the project status if everything is fine
        const req_project = await Project.findByPk(id);
        const old_title = req_project.title;
        req_project.status = status;
        req_project.title = title;
        req_project.description = description;
        req_project.deadline = deadline;
        await req_project.save({transaction : t});

        const html = `<html>
        <body>
        <p>There has been an update in the project ${old_title}
        <br> To check all the details, please check the project details section
        <br> Thank you
        </p>
        </body>
        </html>`;

        const members = await getAllMembers({ id });
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
export async function getAllMembers ({id}) {
    try{
        const allProjectsMembers = await ProjectMember.findAll({
            where:{
                project_id: id
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

