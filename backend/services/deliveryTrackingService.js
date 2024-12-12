const Repo = require('../repository/deliveryTrackingRepository')
const {del} = require("express/lib/application");
module.exports = class DeliveryTrackingService {
    constructor() {
        this.repo = new Repo()
    }

    /**
     * Adds a new delivery
     * @param delivery The data to add
     * @returns {Promise<{message: string, status: string}>} An object confirming whether the data was added
     */
    async create(delivery) {
        // Check if delivery data is provided
        if (!delivery || Object.keys(delivery).length === 0) return {
            status: 'rejected',
            message: 'Provide the delivery details'
        }

        try {
            await this.repo.save(delivery)
            return {
                status: 'created',
                message: 'Successfully made delivery'
            }
        } catch (e) {
            return {
                status: 'error',
                message: `An error occurred while creating the delivery -> ${e.message}`
            }
        }
    }

    /**
     * Retrieves a delivery's data
     * @param {bigint}id The delivery's primary key
     * @returns {Promise<{delivery: delivery, message: string, status: string}>} An object with the data or null
     */
    async getDelivery(id) {
        // Check if the id is valid
        if (!id || isNaN(id) || id <= 0) return {
            status: 'rejected',
            message: 'Provide the delivery\'s id!',
            delivery: null
        }

        try {
            // Fetch delivery data
            const delivery = await this.repo.findById(id)

            // Check if delivery exists
            if (!delivery) return {
                status: 'not_found',
                message: 'The delivery specified wasn\'t found!',
                delivery: null
            }
            return {
                status: 'success',
                message: 'Delivery found',
                delivery: delivery
            }
        } catch (e) {
            return {
                status: 'error',
                message: `An error occurred while fetching the delivery information -> ${e.message}`,
                delivery: null
            }
        }
    }

    /**
     * Updates a delivery's details
     * @param {bigint}deliveryId The delivery's primary key
     * @param newData The delivery's new data
     * @returns {Promise<{message: string, status: string}>} An object confirming if the delivery is updated
     */
    async updateDelivery(deliveryId, newData) {
        // Check if arguments are provided
        if (!deliveryId || isNaN(deliveryId) || deliveryId <= 0) return {
            status: 'rejected',
            message: 'Provide the delivery\'s id!'
        }
        if (!newData || Object.keys(newData).length === 0) return {
            status: 'rejected',
            message: 'Provide the delivery\'s data!'
        }

        try {
            // Check if the delivery is updated
            const isUpdated = await this.repo.update(deliveryId, newData)
            if (!isUpdated) return {
                status: 'not_found',
                message: 'The specified delivery wasn\'t found!'
            }
            return {
                status: 'success',
                message: 'The delivery\'s details was updated'
            }
        } catch (e) {
            return {
                status: 'error',
                message: `An error has occurred while updating the delivery's details -> ${e.message}`
            }
        }
    }

    /**
     * Deletes an existing delivery
     * @param {bigint}deliveryId The delivery's primary key
     * @returns {Promise<{message: string, status: string}>} An object confirming whether delivery was deleted
     */
    async delete(deliveryId) {
        // Check if the id is correct
        if (!deliveryId || isNaN(deliveryId) || deliveryId <= 0) return {
            status: 'rejected',
            message: 'Provide the delivery\'s id!'
        }

        try {
            // Check if delivery is deleted
            const isDeleted = await this.repo.delete(deliveryId);
            if (!isDeleted) return {
                status: 'not_found',
                message: 'The specified delivery wasn\'t found!'
            }

            return {
                status: 'success',
                message: 'Successfully deleted the delivery\'s details'
            }
        } catch (e) {
            return {
                status: 'error',
                message: `An error occurred while deleting the delivery's details -> ${e.message}`
            }
        }
    }
}