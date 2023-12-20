const express = require('express');
const route = express.Router();
const fs = require('fs/promises');
const uuid = require('uuid');
route.use((req, res, next) => {
  let date = new Date();
  console.log(date);
  next();
});

route.get('/', (req, res) => {
  res.send('YOU ARE ON HOME PAGE');
});

route.get('/json', (req, res) => {
  res.json({
    json: 'this is a json file but can be replaced later with acual response.json',
  });
});

route.get('/uuid', (req, res) => {
  let UUID = uuid.v4();
  res.json({ uuid: UUID });
});

route.get('/status/:code', (req, res) => {
  res.statusCode = req.params.code;
  res.send(req.params.code);
});

route.get('/delay/:seconds', (req, res) => {
  setTimeout(() => {
    res.send(`logged after ${req.params.seconds}`);
  }, req.params.seconds * 1000);
});

module.exports = route;
