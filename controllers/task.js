import * as taskServices from '../services/task.js';
import * as validators from '../validators/task.js';
export async function create (req, res) {
    try{
        const validatedInput = validators.validateCreateTaskRequest({...req.body, parent_project:req.project.project_id, sender_id:req.user.user_id});
        const newTask = await taskServices.create({...validatedInput});
        return res.status(200).json({message: 'task successfully created', newTask});
    }
    catch(err)
    {
        res.status(400).json({message :' Error while creating task', error: err.message});
    }
};

export async function update (req, res) {
    try{
        const validatedInput = validators.validateUpdateTaskRequest({...req.body, sender_id:req.user.user_id});
        const updatedTask = await taskServices.update({...validatedInput});
        return res.status(200).json({message: 'Successfully updated task', updatedTask});
    }
    catch(err)
    {
        res.status(400).json({message :' Error while updating task', error: err.message});
    }
};

