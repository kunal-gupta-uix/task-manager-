import {DataTypes} from 'sequelize';
import {sequelize} from '../config/db.js';
import * as enums from '../utils/constants.js';

export const Project = sequelize.define('Project', {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    status:{
        type: DataTypes.ENUM(enums.project_status.ACTIVE, enums.project_status.ARCHIVED, enums.project_status.COMPLETED),
        allowNull: false
    },
    deadline:{
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
