const express = require('express');
const route = express.Router();
const controller = require('../controllers/orderedItemController');

route.get('/api/orderedItems/:id', controller.getItemsInOrder);
route.post('/api/orderedItems', controller.addItemToOrder);
route.put('/api/orderedItems/:id', controller.updateItem);
route.delete('/api/orderedItems/:id', controller.deleteItem);

module.exports = route;
