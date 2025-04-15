const {ProjectMember} = require('../models/ProjectMember');
const {User} = require('../models/User');

const addProjectMember = async (req, res) => {
    try{
    const sender_id = req.user.id;
    const new_member_id = req.body.project_member_id;
    const member_role = req.body.project_member_role;
    const project_id = req.body.project_id;

    //check if all necessary attributes have been passed or not
    if(!new_member_id || !member_role || !project_id)
    {
        return res.status(400).json({message: 'All necessary fields must be filled'});
    }
    
    if(member_role != 'member' && member_role != 'owner')
    {
        return res.status(400).json({message: 'invalid role specified'});
    }
    
    const valid_member = await User.findByPk(new_member_id);
    if(!valid_member)
    {
        return res.status(404).json({message: 'Not a member of the database'});
    }
    
    const already_added = await ProjectMember.findOne({
        where:{
            project_id,
            project_member_id : new_member_id
        }
    }
    );
  
    if(already_added)
    {
        return res.status(409).json({message: 'This is an already added member'});
    }


    if(member_role == 'owner')
    {
        if(sender_id != new_member_id)
        {
           return res.status(403).json({message: 'Unauthorized user'});
        }
    }

    // If request is a valid one, let's add the project member 
    try{
    const newProjectMember = await ProjectMember.create({
        project_id,
        project_member_id: new_member_id,
        member_role : member_role
    });

    return res.status(201).json({message: 'new Member added successfully'});
    }
    catch(err)
    {
        return res.status(500).json({message: 'Error while adding new member', error: err.message});
    }
}
catch(error)
{
    return res.status(500).json({message: 'Error while adding project member', error: error.message});
}  
};

module.exports = {addProjectMember};