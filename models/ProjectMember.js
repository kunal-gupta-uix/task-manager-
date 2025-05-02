import {DataTypes} from 'sequelize';
import {sequelize} from '../config/db.js';
import {User} from './User.js';
import {Project} from './Project.js';
import * as enums from '../utils/constants.js'; 

export const ProjectMember = sequelize.define('ProjectMember',{
    project_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references:{
            model: Project,
            key: 'id'
        }
    },
    user_id:{
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references:{
            model: User,
            key: 'user_id'
        }
    },
    role:{
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