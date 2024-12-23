const userModel = require('../models/user');
const { Op } = require('sequelize');
module.exports = class userRepository {
  /**
     * Adds new user to database
     * @param userData User's data
     * @returns {Promise<boolean>} true when successfully added
     * @throws e when an issue occurs
     */
  async createUser (userData) {
    try {
      await userModel.create(userData);
      return true;
    } catch (e) {
      throw new Error(`Failed to create user: ${e.message}`);
    }
  }

  /**
     * Retrieves user's data from the database
     * @param username optional username
     * @param email optional email address
     * @param phone optional phone number
     * @returns {Promise<userModel|null>} the user's data or null if not found
     */
  async findUser (username, email, phone) {
    // Create a dictionary of conditions to find a user
    const conditions = {
      [Op.or]: []
    };

    // Check if the arguments have data
    if (username) {
      conditions[Op.or].push({ username });
    }
    if (phone) {
      conditions[Op.or].push({ phone });
    }
    if (email) {
      conditions[Op.or].push({ email });
    }

    // Return the user data if found
    return await userModel.findOne({ where: conditions });
  }

  /**
   * Updates user's data
   * @param {bigint}userId The user's primary key
   * @param data the new information to update to
   * @returns {Promise<boolean>} true on successful update, false otherwise
   */
  async updateData (userId, data) {
    try {
      const userData = await userModel.findByPk(userId);
      await userData.update(data);
      return true;
    } catch (e) {
      throw new Error(`Failed to update user: ${e.message}`);
    }
  }

  /**
   * Checks if a user exists
   * @param {bigint}id The user's primary key
   * @returns {Promise<boolean>} true if found, false otherwise
   */
  async userExistsById (id) {
    const user = await userModel.findByPk(id);
    return !!(user);
  }

  /**
   * Retrieves a user's data using email address
   * @param {string}email The user's email address
   * @returns {Promise<userModel|null>} The user's data or null
   */
  async findByEmail (email) {
    try {
      return await userModel.findOne({ where: { email } });
    } catch (e) {
      throw new Error(`Failed to get user: ${e.message}`);
    }
  }

  /**
   * Retrieves a user's data using phone number
   * @param phone The user's phone number
   * @returns {Promise<userModel|null>} The user's data
   */
  async findByPhone (phone) {
    try {
      return await userModel.findOne({ where: { phone } });
    } catch (e) {
      throw new Error(`Failed to get user: ${e.message}`);
    }
  }

  /**
   * Retrieves a user's data using username
   * @param username The user's username
   * @returns {Promise<userModel|null>} The user's data
   */
  async findByUsername (username) {
    try {
      return await userModel.findOne({ where: { username } });
    } catch (e) {
      throw new Error(`Failed to get user: ${e.message}`);
    }
  }
};
