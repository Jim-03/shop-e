/**
 * Module to connect to the database
 */

const checkVariables = require('./checkEnvironment')
const {Sequelize} = require("sequelize");

/**
 * Attempts connecting to the database
 * @returns {Promise<boolean>} true if successfully connected, false otherwise
 */
async function connectToDatabase() {
    try {
        // Check if environment variables are provided
        if (!checkVariables()) {
            console.error("Failed to connect to the database")
            return false
        }

        // Get the database url
        const url = checkVariables()

        // Create a new sequelize object
        let database = new Sequelize(url)

        // Try connecting to the database
        await database.authenticate()
        console.log("Connected to the database successfully")
        return true
    } catch (err) {
        console.error(`An error occurred while connecting to the database:\n\t${err}`)
        return false
    }
}
const database = new Sequelize(checkVariables())
module.exports = {connectToDatabase, database}

