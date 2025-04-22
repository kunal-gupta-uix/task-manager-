const {addNewProject, updateProject, getUserProjects, addMemberToProject, getMembersOfProject} = require('../services/projectServices');

const addNewProjectController = async (req, res) => {
    try{
        const project_title = req.body.project_title;
        const project_description = req.body.project_description;
        const project_deadline = req.body.project_deadline;
        const sender_id = req.user.user_id;
        const newProject = await addNewProject({project_title, project_description, project_deadline, sender_id});
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
        const role = 'member';
        const newMember = await addMemberToProject({project_id, member_id, role});
        res.status(200).json({message: 'Member successfully added to project', newMember});
    }
    catch(err)
    {
        res.status(500).json({message: 'Error while adding new member to project', error: err.message});
    }
};

const updateProjectController = async (req, res) => {
    try{
        const project_id = req.project.project_id;
        const sender_id = req.user.user_id;
        const new_status = req.body.project_status;
        const new_title = req.body.project_title;
        const new_description = req.body.project_description;
        const new_deadline = req.body.project_deadline;
        const updatedProject = await updateProject({project_id, sender_id, new_status,new_title, new_description, new_deadline});
        res.status(200).json({message: 'Successfully updated project details', updatedProject});
    }
    catch(err)
    {
        res.status(500).json({message: 'Error while updating project details', error: err.message});
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

const getMembersOfProjectController = async (req, res) => {
    try{
        const project_id = req.body.project_id;
        const allProjectsMembers = await getMembersOfProject({project_id});
        res.status(200).json({message:'Successfully fetched all members of this project', allProjectsMembers});
    }
    catch(err)
    {
        res.status(500).json({message:'Error while fetching members of this project', error: err.message});
    }

};
module.exports = {addNewProjectController, addMemberToProjectController, updateProjectController, getUserProjectsController, getMembersOfProjectController};