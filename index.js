const Express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('./knexfile');
//connection factory
const dbClient = knex(config);

const express = new Express();
express.use(bodyParser.json());



function authenticate(request, response) {

  
    const username = request.body.username;
    const passwordFromJSON = request.body.password;
    
  
    dbClient
      .table('users')
      .first('password')
      .where('username', username)
      .then(data => {
        if (!data) {
          response.json({
            status: 'fail',
            message: 'User not found.'
          })
        } else {
          const password = data.password;
          const isMatch = bcrypt.compareSync(passwordFromJSON, password);
          if (isMatch) {
            // password matched
            response.json({
              status: 'success',
              accessToken: jwt.sign({
                username: username
              }, 'secret_key')
            })
          } else {
            response.json({
              status: 'fail',
              message: 'user not authenticated'
            })
          }
        }
        
      })
      .catch(error => {
        response.json({
          status: 'fail',
        })
      })
  }
function createContactHandler(req,res){
    dbClient('users')
    .insert({
       
        username :req.body.username,
        password :req.body.password
    })
    .then(val => {
        res.json({
            status :'success'
        })

    })
    .catch(error =>{
        res.json({
            status:"failed"
        })
    })
    
   
}

function getContacts(req,res){
    dbClient.select("*")
    .table('users')
    .then(data=>{
       res.json({
         status:'ok',
         data:data,
          error:false
       })
    })
    
    .catch(error=>{
        console.log(error);
        res.json({
            status:'failed'
        })
    })
 }
 
function registerUser(request, response) {
    const username = request.body.username;
    const password = request.body.password;
    // const imageFile = request.body.imageFile;
  
    const hashedPassword = bcrypt.hashSync(password, 10);
    dbClient
      .table('users')
      .insert({
        username: username,
        password: hashedPassword
        // imageFile: imageFile
      })
      .then(data => {
        response.json({
          status: 'success',
          data: {
            username: username,
          }
        })
      })
      .catch(error => {
        response.json({
          status: 'fail',
          data:'error'
        })
      })
  }
  function insertImage(req,res){
    const imageFile = req.body.imageFile;

    
    dbClient
      .table('imagefile')
      .insert({
        
        imageFile: imageFile
      })
      .then(data => {
        response.json({
          status: 'success',
          data: {
           imageFile : imageFile,
           destination: "./public/uploads",
          }
        })
      })
      .catch(error => {
        response.json({
          status: 'fail',
        })
      })
  }
  express.post('/api/register', registerUser);
 express.post('/api/auth', authenticate);
express.post('/api/contacts', createContactHandler);
express.get('/api/contacts', getContacts);
express.post('/api/image',insertImage);

express.listen(8000,'localhost',function(){
    console.log('server is running on port 8000')
})