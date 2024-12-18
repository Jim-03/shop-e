const express = require('express');
const route = express.Router();
const controller = require('../controllers/deliveryTrackingController');

route.get('/api/delivery/:id', controller.getDelivery);
route.post('/api/delivery', controller.newDelivery);
route.put('/api/delivery/:id', controller.update);
route.delete('/api/delivery/:id', controller.deleteDelivery);

module.exports = route;
