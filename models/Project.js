const {DataTypes} = require('sequelize');
const {sequelize} = require('../config/db');

const Project = sequelize.define('Project', {
    project_id:{

    }},
    {
        timestamps: true,
        paranoid: true,
        tableName: 'projects'
    }

);

module.exports = Project;