const {Task} = require('../models/Task');
const {ProjectMember} = require('../models/ProjectMember');

//add new task 
const createTask = async ({task_type, task_title, task_description, sender_id, task_priority, task_status, task_parent_project, task_deadline}) => {
    try{
        if(!task_type || !task_title || !task_description || !sender_id || !task_priority || !task_status || !task_parent_project || !task_deadline)
        {
            throw new Error('All necessary fields must be filled');
        }
        const valid = await ProjectMember.findOne({
            where:{
                project_id : task_parent_project,
                project_member_id : sender_id
            }
        });

        if(!valid)
        {
            throw new Error('Not authorised to create this task');
        }

        const newTask = await Task.create({
            task_type,
            task_title,
            task_description,
            task_creater : sender_id,
            task_priority,
            task_status,
            task_parent_project,
            task_deadline
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
        const valid = await ProjectMember.findOne({
            where:{
                project_id : task_parent_project,
                project_member_id : sender_id
            }
        });

        if(!valid)
        {
            throw new Error('Not authorised to update this task');
        }

        const req_task = await Task.findByPk(task_id);
        if(!req_task)
        {
            throw new Error('task does not exist in the records');
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

// delete a task allowed only for task creater
const deleteTask = async ({task_id, sender_id}) =>{
    try{
        if(!task_id || !sender_id)
        {
            throw new Error('All necessary fields must be filled');
        }

        const req_task = await Task.findOne({
            where:{
                task_id,
                task_creater : sender_id
            }
        });

        if(!req_task)
        {
            throw new Error('Unauthorised to delete this task');
        }
        await req_task.destroy();
        return req_task;
    }
    catch(err)
    {
        throw err;
    }
};

module.exports = {createTask, updateTask, deleteTask};
