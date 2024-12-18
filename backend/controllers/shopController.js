const ShopService = require('../services/shopService');
const service = new ShopService();
const getStatusCode = require('./checkStatus');

// Adds a new shop
function addShop (req, res) {
  const shop = req.body;
  service.addShop(shop)
    .then(response => {
      res.status(getStatusCode(response.status)).json(response);
    });
}

// Retrieves shop's details
function getShop (req, res) {
  const id = parseInt(req.params.id);
  service.getShop(id)
    .then(response => {
      res.status(getStatusCode(response.status)).json(response);
    });
}

// Retrieves shop's based in a given location
function getByLocation (req, res) {
  const location = req.params.location;
  service.getShopsByLocation(location)
    .then(response => {
      res.status(getStatusCode(response.status)).json(response);
    });
}

// Retrieves shops owned by a specific user
function getByUser (req, res) {
  const username = req.params.username;
  const password = req.body.password;
  service.getShopsOwnedByUser(username, password)
    .then(response => {
      res.status(getStatusCode(response.status)).json(response);
    });
}

// Searches for a shop
function searchShop (req, res) {
  const { shopName } = req.body;
  service.read(shopName)
    .then(response => {
      res.status(getStatusCode(response.status)).json(response);
    });
}

// Updates a shop's data
function updateShop (req, res) {
  const id = parseInt(req.params.id);
  const { data, user } = req.body;
  service.updateShop(data, id, user)
    .then(response => {
      res.status(getStatusCode(response.status)).json(response);
    });
}

// Deletes a shop from the database
function deleteShop (req, res) {
  const id = parseInt(req.params.id);
  const { password } = req.body;
  service.delete(id, password)
    .then(response => {
      res.status(getStatusCode(response.status)).json(response);
    });
}
module.exports = {
  addShop,
  getShop,
  getByLocation,
  getByUser,
  searchShop,
  updateShop,
  deleteShop
};
