const { database } = require('./database');

// Fetch models
const categoryModel = require('../models/category');
const shopModel = require('../models/shop');
const itemModel = require('../models/item');
const orderModel = require('../models/order');
const userModel = require('../models/user');
const reviewModel = require('../models/review');
const trackingModel = require('../models/delivery_tracking');
const orderedItemModel = require('../models/ordered_items');

/**
 * Creates database tables
 * @returns {boolean}: true if database is created, false otherwise
 */
const createTables = function () {
  // Define relationships

  // Shop-Order
  shopModel.hasMany(orderModel, { foreignKey: 'shop_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
  orderModel.belongsTo(shopModel, { foreignKey: 'shop_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

  // User-Shop
  userModel.hasMany(shopModel, { foreignKey: 'owner_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
  shopModel.belongsTo(userModel, { foreignKey: 'owner_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

  // User-Order
  userModel.hasMany(orderModel, { foreignKey: 'buyer_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
  orderModel.belongsTo(userModel, { foreignKey: 'buyer_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

  // User-Review
  userModel.hasMany(reviewModel, { foreignKey: 'reviewer_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
  reviewModel.belongsTo(userModel, { foreignKey: 'reviewer_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

  // Category-Item
  categoryModel.hasMany(itemModel, { foreignKey: 'category_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
  itemModel.belongsTo(categoryModel, { foreignKey: 'category_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

  // Item-Review
  itemModel.hasMany(reviewModel, { foreignKey: 'item_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
  reviewModel.belongsTo(itemModel, { foreignKey: 'item_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

  // Order-OrderedItems
  orderModel.hasMany(orderedItemModel, { foreignKey: 'order_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
  orderedItemModel.belongsTo(orderModel, { foreignKey: 'order_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

  // Order-DeliveryTracking
  orderModel.hasMany(trackingModel, { foreignKey: 'order_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
  trackingModel.belongsTo(orderModel, { foreignKey: 'order_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

  // Create the tables
  database.sync({ force: true })
    .then(response => {
      console.log('All tables created successfully');
      return true;
    })
    .catch(e => {
      console.error(`An error has occurred while creating the database tables -> ${e}`);
    });
  return false;
};

createTables();
