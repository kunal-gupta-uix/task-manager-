import {User} from './User.js';
import {Project} from './Project.js';
import {ProjectMember} from './ProjectMember.js';
import {Task} from './Task.js';
import {Otp} from './Otp.js';

export function applyAssociations (){
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

    //otp to other tables
    Otp.belongsTo(User,{foreignKey: 'user_id'});
}
