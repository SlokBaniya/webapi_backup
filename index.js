const Express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// connection factory
const knex = require('knex');
const dbConfig = require('./knexfile');

const jwt = require('jsonwebtoken');
// create an express instance
const express = new Express();

express.use(cors());
express.use(bodyParser.json());

// ** this is is client connection
const dbClient = knex(dbConfig);


// function sendHealthStatus(req, resp) {
//   resp.json({
//     status: 'ok'
//   })
  
// }

// function getVersion(req, res) {
//   // send me a version
//   res.json({version: '0.0.0'});           
// }

const userController = require('./controller/users');
const itemController = require('./controller/items');




express.post('/api/item/insert',itemController.add);
express.post('/api/item/upload',itemController.uploadImage);

express.post('/api/user/login', userController.authentication); // 1
express.post('/api/user/register', userController.register);

express.get('/api/users/profile', userController.details);
express.post('/api/users/profile', userController.details);

// express.get('/api/users/:username',getUsername);

express.listen(8000, 'localhost', () => {
  console.log("Server is running at ", 8000)
})


// migration in knex

