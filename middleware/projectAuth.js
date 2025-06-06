import {ProjectMember,Project} from '../models/index.js';

export async function projectAuth (req, res, next) {
    try{
    const id = req.method === 'GET' ? req.query.project_id : req.body.project_id;
    const sender_id = req.user.user_id;
    const projectMember =await ProjectMember.findOne({
        where:{
            project_id: id,
            user_id : sender_id
        }
    });
    
    if(!projectMember)
    {
        return res.status(403).json({message: 'Access denied'});
    }
    
    const project =await Project.findByPk(id);
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

