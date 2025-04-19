const {User} = require('./User');
const {Project} = require('./Project');
const {ProjectMember} = require('./ProjectMember');
const {Task} = require('./Task');

function applyAssociations (){
    // project to project member
    Project.hasMany(ProjectMember, {foreignKey: 'project_id'});
    ProjectMember.belongsTo(Project, {foreignKey: 'project_id'});
    
    // user to project member 
    ProjectMember.belongsTo(User, {foreignKey: 'project_member_id'});
    User.hasMany(ProjectMember, {foreignKey: 'project_member_id'});

    // project to task
    Task.belongsTo(Project, {foreignKey:'task_parent_project'});
    Project.hasMany(Task, {foreignKey: 'project_id'});
}

module.exports = applyAssociations;