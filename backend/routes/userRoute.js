const express = require('express');
const route = express.Router();
const UserService = require('../services/userService');
const userService = new UserService();
const getStatusCode = require('./checkStatus');

route.post('/account/new', (req, res) => {
  userService.addUser(req.body)
    .then(response => {
      res.status(getStatusCode(response.status))
        .json(response);
    });
});

route.post('/account/get', (request, response) => {
  const { username, email, phone, password } = request.body;
  userService.getUser(username, phone, email, password)
    .then(result => {
      response.status(getStatusCode(result.status))
        .json(result);
    });
});

route.put('/account/update/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const newData = req.body;
  userService.updateUser(id, newData)
    .then(response => {
      res.status(getStatusCode(response.status))
        .json(response);
    });
});

route.delete('/account/delete/:username', (req, res) => {
  const { username } = req.params;
  const { password } = req.body;
  userService.delete(username, password)
    .then(response => {
      res.status(getStatusCode(response.status)).json(response);
    });
});

module.exports = route;
