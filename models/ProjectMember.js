import {DataTypes} from 'sequelize';
import {sequelize} from '../config/db.js';
import * as enums from '../utils/constants.js'; 

export const ProjectMember = sequelize.define('ProjectMember',{
    project_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    project_member_id:{
        type: DataTypes.UUID,
        allowNull: false
    },
    project_member_role:{
        type: DataTypes.ENUM(enums.project_member_roles.MEMBER, enums.project_member_roles.OWNER),
        allowNull: false
    }

},
{
    timestamps: true,
    paranoid: true,
    tableName: 'projectMembers'
}
);