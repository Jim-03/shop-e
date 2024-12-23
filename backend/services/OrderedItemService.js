const Repo = require('../repository/OrderedItemRepository');
const itemModel = require('../models/item');
const OrderService = require('./orderService');

class OrderedItemService {
  constructor () {
    this.repo = new Repo();
  }

  /**
     * Adds new item to an order
     * @param orderedItem The item's data
     * @returns {Promise<{message: string, status: string}>} An object confirming if added
     */
  async addNewItem (orderedItem) {
    // Check if item is provided
    if (!orderedItem || Object.keys(orderedItem).length === 0) {
      return {
        status: 'rejected',
        message: 'Provide the item\'s details'
      };
    }

    try {
      // Fetch item
      const item = await itemModel.findByPk(orderedItem.id);
      if (!item) {
        return {
          status: 'rejected',
          message: 'The specified item wasn\'t found!'
        };
      }

      // Check if ordered quantity is more than the stock
      if (orderedItem.quantity > item.stock) {
        return {
          status: 'rejected',
          message: 'The ordered quantity is more than the available stock!'
        };
      }
      await this.repo.save(orderedItem);
      return {
        status: 'created',
        message: 'Item successfully added to order'
      };
    } catch (e) {
      return {
        status: 'error',
        message: `An error occurred while adding the item -> ${e.message}`
      };
    }
  }

  /**
     * Retrieves items existing in a specific order
     * @param orderId The order's primary key
     * @returns {Promise<{status: string, message: string, items: items[]|null}>} An object containing the ordered item
     */
  async getItemInOrder (orderId) {
    // Confirm if the id is correct
    if (!orderId || isNaN(orderId) || orderId <= 0) {
      return {
        status: 'rejected',
        message: 'Enter the order\'s id!',
        items: null
      };
    }

    try {
      // Fetch the order
      const orderService = new OrderService();
      const order = await orderService.getOrder(orderId);
      if (order.order === null) {
        return {
          status: order.status,
          message: order.message,
          items: null
        };
      }
      // Fetch the list of items
      const items = await this.repo.findByOrder(orderId);

      // Check if order has any items
      if (!items) {
        return {
          status: 'not_found',
          message: 'No items found in this order!',
          items: null
        };
      }
      return {
        status: 'success',
        message: 'Items found',
        items: (Array.isArray(items)) ? items : [items]
      };
    } catch (e) {
      return {
        status: 'error',
        message: `An error has occurred while fetching the list -> ${e.message}`
      };
    }
  }

  /**
     * Updates an ordered item
     * @param {bigint}orderedItemId The ordered item id
     * @param newData The updated data
     * @returns {Promise<{message: string, status: string}>} An object confirming whether a successful update occurred
     */
  async updateItem (orderedItemId, newData) {
    // Check if arguments are provided
    if (!orderedItemId || isNaN(orderedItemId) || orderedItemId <= 0) {
      return {
        status: 'rejected',
        message: 'Provide the ordered item\'s id!'
      };
    }
    if (!newData || Object.keys(newData)) {
      return {
        status: 'rejected',
        message: 'Provide the updated data!'
      };
    }

    try {
      // Check if updated
      const isUpdated = await this.repo.update(orderedItemId, newData);
      if (!isUpdated) {
        return {
          status: 'not_found',
          message: 'The specific ordered item wasn\'t found!'
        };
      }
      return {
        status: 'success',
        message: 'The ordered item was successfully updated'
      };
    } catch (e) {
      return {
        status: 'error',
        message: `An error occurred while updating the ordered item -> ${e.message}`
      };
    }
  }

  /**
     * Deletes an item from an order
     * @param {bigint}itemId The ordered item's id
     * @returns {Promise<{message: string, status: string}>} An object confirming a successful deletion
     */
  async deleteOrderedItem (itemId) {
    // Check if the id is correct
    if (!itemId || isNaN(itemId) || itemId <= 0) {
      return {
        status: 'rejected',
        message: 'Provide the ordered item id!'
      };
    }

    try {
      // Check if item is deleted
      const isDeleted = await this.repo.delete(itemId);
      if (!isDeleted) {
        return {
          status: 'not_found',
          message: 'The ordered item doesn\'t exist!'
        };
      }
      return {
        status: 'success',
        message: 'The ordered item was successfully removed'
      };
    } catch (e) {
      return {
        status: 'error',
        message: `An error occurred while deleting the item -> ${e.message}`
      };
    }
  }
}

module.exports = OrderedItemService;
