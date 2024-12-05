const { DataTypes } = require('sequelize');
const { database } = require('../database/database');

const ordered_items = {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  order_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'orders',
      key: 'id'
    }
  },
  item_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'items',
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  purchase_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
};

module.exports = database.define('Ordered_items', ordered_items, { tableName: 'ordered_items', timestamps: true });
