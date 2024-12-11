const model = require('../models/order');

module.exports = class OrderRepository {
  /**
     * Adds a new order
     * @param order The order's data
     * @throws Error
     */
  async save (order) {
    try {
      await model.create(order);
    } catch (e) {
      throw new Error(`Failed to make order: ${e.message}`);
    }
  }

  /**
     * Retrieves an order
     * @param {bigint}orderId The order's primary key
     * @returns {Promise<Model<any, TModelAttributes>>} The order or null
     */
  async findById (orderId) {
    try {
      return await model.findByPk(orderId);
    } catch (e) {
      throw new Error(`Failed to fetch order: ${e.message}`);
    }
  }

  /**
     * Updates an existing order
     * @param {bigint}orderId The order's primary key
     * @param updatedOrder The order's new data
     * @returns {Promise<boolean|null>} true if updated, null if order isn't found
     */
  async update (orderId, updatedOrder) {
    try {
      // Fetch the order
      const order = await model.findByPk(orderId);
      // Check if exists
      if (!order) return null;
      await order.update(updatedOrder);
      return true;
    } catch (e) {
      throw new Error(`Failed to update order: ${e.message}`);
    }
  }

  /**
     * Deletes an existing order
     * @param {bigint}orderId The order's primary key
     * @returns {Promise<boolean|null>} true if deleted, null if order not found
     */
  async delete (orderId) {
    try {
      // Fetch the order
      const order = await this.findById(orderId);
      // Check if order exists
      if (!order) return null;
      await order.destroy();
      return true;
    } catch (e) {
      throw new Error(`Failed to delete order: ${e.message}`);
    }
  }

  /**
     * Fetches orders made by a customer
     * @param {bigint}customerId The customer's primary key
     * @returns {Promise<model[]|null>} The list of orders or null
     */
  async findByCustomer (customerId) {
    try {
      return await model.findAll({ where: { buyer_id: customerId } });
    } catch (e) {
      throw new Error(`Failed to fetch the customer's orders: ${e.message}`);
    }
  }
};
