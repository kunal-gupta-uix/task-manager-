const {DataTypes} = require('sequelize');
const {sequelize} = require('../config/db');
const{project_member_roles} = require('../utils/constants'); 

const ProjectMember = sequelize.define('ProjectMember',{
    project_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    project_member_id:{
        type: DataTypes.UUID,
        allowNull: false
    },
    project_member_role:{
        type: DataTypes.ENUM(project_member_roles.MEMBER, project_member_roles.OWNER),
        allowNull: false
    }

},
{
    timestamps: true,
    paranoid: true,
    tableName: 'projectMembers'
}
);

module.exports = ProjectMember;