const model = require('../models/review');

/**
 * A repository class for the review model
 */
class reviewRepository {
  /**
     * Adds a new review to a product
     * @param review The review's data
     * @returns {Promise<boolean>} true if added
     */
  async add (review) {
    try {
      await model.create(review);
      return true;
    } catch (e) {
      throw new Error(`Failed to add review; ${e.message}`);
    }
  }

  /**
     * Fetches reviews of a specific item
     * @param {bigint}itemId The item's primary key
     * @returns {Promise<model>}  The list of reviews
     */
  async fetchReviewByItemId (itemId) {
    try {
      return await model.findAll({ where: { product_id: itemId } });
    } catch (e) {
      throw new Error(`Failed to fetch reviews: ${e.message}`);
    }
  }

  /**
     * Updates an existing review
     * @param {bigint}reviewId The review's primary key
     * @param updatedReview The new review's data
     * @returns {Promise<boolean|null>} true if updated, null if not found
     * @throws Error
     */
  async update (reviewId, updatedReview) {
    try {
      // Fetch review
      const review = await model.findByPk(reviewId);
      if (!review) return null;
      await review.update(updatedReview);
      return true;
    } catch (e) {
      throw new Error(`Failed to update: ${e.message}`);
    }
  }

  async delete (reviewId) {
    try {
      // Fetch review
      const review = await model.findByPk(reviewId);
      if (!review) return null;
      await review.destroy();
      return true;
    } catch (e) {
      throw new Error(`Failed to delete the review: ${e.message}`);
    }
  }
}

module.exports = reviewRepository;
