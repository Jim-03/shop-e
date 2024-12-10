const ItemRepo = require('../repository/itemRepository')
const CategoryService = require('categoryService')

/**
 * A service class for the Item model
 * @type {itemService}
 */
module.exports = class itemService{
    constructor() {
        this.repo = new ItemRepo()
        this.categoryService = new CategoryService()
    }

    /**
     * Adds a new item
     * @param item The item's data
     * @returns {Promise<{message: string, status: string}>} An object feedback response
     */
    async add(item) {
        // Check if item data is provided
        /**
         * Adds a new item to the database
         * @param item The item's data
         * @returns {Promise<{message: string, status: string}>} An object response describing the result
         */
        if (!item || Object.keys(item).length === 0) return {
            status: 'rejected',
            message: 'Provide the item\'s details'
        }

        try {
            // Check if item exists
            const itemExists = await this.repo.itemExists(item.name, item.category_id)

            if (itemExists) return {
                status: 'duplicate',
                message: 'An item with the same credentials exists in this category!'
            }

            // Add the item
            await this.repo.create(item)
            return {
                status: 'created',
                message: 'Item successfully added'
            }
        } catch (e) {
            return {
                status: 'error',
                message: `An error has occurred while adding the item -> ${e.message}`
            }
        }
    }

    /**
     * Gets a list of all items with a similar name
     * @param {string}name The name of the item
     * @returns {Promise<{data: items[], message: string, status: string}>} A feedback object containing the list of
     *          items
     * todo Pagination and Sorting
     */
    async getItems(name) {
        // Check if name is provided
        if (!name || name.length === 0) return {
            status: 'rejected',
            message: 'Provide the item\'s name!',
            data: null
        }

        try {
            // Get the list of items
            const list = await this.repo.getAllByName(name)

            // Check if items exist
            if (!list) return {
                status: 'not_found',
                message: 'No item has been found',
                data: null
            }

            // Ensure the list is an array
            const itemsList = Array.isArray(list) ? list : [list]

            // Return the output
            return {
                status: 'success',
                message: 'Item list found',
                data: itemsList
            }
        } catch (e) {
            return {
                status: 'error',
                message: `An error has occurred while fetching list -> ${e.message}`,
                data: null
            }
        }
    }

    /**
     * Gets a specific item from a shop
     * @param {string}name The name of the item
     * @param {bigint}shopId The shop's primary key
     * @returns {Promise<{item: item, message: string, status: string}>} A feedback object with/without the item's data
     */
    async get(name, shopId) {
        // Check if name is provided
        if (!name || name.length === 0) return {
            status: 'rejected',
            message: 'Enter the item\'s name',
            item: null
        } // Check if shop id is correct
        if (!shopId || isNaN(shopId) || shopId <= 0) return {
            status: 'rejected',
            message: 'Provide the shop\'s id to which the item belongs to!',
            item: null
        }

        try {
            // Fetch item details
            const item = await this.repo.findByName(name, shopId)

            // Check if item exists
            if (!item) return {
                status: 'not_found',
                message: `Item ${name} not found!`,
                item: null
            }
            return {status: 'success', message: 'Item found', item: item}
        } catch (e) {
            return {
                status: 'error',
                message: `An error has occurred while fetching the item -> ${e.message}`,
                item: null
            }
        }
    }

    /**
     * Updates an existing item
     * @param {bigint}id The items primary key
     * @param newItemData The item's new data
     * @returns {Promise<{message: string, status: string}>} Object with feedback response
     */
    async update(id, newItemData) {
        // Check if arguments are provided
        if (!id || isNaN(id) || id <= 0) return {
            status: 'rejected',
            message: 'Provide the item\'s id!'
        }
        if (!newItemData || Object.keys(newItemData).length === 0) return {
            status: 'rejected',
            message: 'Provide the item\'s new details!'
        }

        try {
            // Fetch the update results
            const isUpdated = await this.repo.update(id, newItemData)

            // Check if updated
            if (!isUpdated) return {
                status: 'not_found',
                message: 'The specified item wasn\'t found!'
            }
            return {
                status: 'success',
                message: 'Item successfully updated'
            }
        }catch (e) {
            return {
                status: 'error',
                message: `An error occurred while updating the item -> ${e.message}`
            }
        }
    }

    /**
     * Deletes an item from the database
     * @param {bigint}id The item's primary key
     * @returns {Promise<{message: string, status: string}>} A feedback object confirming the deletion status
     */
    async delete(id) {
        // Check if item's name is provided
        if (!id || isNaN(id) || id <= 0) return {
            status: 'rejected',
            message: 'Provide the item\'s id!'
        }

        try {
            // Check if item is deleted
            const isDeleted = await this.repo.deleteItem(id)
            if (!isDeleted) return {
                status: 'not_found',
                message: 'The specified item wasn\'t found!'
            }

            return {
                status: 'success',
                message: 'The item was successfully deleted'
            }
        } catch (e) {
            return {
                status: 'error',
                message: `An error occurred during deletion -> ${e.message}`
            }
        }
    }
}