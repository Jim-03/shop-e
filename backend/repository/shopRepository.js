const shopModel = require('../models/shop');
const { Op } = require('sequelize');

module.exports = class shopRepository {
  /**
     * Checks if a shop exists
     * @param name The shop's name
     * @returns {Promise<boolean>} true if found, false otherwise
     */
  async exists (name) {
    return !!(await shopModel.findOne({ where: { name } }));
  }

  /**
     * Creates a new shop
     * @param shop The shop's data
     * @returns {Promise<boolean>} true if successfully added
     * @throws Error In case an error occurs
     */
  async create (shop) {
    try {
      await shopModel.create(shop);
      return true;
    } catch (e) {
      throw new Error(`Failed to create the shop: ${e.message}`);
    }
  }

  /**
     * Retrieves a shop's details
     * @param shopName The name of the shop
     * @returns {Promise<shopModel>} The shop's data or null
     */
  async get (shopName) {
    try {
      return await shopModel.findOne({ where: { name: shopName } });
    } catch (e) {
      throw new Error(`Failed to fetch the shop details: ${e.message}`);
    }
  }

  /**
     * Retrieves a list of shops
     * @param id The database id of the owner
     * @returns {Promise<[shopModel]>} A list of shops or null
     */
  async fetchByOwner (id) {
    return await shopModel.findAll({ where: { owner_id: id } });
  }

  /**
     * Retrieves a list of shops in a location
     * @param locationName The name of the location to search from
     * @returns {Promise<[shopModel]>} A list of shops in that location
     */
  async fetchByLocation (locationName) {
    return await shopModel.findAll({
      where: {
        location: {
          [Op.like]: `%${locationName}%`
        }
      }
    });
  }

  /**
     * Updates a shop's data
     * @param newShopData The shop's new data
     * @param shopId The shop's primary key
     * @returns {Promise<boolean>} true on successful update
     * @throws Error
     */
  async update (newShopData, shopId) {
    try {
      const shop = await shopModel.findOne({ where: { id: shopId } });
      await shop.update(newShopData);
    } catch (e) {
      throw new Error(`Failed to update: ${e.message}`);
    }
  }

  /**
   * Retrieves a shop's data
   * @param id The shops primary key
   * @returns {Promise<shopModel>} The shop's data, null if not found
   * @throws Error
   */
  async findById(id) {
    try {
      return await shopModel.findByPk(id)
    } catch (e) {
      throw new Error(`Failed to get the shop: ${e.message}`)
    }

  }
};
