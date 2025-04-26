import {DataTypes} from 'sequelize';
import {sequelize} from '../config/db.js';
import * as enums from '../utils/constants.js';

export const Project = sequelize.define('Project', {
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
        type: DataTypes.ENUM(enums.project_status.ACTIVE, enums.project_status.ARCHIVED, enums.project_status.COMPLETED),
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
