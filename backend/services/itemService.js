const ItemRepo = require('../repository/itemRepository');
const CategoryRepo = require('../repository/categoryRepository');

/**
 * A service class for the Item model
 * @type {itemService}
 */
class itemService {
  constructor () {
    this.repo = new ItemRepo();
  }

  /**
     * Adds a new item
     * @param item The item's data
     * @returns {Promise<{message: string, status: string}>} An object feedback response
     */
  async add (item) {
    // Check if item data is provided
    /**
         * Adds a new item to the database
         * @param item The item's data
         * @returns {Promise<{message: string, status: string}>} An object response describing the result
         */
    if (!item || Object.keys(item).length === 0) {
      return {
        status: 'rejected',
        message: 'Provide the item\'s details'
      };
    }

    try {
      // Check if item exists
      const itemExists = await this.repo.itemExists(item.name, item.category_id);

      if (itemExists) {
        return {
          status: 'duplicate',
          message: 'An item with the same credentials exists in this category!'
        };
      }

      // Add the item
      await this.repo.create(item);
      return {
        status: 'created',
        message: 'Item successfully added'
      };
    } catch (e) {
      return {
        status: 'error',
        message: `An error has occurred while adding the item -> ${e.message}`
      };
    }
  }

  /**
     * Gets a list of all items with a similar name
     * @param {string}name The name of the item
     * @returns {Promise<{data: items[], message: string, status: string}>} A feedback object containing the list of
     *          items
     * TODO Pagination and Sorting
     */
  async getItems (name) {
    // Check if name is provided
    if (!name || name.length === 0) {
      return {
        status: 'rejected',
        message: 'Provide the item\'s name!',
        data: null
      };
    }

    try {
      // Get the list of items
      const list = await this.repo.getAllByName(name);

      // Check if items exist
      if (!list || list.length === 0) {
        return {
          status: 'not_found',
          message: 'No item has been found!',
          data: null
        };
      }

      // Ensure the list is an array
      const itemsList = Array.isArray(list) ? list : [list];

      // Return the output
      return {
        status: 'success',
        message: 'Item list found',
        data: itemsList
      };
    } catch (e) {
      return {
        status: 'error',
        message: `An error has occurred while fetching list -> ${e.message}`,
        data: null
      };
    }
  }

  /**
     * Gets a specific item from a shop
     * @param {bigint}id The item's primary key
     * @returns {Promise<{item: item, message: string, status: string}>} A feedback object with/without the item's data
     */
  async get (id) {
    // Check if id is valid
    if (!id || isNaN(id) || id <= 0) {
      return {
        status: 'rejected',
        message: 'Provide the correct item id!',
        item: null
      };
    }

    try {
      // Fetch item details
      const item = await this.repo.findById(id);

      // Check if item exists
      if (!item) {
        return {
          status: 'not_found',
          message: 'Item not found!',
          item: null
        };
      }
      return { status: 'success', message: 'Item found', item };
    } catch (e) {
      return {
        status: 'error',
        message: `An error has occurred while fetching the item -> ${e.message}`,
        item: null
      };
    }
  }

  /**
     * Updates an existing item
     * @param {bigint}id The items primary key
     * @param newItemData The item's new data
     * @returns {Promise<{message: string, status: string}>} Object with feedback response
     */
  async update (id, newItemData) {
    // Check if arguments are provided
    if (!id || isNaN(id) || id <= 0) {
      return {
        status: 'rejected',
        message: 'Provide the item\'s id!'
      };
    }
    if (!newItemData || Object.keys(newItemData).length === 0) {
      return {
        status: 'rejected',
        message: 'Provide the item\'s new details!'
      };
    }

    try {
      // Fetch the update results
      const isUpdated = await this.repo.update(id, newItemData);

      // Check if updated
      if (!isUpdated) {
        return {
          status: 'not_found',
          message: 'The specified item wasn\'t found!'
        };
      }
      return {
        status: 'success',
        message: 'Item successfully updated'
      };
    } catch (e) {
      return {
        status: 'error',
        message: `An error occurred while updating the item -> ${e.message}`
      };
    }
  }

  /**
     * Deletes an item from the database
     * @param {bigint}id The item's primary key
     * @returns {Promise<{message: string, status: string}>} A feedback object confirming the deletion status
     */
  async delete (id) {
    // Check if item's name is provided
    if (!id || isNaN(id) || id <= 0) {
      return {
        status: 'rejected',
        message: 'Provide the item\'s id!'
      };
    }

    try {
      // Check if item is deleted
      const isDeleted = await this.repo.deleteItem(id);
      if (!isDeleted) {
        return {
          status: 'not_found',
          message: 'The specified item wasn\'t found!'
        };
      }

      return {
        status: 'success',
        message: 'The item was successfully deleted'
      };
    } catch (e) {
      return {
        status: 'error',
        message: `An error occurred during deletion -> ${e.message}`
      };
    }
  }

  /**
   * Retrieves a list of all items
   * @returns {Promise<{message: string, items: item[] | null, status: string}>} An object response with the item list or null
   * TODO pagination and sorting
   */
  async getAll () {
    try {
      // Fetch all items
      const items = await this.repo.getAll();

      // Check if items exist
      if (!items || items.length === 0) {
        return {
          status: 'not_found',
          message: 'No items at the moment!',
          items: null
        };
      }

      return {
        status: 'success',
        message: 'Items found',
        items: Array.isArray(items) ? items : [items]
      };
    } catch (e) {
      return {
        status: 'error',
        message: `An error has occurred while fetching the list of items -> ${e.message}`,
        items: null
      };
    }
  }

  async getByCategoryName (categoryName) {
    // Validate input data
    if (!categoryName || categoryName.length === 0) {
      return {
        status: 'rejected',
        message: 'Enter category\'s name!',
        data: null
      };
    }

    try {
      // Fetch category's data
      const catRepo = new CategoryRepo();
      const category = await catRepo.findByName(categoryName);

      // Check if category exists
      if (!category) {
        return {
          status: 'not_found',
          message: `The category ${categoryName} doesn't exist!`,
          data: null
        };
      }

      // Fetch items in this category
      const items = await this.repo.findByCategoryId(category.id);

      // Check if category has items
      if (!items || items.length === 0) {
        return {
          status: 'not_found',
          message: 'The specified category doesn\'t have any items at the moment!',
          data: null
        };
      }

      return {
        status: 'success',
        message: 'Items in category found',
        data: Array.isArray(items) ? items : [items]
      };
    } catch (e) {
      return {
        status: 'error',
        message: `An error has occurred wile fetching the items in the category: ${e.message}`,
        data: null
      };
    }
  }
}

module.exports = itemService;
