const express = require('express');
const route = express.Router();
const controller = require('../controllers/reviewController');

// CRUD routes
route.get('/api/review/:id', controller.getItemReview);
route.put('/api/review/:id', controller.updateReview);
route.post('/api/review', controller.addReview);
route.delete('/api/review/:id', controller.deleteReview);

// UI routes
module.exports = route;
