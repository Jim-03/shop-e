const Repo = require('../repository/orderRepository');
const CustomerRepository = require('../repository/userRepository');

class OrderService {
  constructor () {
    this.repo = new Repo();
    this.CustomerRepo = new CustomerRepository();
  }

  /**
     * Adds a new order to the database
     * @param order The order's data
     * @returns {Promise<{message: string, status: string}>} An object response from the operation
     */
  async makeOrder (order) {
    // Check if order is provided
    if (!order || Object.keys(order).length === 0) {
      return {
        status: 'rejected',
        message: 'Provide the order\'s data'
      };
    }

    try {
      // Check if customer exists
      const customerExists = await this.CustomerRepo.userExistsById(order.buyer_id);
      if (!customerExists) {
        return {
          status: 'not_found',
          message: 'The specified customer doesn\'t exist!'
        };
      }

      // Add the order
      await this.repo.save(order);
      return {
        status: 'created',
        message: 'The order was successfully made'
      };
    } catch (e) {
      return {
        status: 'error',
        message: `An error occurred while adding the order -> ${e.message}`
      };
    }
  }

  /**
     * Retrieves an order from the database
     * @param {bigint}orderId THe order's primary key
     * @returns {Promise<{message: string, status: string, order: order|null}>} An object containing the order or null
     */
  async getOrder (orderId) {
    // Check if id is correct
    if (!orderId || isNaN(orderId) || orderId <= 0) {
      return {
        status: 'rejected',
        message: 'Provide the correct id!',
        order: null
      };
    }

    try {
      // Fetch the orders details
      const order = await this.repo.findById(orderId);

      // Check if order exists
      if (!order) {
        return {
          status: 'not_found',
          message: 'The specified order wasn\'t found!',
          order: null
        };
      }

      return {
        status: 'success',
        message: 'Order found',
        order
      };
    } catch (e) {
      return {
        status: 'error',
        message: 'An error occurred while fetching order',
        order: null
      };
    }
  }

  /**
     * Retrieves a list of all orders made by a customer
     * @param {bigint}customerId The customer's unique identifier
     * @returns {Promise<{orders: order[]|null, message: string, status: string}>} An object with the orders list or
     *           null
     */
  async getOrdersByCustomer (customerId) {
    // Check if id is correct
    if (!customerId || isNaN(customerId) || customerId <= 0) {
      return {
        status: 'rejected',
        message: 'Provide the correct customer id!',
        orders: null
      };
    }

    try {
      // Check if customer exists
      const customerExists = await this.CustomerRepo.userExistsById(customerId);
      if (!customerExists) {
        return {
          status: 'not_found',
          message: 'The specified customer doesn\'t exist!',
          orders: null
        };
      }

      // Fetch the list of orders made
      const list = await this.repo.findByCustomer(customerId);
      // Check if customer has any orders
      if (!list) {
        return {
          status: 'not_found',
          message: 'No orders have been made!',
          orders: null
        };
      }

      return {
        status: 'success',
        message: 'Orders list found',
        orders: (Array.isArray(list)) ? list : [list]
      };
    } catch (e) {
      return {
        status: 'error',
        message: `An error has occurred while fetching the orders -> ${e.message}`,
        orders: null
      };
    }
  }

  /**
     * Updates an order
     * @param {bigint}orderId The order's primary key
     * @param updatedOrder The new data
     * @returns {Promise<{message: string, status: string}>} An object response from the operation
     */
  async updateOrder (orderId, updatedOrder) {
    // Check if arguments are provided
    if (!orderId || isNaN(orderId) || orderId <= 0) {
      return {
        status: 'rejected',
        message: 'Provide the correct order id!'
      };
    }
    if (!updatedOrder || Object.keys(updatedOrder).length === 0) {
      return {
        status: 'rejected',
        message: 'Provide the updated data!'
      };
    }

    try {
      // Check if order is updated
      const isUpdated = await this.repo.update(orderId, updatedOrder);

      if (!isUpdated) {
        return {
          status: 'not_found',
          message: 'The specified order doesn\'t exist!'
        };
      }
      return {
        status: 'success',
        message: 'The order was successfully updated'
      };
    } catch (e) {
      return {
        status: 'error',
        message: `An error has occurred while updating the review -> ${e.message}`
      };
    }
  }

  /**
     * Deletes a specific order
     * @param {bigint}orderId The order's primary key
     * @returns {Promise<{message: string, status: string}>} An object response
     */
  async deleteOrder (orderId) {
    // Check if id is correct
    if (!orderId || isNaN(orderId) || orderId <= 0) {
      return {
        status: 'rejected',
        message: 'Provide the correct order id!'
      };
    }

    try {
      // Check if order is deleted
      const isDeleted = await this.repo.delete(orderId);
      if (!isDeleted) {
        return {
          status: 'not_found',
          message: 'The specified order doesn\'t exist!'
        };
      }
      return {
        status: 'success',
        message: 'Order successfully deleted'
      };
    } catch (e) {
      return {
        status: 'error',
        message: `An error occurred while deleting order -> ${e.message}`
      };
    }
  }
}

module.exports = OrderService;
