const {createTask, updateTask, deleteTask} = require('../services/taskServices');

const createTaskController = async (req, res) =>{
    try{
        const sender_id = req.user.user_id;
        const task_parent_project = req.project.project_id;
        const task_type = req.body.task_type;
        const task_title = req.body.task_title;
        const task_description = req.body.task_description;
        const task_priority = req.body.task_priority;
        const task_status = req.body.task_status;
        const task_deadline = req.body.task_deadline;
        const newTask = await createTask({sender_id,task_parent_project,task_type,task_title,task_description,task_priority,task_status,task_deadline});
        return res.status(200).json({message: 'task successfully created', newTask});
    }
    catch(err)
    {
        res.status(500).json({message :' Error while creating task', error: err.message});
    }
};

const updateTaskController = async (req, res) =>{
    try{
        const task_id = req.task.task_id;
        const sender_id = req.user.user_id;
        const task_parent_project = req.project.project_id;
        const new_type = req.body.task_type;
        const new_title = req.body.task_title;
        const new_description = req.body.task_description;
        const new_priority = req.body.task_priority;
        const new_status = req.body.task_status;
        const new_deadline = req.body.task_deadline;
        const updatedTask = await updateTask({task_id,sender_id, task_parent_project, new_type, new_title, new_description, new_priority, new_status, new_deadline});
        return res.status(200).json({message: 'Successfully updated task', updatedTask});
    }
    catch(err)
    {
        res.status(500).json({message :' Error while updating task', error: err.message});

    }

};

const deleteTaskController = async (req, res) =>{
    try{
        const task_id = req.task.task_id;
        const sender_id = req.user.user_id;
        const deletedTask = await deleteTask({task_id, sender_id});
        return res.status(200).json({message: 'Task has been deleted successfully', deletedTask});
    }
    catch(err)
    {
        res.status(500).json({message :' Error while deleting task', error: err.message});

    }
};

module.exports = {createTaskController, updateTaskController, deleteTaskController};