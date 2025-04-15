const {Project} = require('../models/Project');
const {ProjectMember} = require('../models/ProjectMember');
const {project_status} = require('../utils/constants');

const updateProjectStatus = async (req, res) => {
    try{
        const sender_id = req.user.id;
        const new_status = req.body.project_status;
        const project_id = req.body.project_id;
        if(!new_status || !project_id || !sender_id)
        {
            return res.status(400).json({message: 'All fields are necessary'});
        }
        if(!project_status.includes(new_status))
        {
            return res.status(400).json({message: 'invalid project status value'});
        }

        const sender = await ProjectMember.findOne({
            where:{
                project_id,
                project_member_id: sender_id
            }
        });

        if(!sender)
        {
            return res.status(404).json({message: 'You are not a member of this project'});
        }

        const designation = sender.project_member_role;
        if(designation != 'owner')
        {
            return res.status(403).json({message: 'Not authorised to change the project status'});
        }
        
        //update the project status if everything is working fine
        const req_project = await Project.findByPk(project_id);
        req_project.project_status = new_status;
        await req_project.save();
        return res.status(200).json({message: 'Project status updated successfully'});

    }
    catch(err)
    {
        return res.status(500).json({message: 'Error while updating project status', error: err.message});
    }

};

module.exports = {updateProjectStatus};