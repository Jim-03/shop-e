const reviewService = require('../services/reviewService');
const service = new reviewService();
const getStatus = require('./checkStatus');

// Adds a new review
function addReview (req, res) {
  const review = req.body;
  service.save(review)
    .then(response => {
      res.status(getStatus(response.status)).json(response);
    });
}

// Retrieves reviews on a specific item
function getItemReview (req, res) {
  const id = parseInt(req.params.id);
  service.getItemReviews(id)
    .then(response => {
      res.status(getStatus(response.status)).json(response);
    });
}

// Updates an existing review
function updateReview (req, res) {
  const id = parseInt(req.params.id);
  const data = req.body;
  service.update(id, data)
    .then(response => {
      res.status(getStatus(response.status)).json(response);
    });
}

// Deletes a review
function deleteReview (req, res) {
  const id = parseInt(req.params.id);
  service.delete(id)
    .then(response => {
      res.status(getStatus(response.status)).json(response);
    });
}
module.exports = {
  addReview,
  getItemReview,
  updateReview,
  deleteReview
};
