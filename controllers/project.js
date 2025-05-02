import * as projectServices from '../services/project.js';
import * as validators from '../validators/project.js';

export async function createProject (req, res) {
    try{
        const validatedInput = validators.validateCreateProjectRequest({...req.body, sender_id: req.user.user_id});
        const newProject = await projectServices.createProject({...validatedInput});
        res.status(200).json({message:'Project successfully added', newProject});
    }
    catch(err)
    {
        res.status(400).json({message: 'Error while creating project', error: err.message});
    }
 
};

export async function addMember (req, res) {
    try{
        req.body.role = "member";
        const validatedInput = validators.validateAddMemberRequest({...req.body});
        const newMember = await projectServices.addMember({...validatedInput});
        res.status(200).json({message: 'Member successfully added to project', newMember});
    }
    catch(err)
    {
        res.status(400).json({message: 'Error while adding new member to project', error: err.message});
    }
};

export async function updateProject (req, res) {
    try{
        const validatedInput = validators.validateUpdateProjectRequest({...req.body, sender_id:req.user.user_id, project_id:req.project.project_id});
        const updatedProject = await projectServices.updateProject({...validatedInput});
        res.status(200).json({message: 'Successfully updated project details', updatedProject});
    }
    catch(err)
    {
        res.status(400).json({message: 'Error while updating project details', error: err.message});
    }
};

export async function getAllProjectsOfUser (req, res) {
    try{
        const user_id = req.query.user_id;
        const allProjects = await projectServices.getAllProjectsOfUser({user_id});
        res.status(200).json({message: 'Successfully fetched all projects', allProjects});
    }
    catch(err)
    {
        res.status(500).json({message: 'Error while retrieving all projects of user', error: err.message});
    }
};

export async function getAllMembers (req, res) {
    try{
        const project_id = req.query.project_id;
        const allProjectsMembers = await projectServices.getAllMembers({project_id});
        res.status(200).json({message:'Successfully fetched all members of this project', allProjectsMembers});
    }
    catch(err)
    {
        res.status(500).json({message:'Error while fetching members of this project', error: err.message});
    }
};
