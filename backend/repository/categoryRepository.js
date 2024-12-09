const categoryModel = require('../models/category')
const {Op} = require("sequelize");

module.exports = class categoryRepository {
    /**
     * Checks if a category exists in a shop
     * @param {string}name The name of the category
     * @param {bigint}shop_id The shops unique number
     * @returns {Promise<boolean>} true if found, false otherwise
     */
    async existsByName(name, shop_id) {
        const conditions = {
            [Op.and]: [{name: name}, {shop_id: shop_id}]
        }
        return !!await categoryModel.findOne({where: conditions});
    }

    /**
     * Adds a new category to the database
     * @param {categoryModel}category The category's data
     * @returns {Promise<void>} 
     * @throws Error
     */
    async add(category) {
        try {
            await categoryModel.create(category)
        } catch (e) {
            throw new Error(`Failed to create category: ${e.message}`)
        }
    }

    /**
     * Retrieves a list of categories in a shop
     * @param {bigint}id The shop's id
     * @returns {Promise<[categoryModel]>}
     */
    async findByShop(id) {
        return await categoryModel.findAll({where: {shop_id: id}})
    }

    /**
     * Retrieves a category's data using its primary key (id)
     * @param {bigint}id The category's id
     * @returns {Promise<categoryModel>} The category's data or null
     */
    async findById(id) {
        try {
            return await categoryModel.findByPk(id)
        } catch (e) {
            throw new Error(`Failed to fetch the category: ${e.message}`)
        }
    }

    /**
     * Updates an existing category
     * @param {bigint}id The category's id
     * @param {categoryModel}newData The category's new data
     * @returns {Promise<boolean|null>} true if updated, null when category isn't found
     */
    async update(id, newData) {
        try {
            const category = this.findById(id)
            if (!category) return null
            await category.update(newData)
            return true
        } catch (e) {
            throw new Error(`Failed to update: ${e.message}`)
        }
    }

    /**
     * Deletes an existing category
     * @param {bigint}id The category's id
     * @returns {Promise<boolean>} true if deleted, false when not found
     */
    async delete(id) {
        try {
            // Fetch category
            const category = this.findById(id)

            // Check if present
            if (!category) return false
            // Delete
            await category.destroy()
            return true
        } catch (e) {
            throw new Error(`Failed to delete: ${e.message}`)
        }

    }
}