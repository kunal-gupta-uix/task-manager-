const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  dob: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'other'),
    allowNull: true
  },
  allow_notifications: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: true,
  paranoid: true,
  tableName: 'users'
});

module.exports = {User};

