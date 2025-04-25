import * as services from '../services/task.js';

export async function create (req, res) {
    try{
        const sender_id = req.user.user_id;
        const parent_project = req.project.project_id;
        const type = req.body.type;
        const title = req.body.title;
        const description = req.body.description;
        const priority = req.body.priority;
        const deadline = req.body.deadline;
        const newTask = await services.create({sender_id,parent_project,type,title,description,priority,deadline});
        return res.status(200).json({message: 'task successfully created', newTask});
    }
    catch(err)
    {
        res.status(500).json({message :' Error while creating task', error: err.message});
    }
};

export async function update (req, res) {
    try{
        const id = req.body.id;
        const sender_id = req.user.user_id;
        const type = req.body.type;
        const title = req.body.title;
        const description = req.body.description;
        const priority = req.body.priority;
        const status = req.body.status;
        const deadline = req.body.deadline;
        const new_assignee = req.body.new_assignee;
        const updatedTask = await services.update({id,sender_id, type, title,description, priority, status, deadline, new_assignee});
        return res.status(200).json({message: 'Successfully updated task', updatedTask});
    }
    catch(err)
    {
        res.status(500).json({message :' Error while updating task', error: err.message});
    }

};

