const UserRepo = require('../repository/userRepository');
const bcrypt = require('bcrypt');
const userModel = require('../models/user')
module.exports = class userService {
  constructor () {
    this.repository = new UserRepo();
  }

  /**
     * Adds new user to the database
     * @param userData The data to be added
     * @returns {Promise<{message: string, status: string}>} an object describing the creation result
     */
  async addUser (userData) {
    // Check if user data is provided
    if (!userData || Object.keys(userData).length === 0) {
      return {
        status: 'rejected',
        message: 'Please provide the user\'s data to be saved!'
      };
    }

    // Attempt adding to the database
    try {
      // Check if user exists
      const exists = await this.repository.userExists(userData.username, userData.email, userData.phone);
      if (exists) {
        return {
          status: 'duplicate',
          message: 'Another account already exists with this credentials'
        };
      }

      // Hash the user's password
      const salt = await bcrypt.genSalt();
      userData.password_hash = await bcrypt.hash(userData.password, salt);

      // Save the user
      await this.repository.createUser(userData);
      return {
        status: 'success',
        message: 'Account successfully created'
      };
    } catch (e) {
      return {
        status: 'error',
        message: `An error has occurred while adding the account -> ${e.message}`
      };
    }
  }

  /**
   * Retrieves the details of the user
   * @param username The account's username
   * @param phone The account's phone number
   * @param email The account's email address
   * @param password The account's password
   * @returns {Promise<{status: string, message: string, data: userModel}>} An object containing retrieval details
   */
  async getUser (username, phone, email, password) {
    // Check if at least one identifier is provided
    if (!username && !phone && !email) {
      return {
        status: 'rejected',
        message: 'Please enter one identifier to your account!',
        data: null
      };
    }

    // Check if password is provided
    if (!password) {
      return {
        status: 'rejected',
        message: 'Please enter your account\'s password',
        data: null
      };
    }

    // Attempt fetching the account
    try {
      // Fetch the account's details
      const account = await this.repository.findUser(username, email, phone);
      if (!account) {
        return {
          status: 'not_found',
          message: 'Account not found!',
          data: null
        };
      }

      // Check if the passwords match
      const correctPassword = await bcrypt.compare(password, account.password_hash);
      if (!correctPassword) {
        return {
          status: 'rejected',
          message: 'Incorrect password!',
          data: null
        };
      }
      return {
        status: 'success',
        message: 'Account found',
        data: account
      };
    } catch (e) {
      return {
        status: 'error',
        message: `An error occurred while fetching the account -> ${e.message}`,
        data: null
      };
    }
  }

  /**
   * Updates an existing user's data
   * @param oldUsername The old username for identifying the old account
   * @param newData The new data to replace with
   * @returns {Promise<{message: string, status: string}>} an object confirming whether updated
   */
  async updateUser (oldUsername, newData) {
    // Check if the old username is provided
    if (!oldUsername) {
      return {
        status: 'rejected',
        message: 'The old username is required!'
      };
    }

    // Check if the new data is provided and filled
    if (!newData || Object.keys(newData).length === 0) {
      return {
        status: 'rejected',
        message: 'New data to update to is required!'
      };
    }

    try {
      // Fetch the user's data
      const oldAccountData = this.repository.userExists(oldUsername);
      if (!oldAccountData) {
        return {
          status: 'not_found',
          message: 'The specified account wasn\'t found!'
        };
      }
      await this.repository.updateData(oldUsername, newData);
      return {
        status: 'updated',
        message: 'Your account was successfully updated'
      };
    } catch (e) {
      return {
        status: 'error',
        message: `An error occurred while updating -> ${e.message}`
      };
    }
  }

  /**
   * Deletes a user from the database
   * @param username The account's username
   * @param password The account's password
   * @returns {Promise<{message: string, status: string}>} An object confirming whether there was a successful deletion
   */
  async delete (username, password) {
    // Check if arguments are provided
    if (!username) {
      return {
        status: 'rejected',
        message: 'Please enter your username!'
      };
    }
    if (!password) {
      return {
        status: 'rejected',
        message: 'Please enter your account\'s password!'
      };
    }
    try {
      // Fetch account details
      const account = this.repository.findUser(username, null, null);

      // Check if account exists
      if (!account) {
        return {
          status: 'not_found',
          message: 'The specified account wasn\'t found!'
        };
      }

      // Check if the provided password matches the account's password
      const correctPassword = await bcrypt.compare(password, account.password_hash);
      if (!correctPassword) {
        return {
          status: 'rejected',
          message: 'Incorrect password!'
        };
      }

      // Delete account
      await account.destroy();
      return {
        status: 'success',
        message: 'Account was successfully deleted'
      };
    } catch (e) {
      return {
        status: 'error',
        message: `An error has occurred while deleting the account -> ${e.message}`
      };
    }
  }
};
