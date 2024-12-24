const ShopRepo = require('../repository/shopRepository');
const UserRepository = require('../repository/userRepository');
const bcrypt = require('bcrypt');
module.exports = class shopService {
  constructor () {
    this.repo = new ShopRepo();
  }

  /**
     * Adds a new shop to the database
     * @param shop The shop's data
     * @returns {Promise<{message: string, status: string}>} an object confirming if created
     */
  async addShop (shop) {
    // Check if data is provided
    if (!shop || Object.keys(shop).length === 0) {
      return { status: 'rejected', message: 'Please provide the shop\'s details' };
    }

    try {
      // Check if a shop with similar credentials exists
      const shopExists = await this.repo.exists(shop.name);
      if (shopExists) {
        return {
          status: 'duplicate',
          message: 'A shop with this name already exists!'
        };
      }

      // Get the details of the owner
      const UserRepo = new UserRepository();
      const owner = await UserRepo.findById(shop.owner_id);

      // Check if owner exists
      if (!owner) {
        return {
          status: 'not_found',
          message: 'The user with the given email doesn\'t exist!'
        };
      }

      // Complete the shop's data
      shop.owner_id = owner.id;
      shop.email = owner.email;
      shop.phone = owner.phone;

      // Add the shop
      await this.repo.create(shop);
      return { status: 'created', message: 'The shop was successfully created' };
    } catch (e) {
      return { status: 'error', message: `An error occurred while adding the shop -> ${e.message}` };
    }
  }

  /**
     * Retrieves a shop's details
     * @param shopName The name of the shop to retrieve
     * @returns {Promise<{status: string, message: string, data: shopModel}>} An object with a message
     *            containing the shop's data
     */
  async read (shopName) {
    // Check if the name is provided
    if (!shopName || shopName.length === 0) {
      return {
        status: 'rejected',
        message: 'Please enter the name of the shop!',
        data: null
      };
    }

    try {
      // Fetch shop details
      const shop = await this.repo.get(shopName);

      // Check if shop exists
      if (!shop) {
        return {
          status: 'not_found',
          message: `The shop ${shopName} wasn't found!`,
          data: null
        };
      }

      // Return the shop's data
      return {
        status: 'success',
        message: 'Shop found',
        data: shop
      };
    } catch (e) {
      return {
        status: 'error',
        message: `An error has occurred -> ${e.message}`,
        data: null
      };
    }
  }

  /**
     * Fetches all the shop's owned by a user
     * @param username - The user's username
     * @param password The user's account password
     * @returns {Promise<{status: string, message: string, list:[shopModel]}>} An object response containing the data
     */
  async getShopsOwnedByUser (username, password) {
    // Check if arguments are provided
    if (!username || username.length === 0) {
      return {
        status: 'rejected',
        message: 'Please enter your username!',
        list: null
      };
    }
    if (!password || password.length === 0) {
      return {
        status: 'rejected',
        message: 'Please provide the password to your account!',
        list: null
      };
    }

    try {
      // Fetch the user's details
      const user = await this.service.getUser(username, null, null, password);

      // Check if user details were received
      if (user.status !== 'success') {
        return {
          status: user.status,
          message: user.message,
          list: null
        };
      }

      // Get a list of shops where the user_id matches the user
      const list = await this.repo.fetchByOwner(user.id);

      // Check if the user has any shops
      if (!list) {
        return {
          status: 'not_found',
          message: 'You don\'t have any shops under your account',
          list: null
        };
      }

      // Ensure the data is a list
      const shopList = Array.isArray(list) ? list : [list];

      // Return the data
      return {
        status: 'success',
        message: 'Shops successfully retrieved',
        list: shopList
      };
    } catch (e) {
      return {
        status: 'error',
        message: `An error has occurred while fetching the list -> ${e.message}`,
        list: null
      };
    }
  }

  /**
     * Retrieves a list of shops in a given location
     * @param locationName The location to search from
     * @returns {Promise<{status: string, message: string, list:[shopModel]}>}
     */
  async getShopsByLocation (locationName) {
    // Check if the name is provided
    if (!locationName || locationName.length === 0) {
      return {
        status: 'rejected',
        message: 'Provide the location to search for',
        list: null
      };
    }

    try {
      // Fetch the shops in a given location
      const list = await this.repo.fetchByLocation(locationName);

      // Check if the location has any shop
      if (!list) {
        return {
          status: 'not_found',
          message: 'The specified location doesn\'t have any shops yet!',
          list: null
        };
      }

      // Ensure the fetched data is an array list
      const shopList = Array.isArray(list) ? list : [list];

      // Return the data
      return {
        status: 'success',
        message: 'Shops in location retrieved',
        list: shopList
      };
    } catch (e) {
      return {
        status: 'error',
        message: `An error has occurred while retrieving the list -> ${e.message}`,
        list: null
      };
    }
  }

  /**
     * Updates an existing shop's data
     * @param newShopData The shop's new data
     * @param shopId The shop's primary key
     * @param user The owner's credentials
     * @returns {Promise<{message: string, status: string}>} An object confirming whether the shop was updated
     */
  async updateShop (newShopData, shopId, user) {
    // Check if arguments are provided
    if (!shopId || isNaN(shopId) || shopId <= 0) {
      return {
        status: 'rejected',
        message: 'Provide shop\'s id!'
      };
    }
    if (!newShopData || Object.keys(newShopData).length === 0) {
      return {
        status: 'rejected',
        message: 'Provide the new shop\'s details!'
      };
    }
    if (!user || Object.keys(user).length === 0) {
      return {
        status: 'rejected',
        message: 'Provide the account\'s details!'
      };
    }

    try {
      // Fetch the shop's data
      const shop = await this.repo.findById(shopId);

      // Check if shop exists
      if (!shop) {
        return {
          status: 'not_found',
          message: 'The shop doesn\'t exist!'
        };
      }

      // Update the shop
      await this.repo.update(newShopData, shopId);
      return { status: 'success', message: 'Shop successfully updated' };
    } catch (e) {
      return {
        status: 'error',
        message: `An error has occurred while updating the shop's details ${e.message}`
      };
    }
  }

  /**
     * Deletes a shop from the database
     * @param shopId The shop's primary key
     * @param accountPassword The password of the owner's account
     * @returns {Promise<{message: string, status: string}>} An object describing the deletion outcome
     */
  async delete (shopId, accountPassword) {
    // Check if the arguments are provided
    if (!shopId || isNaN(shopId) || shopId <= 0) {
      return {
        status: 'rejected',
        message: 'Provide shop\'s id!'
      };
    }
    if (!accountPassword || accountPassword.length === 0) {
      return {
        status: 'rejected',
        message: 'Provide the password to your account'
      };
    }

    try {
      // Fetch the shop's data
      const shop = await this.repo.findById(shopId);

      // Check if shop exists
      if (!shop) {
        return {
          status: 'not_found',
          message: 'The shop wasn\'t found!'
        };
      }

      // Check if the provided password is correct
      const correctPassword = await bcrypt.compare(accountPassword, shop.owner_id.password_hash);
      if (!correctPassword) {
        return {
          status: 'rejected',
          message: 'Incorrect password!'
        };
      }

      // Delete shop
      await shop.destroy();
      return {
        status: 'success',
        message: 'The shop was successfully deleted'
      };
    } catch (e) {
      return {
        status: 'error',
        message: `An error occurred during the deletion process -> ${e.message}`
      };
    }
  }

  /**
   * Retrieves a shop's data
   * @param id The shop's primary key
   * @returns {Promise<{shop: * | null, message: string, status: string}>} The shop's data or null
   */
  async getShop (id) {
    // Validate the id
    if (!id || isNaN(id) || id <= 0) {
      return {
        status: 'rejected',
        message: 'Provide a valid shop id!',
        shop: null
      };
    }

    try {
      // Fetch  the shop's data
      const shop = await this.repo.findById(id);

      // Check if shop exists
      if (!shop) {
        return {
          status: 'not_found',
          message: 'Shop not found!',
          shop: null
        };
      }
      return {
        status: 'success',
        message: 'Shop found',
        shop
      };
    } catch (e) {
      return {
        status: 'error',
        message: `An error has occurred while fetching the shop's details ${e.message}`,
        shop: null
      };
    }
  }
};
