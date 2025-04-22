const {DataTypes} = require('sequelize');
 const {sequelize} = require('../config/db');
 const {priority_of_task, status_of_task,types_of_task} = require('../utils/constants');
 const {User} = require('./User');
 const {Project} = require('./Project');

 const Task = sequelize.define('Task',{
    task_id :{
        type: DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        primaryKey : true
    }, 
    task_type:{
        type: DataTypes.ENUM(types_of_task.BUG, types_of_task.DOCUMENTATION, types_of_task.FEATURE, types_of_task.IMPROVEMENT, types_of_task.RESEARCH, types_of_task.OTHER),
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
        type: DataTypes.ENUM(priority_of_task.HIGH, priority_of_task.LOW, priority_of_task.MEDIUM, priority_of_task.NO_PRIORITY, priority_of_task.URGENT),
        allowNull: false
    },
    task_status:{
        type: DataTypes.ENUM(status_of_task.BACKLOG, status_of_task.CANCELLED,status_of_task.DONE, status_of_task.DUPLICATE, status_of_task.INPROGRESS, status_of_task.INREVIEW, status_of_task.TODO),
        allowNull: false,
        defaultValue: status_of_task.TODO
    },
    task_parent_project:{
        type: DataTypes.UUID,
        allowNull: false,
        references:{
            model : Project,
            key: 'project_id'
        }
    },
    task_deadline:{
        type: DataTypes.DATE,
        allowNull: false
    },
    task_assignee:{
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

module.exports = {Task};
