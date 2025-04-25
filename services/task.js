import {Task} from '../models/index.js';
import * as enums from '../utils/constants.js';
//add new task 
export async function create ({type, title, description, sender_id, priority, parent_project, deadline}) {
    try{
        if(!type || !title || !description || !sender_id || !priority || !parent_project || !deadline)
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
               
        const newTask = await Task.create({
            type,
            title,
            description,
            creater : sender_id,
            priority,
            parent_project,
            deadline,
            assignee: sender_id,
            status: enums.status_of_task.TODO
        });
        return newTask;
    }
    catch(err)
    {
        throw err;
    }
};


// update task details
export async function update ({id,type, title, description, sender_id, priority, status, deadline, new_assignee}) {
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

        await req_task.save();
        return req_task;
    }
    catch(err)
    {
        throw err;
    }
};
