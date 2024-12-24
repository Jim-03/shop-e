const { DataTypes } = require('sequelize');
const { database } = require('../database/database');

const shop = {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  photo_url: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  owner_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  }
};

module.exports = database.define('Shop', shop, { tableName: 'shops', timestamps: true });
