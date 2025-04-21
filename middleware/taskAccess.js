const {Task} = require('../models/Task');
const {ProjectMember} = require('../models/ProjectMember');

const taskAccess = async (req, res, next) => {
    try{
        const sender_id = req.user.user_id;
        const task_parent_project = req.project.project_id;
        const task_id = req.body.task_id;
        const valid = await ProjectMember.findOne({
            where:{
                project_id: task_parent_project,
                project_member_id: sender_id
            }
        });
        if(!valid)
        {
            return res.status(403).json({message: 'Invalid request'});
        }
        const req_task =await Task.findByPk(task_id);
        if(!req_task)
        {
            return res.status(404).json({message:'Task not found'});
        }
        req.task = req_task;
        next();
    }
    catch(err)
    {
        console.error('Task access middleware', err);
        return res.status(500).json({message: 'Error while providing task access', error: err.message});
    }

};

module.exports = {taskAccess};