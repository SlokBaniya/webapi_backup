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
express.use(Express.static(__dirname));
// ** this is is client connection
const dbClient = knex(dbConfig);

const userController = require('./controller/users');
const itemController = require('./controller/items');
const bookingController = require('./controller/booking');

//items
express.post('/api/admin/items/add',itemController.add);
express.post('/api/item/upload',itemController.uploadImage);
express.delete('/api/items/delete/:id',itemController.remove);
express.put('/api/item/edit/:id',itemController.update);
express.get('/api/items/view', itemController.view);
express.get('/api/item/view/:id', itemController.viewItem);
// express.get('/api/item/view/:username', itemController.viewItembyusername);

//booking
express.post('/api/booking/add',bookingController.add);
express.delete('/api/booking/delete/:id',bookingController.remove);
express.put('/api/booking/edit/:id',bookingController.update);
express.get('/api/bookings/view', bookingController.view);
express.get('/api/booking/view/:id', bookingController.viewBooking);

//users
express.post('/api/user/login', userController.authentication); // 1
express.post('/api/user/register', userController.register);
express.get('/api/users/profile/:username', userController.details);
express.put('/api/users/profile/update/:username', userController.update);


// express.post('/api/users/profile/edit', userController.updatedetails);

//admin
express.get('/api/admin/users', userController.users);

// express.get('/api/users/:username',getUsername);
express.listen(8000, 'localhost', () => {
  console.log("Server is running at ", 8000)
})




