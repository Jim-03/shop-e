const CategoryRepo = require('../repository/categoryRepository');
const ShopService = require('./shopService');

module.exports = class categoryService {
  constructor () {
    this.repo = new CategoryRepo();
    this.service = new ShopService();
  }

  /**
     * Adds a new category
     * @param category The category's data
     * @returns {Promise<{message: string, status: string}>} An object containing the feedback
     */
  async add (category) {
    // Check if the category dat is provided
    if (!category || Object.keys(category).length === 0) {
      return {
        status: 'rejected',
        message: 'Please provide the category\'s details!'
      };
    }

    try {
      // Check if another category already exists
      const exists = await this.repo.findByName(category.name);
      if (exists) {
        return {
          status: 'duplicate',
          message: 'This category already exists!'
        };
      }

      // Add the category
      await this.repo.add(category);
      return {
        status: 'success',
        message: 'Successfully added the new category'
      };
    } catch (e) {
      return {
        status: 'error',
        message: `An error has occurred while adding the category -> ${e.message}`
      };
    }
  }

  /**
     * Updates an existing category
     * @param {bigint}id The category's id
     * @param {categryModel}newData The category's new data
     * @returns {Promise<{message: string, status: string}>} An object with the updation feedback
     */
  async update (id, newData) {
    // Check if all arguments are provided
    if (!id || id <= 0) {
      return {
        status: 'rejected',
        message: 'Provide the category\'s id!'
      };
    }

    try {
      // Fetch the update process
      const isUpdated = await this.repo.update(id, newData);

      // Check if category exists
      if (!isUpdated) {
        return {
          status: 'not_found',
          message: 'The specified category wasn\'t found!'
        };
      }
      return {
        status: 'success',
        message: 'Category successfully updated'
      };
    } catch (e) {
      return {
        status: 'error',
        message: `An error has occurred while updating the category-> ${e.message}`
      };
    }
  }

  /**
     * Deletes an existing category from the database
     * @param {bigint}id The category's id
     * @returns {Promise<{message: string, status: string}>} An object with a feedback status and message
     */
  async delete (id) {
    // Check if id is provided
    if (!id || isNaN(id) || id <= 0) {
      return {
        status: 'rejected',
        message: 'Provide a valid id!'
      };
    }

    try {
      // Check if deleted
      const isDeleted = await this.repo.delete(id);
      return (isDeleted)
        ? { status: 'success', message: 'Successfully deleted the category' }
        : { status: 'not_found', message: 'The specified category wasn\'t found' };
    } catch (e) {
      return {
        status: 'error',
        message: `An error has occurred while deleting the category -> ${e.message}`
      };
    }
  }

  /**
   * Retrieves a category's data by id
   * @param {bigint}id The category's primary key
   * @returns {Promise<{message: string, category: category | null, status: string}>} An object response with the
   * category's data or null
   */
  async getCategory (id) {
    // Check if id is valid
    if (!id || isNaN(id) || id <= 0) {
      return {
        status: 'rejected',
        message: 'Enter a valid category id!',
        category: null
      };
    }

    try {
      // Fetch category data
      const category = await this.repo.findById(id);

      // Check if category exists
      if (!category) {
        return {
          status: 'not_found',
          message: 'The specified category wasn\'t found!',
          category: null
        };
      }
      return {
        status: 'success',
        message: 'Category was found',
        category
      };
    } catch (e) {
      return {
        status: 'error',
        message: `An error has occurred while fetching the category -> ${e.message}`,
        category: null
      };
    }
  }
};
