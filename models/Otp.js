import {DataTypes} from 'sequelize';
import {sequelize} from '../config/db.js';
import {User} from './User.js';

export const Otp = sequelize.define('Otp', {
    user_id :{
        type: DataTypes.UUID,
        allowNull: false,
        references:{
            model: User,
            key: 'user_id'
        },
        primaryKey: true
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    otp:{
        type: DataTypes.STRING,
        allowNull: true
    },
    otp_expiry:{
        type: DataTypes.DATE,
        allowNull: true
    }
},{
    timestamps: true,
    paranoid: true,
    tableName: 'otps'
});

