const { DataTypes } = require('sequelize');
const { database } = require('../database/database');

const item = {
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
  shop_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'shops',
      key: 'id'
    }
  },
  category_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'categories',
      key: 'id'
    }
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  buying_price: {
    type: DataTypes.DECIMAL,
    allowNull: true
  },
  selling_price: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  number_of_purchases: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
};

module.exports = database.define('Item', item, { tableName: 'items', timestamps: true });
