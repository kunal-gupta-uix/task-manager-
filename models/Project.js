const {DataTypes} = require('sequelize');
const {sequelize} = require('../config/db');
const {project_status} = require('../utils/constants');

const Project = sequelize.define('Project', {
    project_id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    project_title:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    project_description:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    project_status:{
        type: DataTypes.ENUM(project_status.ACTIVE, project_status.ARCHIVED, project_status.COMPLETED),
        allowNull: false
    },
    project_deadline:{
        type: DataTypes.DATE,
        allowNull: false
    }
},
    {
        timestamps: true,
        paranoid: true,
        tableName: 'projects'
    }

);

module.exports = Project;