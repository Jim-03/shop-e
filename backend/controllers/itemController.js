const ItemService = require('../services/itemService')
const service = new ItemService()
const getStatusCode = require('./checkStatus')

/**
 * Retrieves an item
 */
function getItem(req, res) {
    const id = req.params.id
    service.get(id)
        .then(response => {
            res.status(getStatusCode(response.status)).json(response)
        })
}

/**
 * Retrieves a list of items
 */
function getAll(req, res) {
    service.getAll()
        .then (response => {
            res.status(getStatusCode(response.status)).json(response)
        })
}

/**
 * Adds new item
 */
function add(req, res) {
    const item = req.body
    service.add(item)
        .then(response => {
            res.status(getStatusCode(response.status)).json(response)
        })
}

/**
 * Retrieves a list of items having a similar substring in their name
 */
function getByName(req, res) {
    const name = req.params.name
    service.getItems(name)
        .then(response => {
            res.status(getStatusCode(response.status)).json(response)
        })
}

/**
 * Updates an existing item
 */
function update(req, res) {
    const id = parseInt(req.params.id)
    const data = req.body
    service.update(id, data)
        .then(response => {
            res.status(getStatusCode(response.status)).json(response)
        })
}

/**
 * Deletes an item
 */
function deleteItem(req, res) {
    const id = parseInt(req.params.id)
    service.delete(id)
        .then(response => {
            res.status(getStatusCode(response.status)).json(response)
        })
}

module.exports = {
    getItem,
    getAll,
    add,
    getByName,
    update,
    deleteItem
}
