/**
 * Module defining the category model
 */
const { DataTypes } = require('sequelize');
const { database } = require('../database/database');
const category = {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false
  },
  shop_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(150),
    allowNull: false
  }
};

module.exports = database.define('Category', category, { tableName: 'categories' });
