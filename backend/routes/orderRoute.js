const express = require('express')
const route = express.Router()
const controller = require('../controllers/orderController')

route.get('/api/order/:id', controller.getOrder)
route.post('/api/order', controller.addOrder)
route.put('/api/order/:id', controller.updateOrder)
route.delete('/api/order/:id', controller.deleteOrder)
route.get('/api/orders/:id', controller.getByCustomer)

module.exports = route