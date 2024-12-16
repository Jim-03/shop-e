const getStatusCode = require('./checkStatus');
const Service = require('../services/userService');
const userService = new Service();

/**
 * Adds a new user
 * @param req The HTTP request
 * @param res The HTTP response
 */
function addUser (req, res) {
  userService.addUser(req.body)
    .then(response => {
      res.status(getStatusCode(response.status))
        .json(response);
    });
}

/**
 * Retrieves a user's details
 * @param request The HTTP request
 * @param response The HTTP response
 */
function getUser (request, response) {
  const { username, email, phone, password } = request.body;
  userService.getUser(username, phone, email, password)
    .then(result => {
      response.status(getStatusCode(result.status))
        .json(result);
    });
}

/**
 * Updates an existing user
 * @param req The HTTP request
 * @param res The HTTP response
 */
function updateUser (req, res) {
  const id = parseInt(req.params.id);
  const newData = req.body;
  userService.updateUser(id, newData)
    .then(response => {
      res.status(getStatusCode(response.status))
        .json(response);
    });
}

/**
 * Deletes an existing user
 * @param req The HTTP request
 * @param res The HTTP response
 */
function deleteUser (req, res) {
  const { username } = req.params;
  const { password } = req.body;
  userService.delete(username, password)
    .then(response => {
      res.status(getStatusCode(response.status)).json(response);
    });
}
module.exports = {
  addUser,
  getUser,
  updateUser,
  deleteUser
};
