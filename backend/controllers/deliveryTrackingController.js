const deliveryService = require('../services/deliveryTrackingService');
const service = new deliveryService();
const getStatus = require('./checkStatus');

// Add new delivery
function newDelivery (req, res) {
  const delivery = req.body;
  service.create(delivery)
    .then(response => {
      res.status(getStatus(response.status)).json(response);
    });
}

// Update delivery details
function update (req, res) {
  const id = parseInt(req.params.id);
  const data = req.body;
  service.updateDelivery(id, data)
    .then(response => {
      res.status(getStatus(response.status)).json(response);
    });
}

// Get delivery details
function getDelivery (req, res) {
  const id = parseInt(req.params.id);
  service.getDelivery(id)
    .then(response => {
      res.status(getStatus(response.status)).json(response);
    });
}

// Delete delivery
function deleteDelivery (req, res) {
  const id = parseInt(req.params.id);
  service.delete(id)
    .then(response => {
      res.status(getStatus(response.status)).json(response);
    });
}

module.exports = {
  newDelivery,
  update,
  getDelivery,
  deleteDelivery
};
