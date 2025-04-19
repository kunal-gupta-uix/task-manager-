const jwt = require('jsonwebtoken');
const {ProjectMember} = require('../models/ProjectMember');
const {Project} = require('../models/Project');

const projectAccess = async (req, res, next) =>{
    try{
    const project_id = req.body.project_id;
    const sender_id = req.user.user_id;
    const projectMember =await ProjectMember.findOne({
        where:{
            project_id,
            project_member_id : sender_id
        }
    });
    
    if(!projectMember)
    {
        return res.status(403).json({message: 'Access denied'});
    }
    
    const project =await Project.findByPk(project_id);
    if(!project)
    {
       return res.status(404).json({message: 'Project not found'});
    }
    req.project = project;
    next();
}
catch(err)
{
    console.error('Project Access middleware error', err);
    return res.status(500).json({message: ' Error while verifying project access for user', error: err.message});
}

};

module.exports = {projectAccess};