import {ProjectMember, Task, User} from '../models/index.js';
import * as enums from '../utils/constants.js';
import * as emailServices from './email.js';
import {sequelize} from '../config/db.js';

//add new task 
export async function create ({type, title, description, sender_id, priority, parent_project, deadline,assignee}) {
    const t = await sequelize.transaction();
    try{
        if(!type || !title || !description || !sender_id || !priority || !parent_project || !deadline || !assignee)
        {
            throw new Error('All necessary fields must be filled');
        }
        
        if(!Object.values(enums.types_of_task).includes(type))
        {
            throw new Error('Invalid task type');
        }

        if(!Object.values(enums.priority_of_task).includes(priority))
        {
            throw new Error('Invalid task priority');
        }
        
        if(assignee != sender_id)
        {
            const validAssignee = await ProjectMember.findOne({
                where:{
                    project_id: parent_project,
                    project_member_id: assignee
                }
            });
            if(!validAssignee)
            {
                throw new Error('The assignee must be a member of this project');
            }
        }
        const newTask = await Task.create({
            type,
            title,
            description,
            creater : sender_id,
            priority,
            parent_project,
            deadline,
            assignee,
            status: enums.status_of_task.TODO
        },{transaction: t});

        const emails = new Set();
        const creater_email = (await User.findByPk(newTask.creater)).email;
        const new_assignee_email = (await User.findByPk(newTask.assignee)).email;
        emails.add(creater_email);
        emails.add(new_assignee_email);
        for (let email of emails)
        {
            const destination_email = email;

            const html = `<html>
            <body>
            <h1>New task created in your project.</h1>
            <p>A new task: ${newTask.title} has been created in your project.
            <br> You are a part of this task.
            <br> Please check the task for more details</p>
            </body>
            </html>`;

            await emailServices.sendEmail({destination_email,html});
        }
        await t.commit();
        return newTask;
    }
    catch(err)
    {
        await t.rollback();
        throw err;
    }
};


// update task details
export async function update ({id,type, title, description, sender_id, priority, status, deadline, new_assignee}) {
    const t = await sequelize.transaction();
    try{
        if(!id ||!type || !title || !description || !sender_id || !priority || !status || !deadline || !new_assignee)
        {
            throw new Error('All necessary fields must be filled');
        }
        
        const req_task = await Task.findByPk(id);
        if(!req_task)
        {
            throw new Error('Task does not exist in the records');
        }
        const current_assignee = req_task.assignee;
        if(sender_id != req_task.creater && sender_id != req_task.assignee)
        {
            throw new Error('Unauthorised to update task');
        }
        if(new_assignee != current_assignee)
        {
            if(sender_id != current_assignee)
            {
                throw new Error('You are unauthorised to change task assignee');
            }
            const isProjectMember = await ProjectMember.findOne({
                where:{
                    project_id: req_task.parent_project,
                    project_member_id: new_assignee
                }
            });
            if(!isProjectMember)
            {
                throw new Error('The assignee must be a member of the project');
            }
        }
        if(!Object.values(enums.types_of_task).includes(type))
        {
            throw new Error('Invalid task type');
        }

        if(!Object.values(enums.priority_of_task).includes(priority))
        {
            throw new Error('Invalid task priority');
        }    

        if(!Object.values(enums.status_of_task).includes(status))
        {
            throw new Error('Invalid task status');
        }

        req_task.type = type;
        req_task.title = title;
        req_task.description = description;
        req_task.priority = priority;
        req_task.status = status;
        req_task.deadline = deadline;
        req_task.assignee = new_assignee;

        await req_task.save({transaction: t});
        // using a set to score distinct emails 
        const emails = new Set();
        const creater_email = (await User.findByPk(req_task.creater)).email;
        const new_assignee_email = (await User.findByPk(req_task.assignee)).email;
        const old_assignee_email = (await User.findByPk(current_assignee)).email;

        emails.add(creater_email);
        emails.add(new_assignee_email);
        emails.add(old_assignee_email);

        for (let email of emails) {
            const destination_email = email;
            
            const html = `
                    <html>
                        <body>
                            <h1>Hello, Member!</h1>
                            <p>The task <strong>${req_task.title}</strong> has been updated. 
                            <br>You can view the updated details in the project</p>
                        </body>
                    </html>
                `;
            
            await emailServices.sendEmail({destination_email,html});  // Wait for email to be sent
        }
        
        await t.commit();
        return req_task;
    }
    catch(err)
    {
        await t.rollback();
        throw err;
    }
};
