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

<<<<<<< HEAD



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
=======
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
>>>>>>> 0833f4a03ec4a0dd7b9e4e5bd3a04c1734ad66c4
      response.json({
        status: 'success'        
      })
  }catch(error) {
<<<<<<< HEAD
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
=======
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
>>>>>>> 0833f4a03ec4a0dd7b9e4e5bd3a04c1734ad66c4


module.exports = {
  register
  }