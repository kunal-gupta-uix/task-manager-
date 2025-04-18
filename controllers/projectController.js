const {addNewProject, updateProjectStatus, getUserProjects, addMemberToProject} = require('../services/projectServices');

const addNewProjectController = async (req, res) => {
    try{
        const project_title = req.body.project_title;
        const project_description = req.body.project_description;
        const project_status = req.body.project_status;
        const project_deadline = req.body.project_deadline;
        const sender_id = req.user.user_id;
        const newProject = await addNewProject({project_title, project_description, project_status, project_deadline, sender_id});
        res.status(200).json({message:'Project successfully added', newProject});
    }
    catch(err)
    {
        res.status(500).json({message: 'Error while creating project', error: err.message});
    }

};

const addMemberToProjectController = async (req, res) => {
    try{
        const project_id = req.body.project_id;
        const member_id = req.body.project_member_id;
        const role = req.body.project_member_role;
        const newMember = await addMemberToProject({project_id, member_id, role});
        res.status(200).json({message: 'Member successfully added to project', newMember});
    }
    catch(err)
    {
        res.status(500).json({message: 'Error while adding new member to project', error: err.message});
    }
};

const updateProjectStatusController = async (req, res) => {
    try{
        const project_id = req.body.project_id;
        const sender_id = req.user.user_id;
        const new_status = req.body.project_status;
        const updatedProject = await updateProjectStatus({project_id, sender_id, new_status});
        res.status(200).json({message: 'Successfully updated project status', updatedProject});
    }
    catch(err)
    {
        res.status(500).json({message: 'Error while updating project status', error: err.message});
    }
};

const getUserProjectsController = async (req, res) => {
    try{
        const user_id = req.user.user_id;
        const allProjects = await getUserProjects({user_id});
        res.status(200).json({message: 'Successfully fetched all projects', allProjects});
    }
    catch(err)
    {
        res.status(500).json({message: 'Error while retrieving all projects of user', error: err.message});
    }
};

module.exports = {addNewProjectController, addMemberToProjectController, updateProjectStatusController, getUserProjectsController};