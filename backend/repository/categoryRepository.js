const categoryModel = require('../models/category');

module.exports = class categoryRepository {
  /**
     * Adds a new category to the database
     * @param {categoryModel}category The category's data
     * @returns {Promise<void>}
     * @throws Error
     */
  async add (category) {
    try {
      await categoryModel.create(category);
    } catch (e) {
      throw new Error(`Failed to create category: ${e.message}`);
    }
  }

  /**
     * Retrieves a category's data using its primary key (id)
     * @param {bigint}id The category's id
     * @returns {Promise<categoryModel>} The category's data or null
     */
  async findById (id) {
    try {
      return await categoryModel.findByPk(id);
    } catch (e) {
      throw new Error(`Failed to fetch the category: ${e.message}`);
    }
  }

  /**
     * Updates an existing category
     * @param {bigint}id The category's id
     * @param {categoryModel}newData The category's new data
     * @returns {Promise<boolean|null>} true if updated, null when category isn't found
     */
  async update (id, newData) {
    try {
      const category = this.findById(id);
      if (!category) return null;
      await category.update(newData);
      return true;
    } catch (e) {
      throw new Error(`Failed to update: ${e.message}`);
    }
  }

  /**
     * Deletes an existing category
     * @param {bigint}id The category's id
     * @returns {Promise<boolean>} true if deleted, false when not found
     */
  async delete (id) {
    try {
      // Fetch category
      const category = this.findById(id);

      // Check if present
      if (!category) return false;
      // Delete
      await category.destroy();
      return true;
    } catch (e) {
      throw new Error(`Failed to delete: ${e.message}`);
    }
  }

  /**
   * Retrieves a category's details by name
   * @param name The name of the category
   * @returns {Promise<*>} The category's data
   */
  async findByName (name) {
    try {
      return await categoryModel.findOne({ where: { name } });
    } catch (e) {
      throw new Error(`Failed to fetch category: ${e.message}`);
    }
  }
};
