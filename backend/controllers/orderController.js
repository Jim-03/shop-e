const orderService = require('../services/orderService');
const getStatusCode = require('./checkStatus');
const service = new orderService();

// Adds a new order
function addOrder (req, res) {
  const order = req.body;
  service.makeOrder(order)
    .then(response => {
      res.status(getStatusCode(response.status)).json(response);
    });
}

// Updates an order
function updateOrder (req, res) {
  const id = parseInt(req.params.id);
  const data = req.body;
  service.updateOrder(id, data)
    .then(response => {
      res.status(getStatusCode(response.status)).json(response);
    });
}

// Retrieves order's details
function getOrder (req, res) {
  const id = parseInt(req.params.id);
  service.getOrder(id)
    .then(response => {
      res.status(getStatusCode(response.status)).json(response);
    });
}

// Deletes an order
function deleteOrder (req, res) {
  const id = parseInt(req.params.id);
  service.deleteOrder(id)
    .then(response => {
      res.status(getStatusCode(response.status)).json(response);
    });
}

// retrieves orders made by a customer
function getByCustomer (req, res) {
  const id = parseInt(req.params.id);
  service.getOrdersByCustomer(id)
    .then(response => {
      res.status(getStatusCode(response.status)).json(response);
    });
}

module.exports = {
  addOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getByCustomer
};
