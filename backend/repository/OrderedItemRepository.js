const model = require('../models/ordered_items');

module.exports = class OrderedItemRepository {
  /**
     * Adds an item to an order
     * @param orderedItem THe item's data
     * @throws Error
     */
  async save (orderedItem) {
    try {
      await model.create(orderedItem);
    } catch (e) {
      throw new Error(`Failed to add item to order: ${e.message}`);
    }
  }

  /**
     * Retrieves a list of items in the same order
     * @param {bigint}orderId The order's primary key
     * @returns {Promise<model[]>} A list of items or null
     */
  async findByOrder (orderId) {
    try {
      return await model.findAll({ where: { order_id: orderId } });
    } catch (e) {
      throw new Error(`Failed to fetch the ordered items: ${e.message}`);
    }
  }

  /**
     * Updates an ordered item
     * @param {bigint}orderedItemId The primary key
     * @param newData The data to update to
     * @returns {Promise<true|null>} true if updated, null if not found
     * @throws Error
     */
  async update (orderedItemId, newData) {
    try {
      // Fetch ordered item
      const item = await model.findByPk(orderedItemId);
      if (!item) return null;
      await item.update(newData);
      return true;
    } catch (e) {
      throw new Error(`Failed to update: ${e.message}`);
    }
  }

  /**
     * Deleted an item from an order
     * @param {bigint}itemId The ordered item's primary key
     * @returns {Promise<true|null>} true if deleted, null if not found
     * @throws Error
     */
  async delete (itemId) {
    try {
      // fetch the item
      const item = await model.findByPk(itemId);
      if (!item) return null;
      await item.destroy();
      return true;
    } catch (e) {
      throw new Error(`Failed to delete the item: ${e.message}`);
    }
  }
};
