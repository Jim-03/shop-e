const controller = require('../controllers/shopController');
const express = require('express');
const route = express.Router();

route.post('/api/shop/new', controller.addShop);
route.put('/api/shop/:id', controller.updateShop);
route.get('/api/shop/:id', controller.getShop);
route.delete('/api/shop/:id', controller.deleteShop);
route.get('/api/shops/user/:username', controller.getByUser);
route.post('/api/shop/', controller.searchShop);
route.get('/api/shops/:location', controller.getByLocation);

module.exports = route;
