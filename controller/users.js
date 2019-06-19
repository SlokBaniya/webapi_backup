const bcrypt = require('bcrypt');
const Express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// connection factory
const knex = require('knex');
const dbConfig = require('./../knexfile');
const jwt = require('jsonwebtoken');

// create an express instance
const express = new Express();
express.use(cors());
express.use(bodyParser.json());

// ** this is is client connection
const userService = require('../service/users');




async function register(request, response){
      try {
    
    const fullname = request.body.fullname;
    const username = request.body.username;
    const password = request.body.password;
    const address = request.body.address;
    const contact = request.body.contact;
    const gender = request.body.gender;
    

    const hashedPassword = bcrypt.hashSync(password, 10); 

      await userService.register(fullname,username,hashedPassword,address,contact,gender);  
      response.json({
        status: 'success'        
      })
  }catch(error) {
    response.json({        
      status: 'fail'    
    })
  }
}
async function authentication(request, response){
  try{
    const username = request.body.username;
    const password = request.body.password;
    const hashedPassword = bcrypt.hashSync(password, 10);

    await userService.authentication(username,password);  


  }catch(error){
      console.log(error)

  }
}


module.exports = {
  register
  }