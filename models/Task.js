 import {DataTypes} from 'sequelize';
 import {sequelize} from '../config/db.js';
 import * as enums from '../utils/constants.js';
 import {User} from './User.js';
 import {Project} from './Project.js';

 export const Task = sequelize.define('Task',{
    id :{
        type: DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        primaryKey : true
    }, 
    type:{
        type: DataTypes.ENUM(enums.types_of_task.BUG, enums.types_of_task.DOCUMENTATION, enums.types_of_task.FEATURE, enums.types_of_task.IMPROVEMENT, enums.types_of_task.RESEARCH, enums.types_of_task.OTHER),
        allowNull : false
    },
    title:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    creater:{
        type: DataTypes.UUID,
        allowNull: false,
        references :{
            model : User,
            key : 'user_id'
        }
    },
    priority:{
        type: DataTypes.ENUM(enums.priority_of_task.HIGH, enums.priority_of_task.LOW, enums.priority_of_task.MEDIUM, enums.priority_of_task.NO_PRIORITY, enums.priority_of_task.URGENT),
        allowNull: false
    },
    status:{
        type: DataTypes.ENUM(enums.status_of_task.BACKLOG, enums.status_of_task.CANCELLED,enums.status_of_task.DONE, enums.status_of_task.DUPLICATE, enums.status_of_task.INPROGRESS, enums.status_of_task.INREVIEW, enums.status_of_task.TODO),
        allowNull: false,
        defaultValue: enums.status_of_task.TODO
    },
    parent_project:{
        type: DataTypes.UUID,
        allowNull: false,
        references:{
            model : Project,
            key: 'project_id'
        }
    },
    deadline:{
        type: DataTypes.DATE,
        allowNull: false
    },
    assignee:{
        type: DataTypes.UUID,
        allowNull:false,
        references :{
            model : User,
            key : 'user_id'
        }
    }
 } , 
     {
    timestamps: true,
    paranoid: true,
    tableName: 'tasks'
});
