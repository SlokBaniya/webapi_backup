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
    const address = request.body.address; 
    const contact = request.body.contact; 
    const gender = request.body.gender; 
    const username = request.body.username;
    const password = request.body.password;
    const hashedPassword = bcrypt.hashSync(password, 10); 
    const data = {fullname,address,contact,gender,username,hashedPassword}

      await userService.register(data);  
      response.json({
        status: 'success'        
      })
  }catch(error) {
    console.log(error)
    response.json({        
      status: 'fail'
          
    })
    
  }
}
// async function authentication(request, response){
//   try{
//     const username = request.body.username;
//     const password = request.body.password;
//     const hashedPassword = bcrypt.hashSync(password, 10);

//     await userService.authentication(username,password);  
//     data => {
//         if (!data) {
//           response.json({
//             status: 'fail',
//             message: 'User not found.'
//           })
//         } else {
//           const password = data.password;
//           const isMatch = bcrypt.compareSync(passwordFromJSON, password);
//           if (isMatch) {
//             // password matched
//             response.json({
//               status: 'success',
//               accessToken: jwt.sign({
//                 username: username
//               }, 'secret_key')
//             })
//           } else {
//             response.json({
//               status: 'fail',
//               message: 'user not authenticated'
//             })
//           }
//         }
        
//       }


//   }catch(error){
//     console.log(error)

//   }
// }


module.exports = {
  register
  }