/**
 * Module to check if environment variables exist
 * @require dotenv
 */

require('dotenv').config()

/**
 * Checks if environment variables are provided
 * @returns {string|boolean} false if not provided, database url if provided
 */
module.exports = function checkVariables() {
    const username = process.env.DB_USER
    const password = process.env.DB_PASS
    const dialect = process.env.DB_DIALECT
    const host = process.env.DB_HOST
    const port = process.env.DB_PORT
    const dbName = process.env.DB_NAME

    if (!username) {
        console.error("Please provide DB_USER=your_username in the backend/.env file")
        return false
    } else if (!password) {
        console.error("Please provide DB_PASS=your_password in the backend/.env file")
        return false
    } else if (!dialect) {
        console.error("Please provide DB_DIALECT=your_dialect in the backend/.env file")
        return false
    } else if (!host) {
        console.error("Please provide DB_HOST=your_host in the backend/.env file")
        return false
    }
    else if (!port) {
        console.error("Please provide DB_PORT=your_port in the backend/.env file")
        return false
    } else if (!dbName){
        console.error("Please provide DB_NAME=your_database_name in the backend/.env file")
        return false
    }
    return `${dialect}://${username}:${password}@${host}:${port}/${dbName}`
}
