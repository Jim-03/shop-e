const orderService = require('../services/OrderedItemService');
const service = new orderService();
const getStatus = require('./checkStatus');

// Adds new item to order
function addItemToOrder (req, res) {
  const item = req.body;
  service.addNewItem(item)
    .then(response => {
      res.status(getStatus(response.status)).json(response);
    });
}

// Update ordered item
function updateItem (req, res) {
  const id = parseInt(req.params.id);
  const data = req.body;
  service.updateItem(id, data)
    .then(response => {
      res.status(getStatus(response.status)).json(response);
    });
}

// Gets a list of items in an order
function getItemsInOrder (req, res) {
  const id = parseInt(req.params.id);
  service.getItemInOrder(id)
    .then(response => {
      res.status(getStatus(response.status)).json(response);
    });
}

// Deletes an item from an order
function deleteItem (req, res) {
  const id = parseInt(req.params.id);
  service.deleteOrderedItem(id)
    .then(response => {
      res.status(getStatus(response.status)).json(response);
    });
}

module.exports = {
  getItemsInOrder,
  updateItem,
  deleteItem,
  addItemToOrder
};
