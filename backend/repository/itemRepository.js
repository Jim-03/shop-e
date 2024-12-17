const itemModel = require('../models/item');
const { Op } = require('sequelize');

/**
 * Item Model's repository class
 * @type {ItemRepository}
 */
class ItemRepository {
  /**
     * Checks whether an item exists in the specified category
     * @param name The name of the item
     * @param categoryId The category's id
     * @returns {Promise<boolean>} true when found, false otherwise
     */
  async itemExists (name, categoryId) {
    return !!await itemModel.findOne({ where: { name, category_id: categoryId } });
  }

  /**
     * Adds a new item to the database
     * @param item The item's data
     * @throws Error
     */
  async create (item) {
    try {
      await itemModel.create(item);
    } catch (e) {
      throw new Error(`Failed to add item: ${e.message}`);
    }
  }

  /**
     * Retrieves a list of items with the same name
     * @param {string}name The item name
     * @returns {Promise<itemModel[]>} The list of items
     * @throws Error
     */
  async getAllByName (name) {
    try {
      return await itemModel.findAll({
        where: {
          name: {
            [Op.like]: `%${name}%`
          }
        }
      });
    } catch (e) {
      throw new Error(`Failed to fetch list: ${e.message}`);
    }
  }

  /**
     * Updates an item
     * @param {bigint}id The item's primary key
     * @param newItemData The item's new data
     * @returns {Promise<true|null>} true if updated, null if not found
     * @throws Error
     */
  async update (id, newItemData) {
    try {
      // Fetch item
      const item = await itemModel.findByPk(id);
      // Check if item exists
      if (!item) return null;
      await item.update(newItemData);
      return true;
    } catch (e) {
      throw new Error(`Failed to update item: ${e.message}`);
    }
  }

  /**
     * Fetches an item from a shop
     * @param {string}name The item's name
     * @param {bigint}shopId The shop's primary key
     * @returns {Promise<itemModel|null>} The item or null if it doesn't exist
     * @throws Error
     */
  async findByName (name, shopId) {
    try {
      return await itemModel.findOne({
        where: {
          name,
          shop_id: shopId
        }
      });
    } catch (e) {
      throw new Error(`Failed to get item: ${e.message}`);
    }
  }

  /**
     * Deletes an item from database
     * @param {bigint}id The item's primary key
     * @returns {Promise<true|null>} true if deleted, null if not found
     * @throws Error
     */
  async deleteItem (id) {
    try {
      // Fetch item
      const item = await itemModel.findByPk(id);
      // Check if exists
      if (!item) return null;
      // Delete item
      await item.destroy();
      return true;
    } catch (e) {
      throw new Error(`Failed to delete item: ${e.message}`);
    }
  }

  /**
   * Retrieves an item
   * @param id The item's primary key
   * @returns {Promise<Model<any, TModelAttributes>>}
   */
  async findById(id) {
    try {
      return await itemModel.findByPk(id)
    } catch (e) {
      throw new Error(`Failed to get item: ${e.message}`)
    }
  }
