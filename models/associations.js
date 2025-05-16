import {User} from './User.js';
import {Project} from './Project.js';
import {ProjectMember} from './ProjectMember.js';
import {Task} from './Task.js';
import {Otp} from './Otp.js';

export function applyAssociations (){
    // project to other tables
    Project.hasMany(ProjectMember, {foreignKey: 'project_id'});
    Project.hasMany(Task, {foreignKey: 'project_id'});

    // projectMember to other tables
    ProjectMember.belongsTo(User, {foreignKey: 'user_id'});
    ProjectMember.belongsTo(Project, {foreignKey: 'project_id'});

    //user to other tables
    User.hasMany(Task, {foreignKey:'assignee'});
    User.hasMany(ProjectMember, {foreignKey: 'user_id'});

    // task to other tables
    Task.belongsTo(Project, {foreignKey: 'project_id'});
    Task.belongsTo(User, {foreignKey: 'assignee'});

    //otp to other tables
    Otp.belongsTo(User,{foreignKey: 'user_id'});
}
