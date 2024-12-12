/**
 * Checks the appropriate response code
 * @param {string}status A string information
 * @returns {number} The status code
 */
module.exports = function checkStatus (status) {
  const statusMap = {
    success: 200,
    created: 201,
    rejected: 400,
    not_found: 404,
    duplicate: 409
  };

  return statusMap[status] || 500;
};
