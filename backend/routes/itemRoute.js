const express = require('express');
const route = express.Router();
const controller = require('../controllers/itemController');

route.get('/api/items/get/:id', controller.getItem);
route.put('/api/items/update/:id', controller.update);
route.get('/api/items/:name', controller.getByName);
route.post('/api/item/new', controller.add);
route.delete('/api/item/delete', controller.deleteItem);
route.get('/api/items', controller.getAll);
route.get('/api/items/category/:name', controller.getByCategory)

module.exports = route;
