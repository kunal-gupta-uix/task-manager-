const {Task} = require('../models/Task');
const {types_of_task, status_of_task, priority_of_task} = require('../utils/constants');
//add new task 
const createTask = async ({task_type, task_title, task_description, sender_id, task_priority, task_parent_project, task_deadline}) => {
    try{
        if(!task_type || !task_title || !task_description || !sender_id || !task_priority || !task_parent_project || !task_deadline)
        {
            throw new Error('All necessary fields must be filled');
        }
        
        if(!Object.values(types_of_task).includes(task_type))
        {
            throw new Error('Invalid task type');

        }

        if(!Object.values(priority_of_task).includes(task_priority))
        {
            throw new Error('Invalid task priority');
        }
               
        const newTask = await Task.create({
            task_type,
            task_title,
            task_description,
            task_creater : sender_id,
            task_priority,
            task_parent_project,
            task_deadline,
            task_assignee: sender_id
        });
        return newTask;
    }
    catch(err)
    {
        throw err;
    }
};


// update task details
const updateTask = async ({task_id,new_type, new_title, new_description, sender_id, new_priority, new_status, task_parent_project, new_deadline}) => {
    try{
        if(!task_id ||!new_type || !new_title || !new_description || !sender_id || !new_priority || !new_status || !task_parent_project || !new_deadline)
        {
            throw new Error('All necessary fields must be filled');
        }

        const req_task = await Task.findByPk(task_id);
        if(!req_task)
        {
            throw new Error('Task does not exist in the records');
        }

        if(!Object.values(types_of_task).includes(new_type))
        {
            throw new Error('Invalid task type');
        }

        if(!Object.values(priority_of_task).includes(new_priority))
        {
            throw new Error('Invalid task priority');
        }    

        if(!Object.values(status_of_task).includes(new_status))
        {
            throw new Error('Invalid task status');
        }

        req_task.task_type = new_type;
        req_task.task_title = new_title;
        req_task.task_description = new_description;
        req_task.task_priority = new_priority;
        req_task.task_status = new_status;
        req_task.task_deadline = new_deadline;

        await req_task.save();
        return req_task;
    }
    catch(err)
    {
        throw err;
    }
};

module.exports = {createTask, updateTask};