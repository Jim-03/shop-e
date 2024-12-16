const categoryService = require('../services/categoryService')
const service = new categoryService()
const getStatusCode = require('./checkStatus')

/**
 * Adds a new category to the database
 * @param req The http request
 * @param res The response from the database
 */
const addCategory = function (req, res) {
    const category = req.body
    service.add(category)
        .then(response => {
            res.status(getStatusCode(response.status)).json(response)
        })
}

/**
 * Retrieves a list of categories registered in a shop
 * @param req The http request
 * @param res Response from the service
 */
const getCategories = function (req, res) {
    const shopName = req.params.shopName
    service.getAllFromShop(shopName)
        .then(response => {
            res.status(getStatusCode(response.status)).json(response)
        })
}

/**
 * Retrieves a category's data
 * @param req The HTTP request
 * @param res The HTTP response
 */
const getCategory = function (req, res) {
    const id = parseInt(req.params)
    service.getCategory(id)
        .then(response => {
            res.status(getStatusCode(response.status)).json(response)
        })
}

/**
 * Updates an existing category
 * @param req The HTTP request
 * @param res The HTTP response
 */
const update = function (req, res) {
    const id = parseInt(req.params)
    const category = req.body
    service.update(id, category)
        .then(response => {
            res.status(getStatusCode(response.status)).json(response)
        })
}

/**
 * Deletes an existing category's data
 * @param req The HTTP request
 * @param res The HTTP response
 */
const deleteCategory = function (req, res) {
    const id = parseInt(req.params)
    service.delete(id)
        .then(response => {
            res.status(getStatusCode(response.status)).json(response)
        })
}
module.exports = {
    addCategory,
    getCategories,
    getCategory,
    update,
    deleteCategory
}