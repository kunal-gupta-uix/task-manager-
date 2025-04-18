const {User} = require('./User');
const {Project} = require('./Project');
const {ProjectMember} = require('./ProjectMember');

function applyAssociations (){
    // project to project member
    Project.hasMany(ProjectMember, {foreignKey: 'project_id'});
    ProjectMember.belongsTo(Project, {foreignKey: 'project_id'});
    
    // user to project member 
    ProjectMember.belongsTo(User, {foreignKey: 'project_member_id'});
    User.hasMany(ProjectMember, {foreignKey: 'project_member_id'});

}

module.exports = applyAssociations;