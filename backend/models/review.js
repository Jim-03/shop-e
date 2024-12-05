const { DataTypes } = require('sequelize');
const { database } = require('../database/database');

const review = {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  reviewer_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  product_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'items',
      key: 'id'
    }
  },
  review_message: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  review_date: {
    type: DataTypes.DATE,
    allowNull: false
  }
};

module.exports = database.define('Review', review, { tableName: 'reviews', timestamps: true });
