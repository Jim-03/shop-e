const Repo = require('../repository/reviewRepository');
const ItemRepo = require('../repository/itemRepository');

/**
 * Helper function to check if review structure is correct
 * @param review The review's data
 * @returns {boolean|string} true if correct, string with error
 */
function validateReview (review) {
  if (review.reviewer_id === undefined) {
    return "Provide the reviewer's id!";
  }
  if (review.product_id === undefined || isNaN(review.product_id) || review.product_id <= 0) {
    return "Provide the correct product's id!";
  }
  if (review.message === undefined || review.message.length <= 0) {
    return "Provide the review's content!";
  }

  return true;
}

/**
 * Service class for review model
 */
class reviewService {
  constructor () {
    this.repo = new Repo();
  }

  /**
     * Adds new review
     * @param review The review's data
     * @returns {Promise<{message: string, status: string}>} An object feedback from the operation
     */
  async save (review) {
    // Check if review data is provided
    if (!review || Object.keys(review)) {
      return {
        status: 'rejected',
        message: 'Provide your review!'
      };
    }

    // Check if review is valid
    const validity = validateReview(review);
    if (validity !== true) {
      return {
        status: 'reject',
        message: validity
      };
    }

    try {
      // Add the review
      await this.repo.add(review);
      return {
        status: 'success',
        message: 'Review successfully made'
      };
    } catch (e) {
      return {
        status: 'error',
        message: `An error has occurred while making review -> ${e.message}`
      };
    }
  }

  /**
     * Retrieves reviews on a specific item
     * @param {bigint}itemId The item's primary key
     * @returns {Promise<{status: string, message: string, reviews: null|review[]}>} An object response having the
     *          reviews or null
     * TODO pagination and sorting
     */
  async getItemReviews (itemId) {
    // Validate the id
    if (!itemId || isNaN(itemId) || itemId <= 0) {
      return {
        status: 'rejected',
        message: 'Enter the item\'s id!',
        reviews: null
      };
    }

    try {
      // Check if item exists
      const itemRepository = new ItemRepo();
      if (await itemRepository.findById(itemId)) {
        // Fetch the reviews
        const reviews = await this.repo.fetchReviewByItemId(itemId);

        // Check if the item has reviews
        if (!reviews) {
          return {
            status: 'not_found',
            message: 'The item doesn\'t have any reviews',
            reviews: null
          };
        }

        return {
          status: 'success',
          message: 'Reviews found',
          reviews: (Array.isArray(reviews)) ? reviews : [reviews]
        };
      }
      return {
        status: 'not_found',
        message: 'The specified item wasn\'t found!',
        reviews: null
      };
    } catch (e) {
      return {
        status: 'error',
        message: `An error has occurred while fetching reviews -> ${e.message}`
      };
    }
  }

  /**
     * Updates an existing review
     * @param {bigint}reviewId The review's primary key
     * @param updatedReview The new review's data
     * @returns {Promise<{message: string, status: string}>} An object feedback describing whether updated or not
     */
  async update (reviewId, updatedReview) {
    // Confirm arguments
    if (!reviewId || isNaN(reviewId) || reviewId <= 0) {
      return {
        status: 'rejected',
        message: 'Please enter the correct review id!'
      };
    }
    const validity = validateReview(updatedReview);
    if (validity !== true) {
      return {
        status: 'rejected',
        message: validity
      };
    }

    try {
      // Confirm update status
      const isUpdated = await this.repo.update(reviewId, updatedReview);

      if (isUpdated === null) {
        return {
          status: 'not_found',
          message: 'The specified review wasn\'t found!'
        };
      }

      return {
        status: 'success',
        message: 'Review updated'
      };
    } catch (e) {
      return {
        status: 'error',
        message: `An error has occurred while updating the review -> ${e.message}`
      };
    }
  }

  /**
     * Deletes a review from the database
     * @param {bigint}reviewId The review's primary key
     * @returns {Promise<{message: string, status: string}>} An object response describing whether deleted or not
     */
  async delete (reviewId) {
    // Check if review id is provided
    if (!reviewId || isNaN(reviewId) || reviewId <= 0) {
      return {
        status: 'rejected',
        message: 'Provide the right review id!'
      };
    }

    try {
      // Confirm whether review is deleted
      const isDeleted = await this.repo.delete(reviewId);
      if (isDeleted === null) {
        return {
          status: 'not_found',
          message: 'The specified review wasn\'t found!'
        };
      }

      return {
        status: 'success',
        message: 'Successfully deleted the review'
      };
    } catch (e) {
      return {
        status: 'error',
        message: `An error occurred while deleting the review -> ${e.message}`
      };
    }
  }
}

module.exports = reviewService;
