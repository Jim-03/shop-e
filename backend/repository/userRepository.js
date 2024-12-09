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
     * Checks whether a user exists
     * @param username optional username
     * @param email optional email
     * @param phone optional phone number
     * @returns {Promise<boolean>} true if found, false otherwise
     */
  async userExists (username, email, phone) {
    const user = await this.findUser(username, email, phone);
    return !!(user);
  }

  /**
     * Updates user's data
     * @param username account's username
     * @param data the new information to update to
     * @returns {Promise<boolean>} true on successful update, false otherwise
     */
  async updateData (username, data) {
    try {
      if (!await this.userExists(username, null, null)) return false;
      const userData = await this.findUser(username, null, null);
      await userData.update(data);
      return true;
    } catch (e) {
      throw new Error(`Failed to update user: ${e.message}`);
    }
  }
};
