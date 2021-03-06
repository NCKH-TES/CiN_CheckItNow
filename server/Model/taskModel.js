const { DataTypes } = require('sequelize');
const { sequelize, Sequelize } = require('../config/DBconfig');
const User = require('./userModel');

const Task = sequelize.define('Task', {
  task_id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
    allowNull: false,
  },
  task_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  task_description: DataTypes.TEXT,
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high'),
    defaultValue: 'low',
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  task_due: {
    type: DataTypes.DATE,
    defaultValue: new Date(Date.now() + 24 * 60 * 60 * 1000), //1 day
    allowNull: false,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

module.exports = Task;
