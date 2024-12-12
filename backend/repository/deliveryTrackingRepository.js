const model = require('../models/delivery_tracking');

module.exports = class deliveryTrackingRepo {
  /**
     * Adds a new delivery
     * @param delivery The delivery's data
     */
  async save (delivery) {
    try {
      await model.create(delivery);
    } catch (e) {
      throw new Error(`Failed to create delivery: ${e.message}`);
    }
  }

  /**
     * Retrieves a delivery's data
     * @param {bigint}id The delivery's primary key
     * @returns {Promise<model>}
     */
  async findById (id) {
    try {
      return await model.findByPk(id);
    } catch (e) {
      throw new Error('Failed to get delivery');
    }
  }

  /**
     * Updates a delivery's data
     * @param {bigint}deliveryId The delivery's primary key
     * @param newData The data to update to
     * @returns {Promise<boolean|null>} true if updated, null if not found
     * @throws Error
     */
  async update (deliveryId, newData) {
    try {
      const delivery = await model.findByPk(deliveryId);
      if (!delivery) return null;
      await delivery.update(newData);
      return true;
    } catch (e) {
      throw new Error(`Failed to update delivery details: ${e.message}`);
    }
  }

  /**
     * Deletes an existing delivery
     * @param deliveryId THe delivery's primary key
     * @returns {Promise<boolean|null>} true if deleted, null if not found
     */
  async delete (deliveryId) {
    try {
      const delivery = await model.findByPk(deliveryId);
      if (!delivery) return null;
      await delivery.destroy();
      return true;
    } catch (e) {
      throw new Error(`Failed to delete delivery: ${e.message}`);
    }
  }
};
