const express = require('express');
const route = express.Router();
const controller = require('../controllers/categoryController');

route.post('/api/category/new', controller.addCategory);
route.get('/api/category/:id', controller.getCategory);
route.put('/api/category/update/:id', controller.update);
route.delete('/api/category/delete/:id', controller.deleteCategory);

module.exports = route;
