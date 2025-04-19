 const {DataTypes} = require('sequelize');
 const {sequelize} = require('../config/db');
 const {task_priority, task_status, task_type} = require('../utils/constants');
 const {User} = require('./User');
 const {Project} = require('./Project');

 const Task = sequelize.define('Task',{
    task_id :{
        type: DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        primaryKey : true
    },
    task_type:{
        type: DataTypes.ENUM(task_type.BUG, task_type.DOCUMENTATION, task_type.FEATURE, task_type.IMPROVEMENT, task_type.RESEARCH, task_type.OTHER),
        allowNull : false
    },
    task_title:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    task_description:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    task_creater:{
        type: DataTypes.UUID,
        allowNull: false,
        references :{
            model : User,
            key : 'user_id'
        }
    },
    task_priority:{
        type: DataTypes.ENUM(task_priority.HIGH, task_priority.LOW, task_priority.MEDIUM, task_priority.NO_PRIORITY, task_priority.URGENT),
        allowNull: false
    },
    task_status:{
        type: DataTypes.ENUM(task_status.BACKLOG, task_status.CANCELLED,task_status.DONE, task_status.DUPLICATE, task_status.INPROGRESS, task_status.INREVIEW, task_status.TODO),
        allowNull: false,
        defaultValue: task_status.TODO
    },
    task_parent_project:{
        type: DataTypes.UUID,
        allowNull: false,
        references:{
            model : Project,
            key: project_id
        }
    },
    task_deadline:{
        type: DataTypes.DATE,
        allowNull: false
    }
 } , 
     {
    timestamps: true,
    paranoid: true,
    tableName: 'tasks'
});

module.exports = {Task};