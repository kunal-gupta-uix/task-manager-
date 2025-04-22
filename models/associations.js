const {User} = require('./User');
const {Project} = require('./Project');
const {ProjectMember} = require('./ProjectMember');
const {Task} = require('./Task');

function applyAssociations (){
    // project to other tables
    Project.hasMany(ProjectMember, {foreignKey: 'project_id'});
    Project.hasMany(Task, {foreignKey: 'task_parent_project'});

    // projectMember to other tables
    ProjectMember.belongsTo(User, {foreignKey: 'project_member_id'});
    ProjectMember.belongsTo(Project, {foreignKey: 'project_id'});

    //user to other tables
    User.hasMany(ProjectMember, {foreignKey: 'project_member_id'});
    User.hasMany(Task, {foreignKey:'task_assignee'});
    
    // task to other tables
    Task.belongsTo(Project, {foreignKey: 'task_parent_project'});
    Task.belongsTo(User, {foreignKey: 'task_assignee'});
}

module.exports = applyAssociations;