const express = require('express');
const route = express.Router();
const controller = require('../controllers/userController');

route.post('/api/account/new', controller.addUser);
route.post('/api/account/get', controller.getUser);
route.put('/api/account/update/:id', controller.updateUser);
route.delete('/api/account/delete/:id', controller.deleteUser);

module.exports = route;
