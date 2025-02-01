const express = require('express');
const route = express.Router();

route.get('/', (req, res) => {
  return res.render('index');
});

route.get('/login', (req, res) => {
  return res.render('login');
});

route.get('/home', (req, res) => {
  return res.render('home');
});

route.get('/signup', (req, res) => {
  return res.render('signup');
});

route.get('/account', (req, res) => {
  return res.render('account');
});
module.exports = route;
