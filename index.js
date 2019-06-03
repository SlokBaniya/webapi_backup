const Express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// connection factory
const knex = require('knex');

const dbConfig = require('./knexfile');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// create an express instance
const express = new Express();

express.use(cors());
express.use(bodyParser.json());

// ** this is is client connection
const dbClient = knex(dbConfig);


function sendHealthStatus(req, resp) {
  resp.json({
    status: 'ok'
  })
  
}

function getVersion(req, res) {
  // send me a version
  res.json({version: '0.0.0'});           
}
function registerUser(request, response) {
  const fname = request.body.fname;
  const lname = request.body.lname;
  const username = request.body.username;
  const Password = request.body.password;

  const password = bcrypt.hashSync(Password, 10);
  dbClient
    .table('users')
    .insert({fname,lname,username,password})
    .then(data => {
      response.json({
        
        status: 'success',
        message : 'registration successful',
        
      })  
    })
    .catch(error => {
      
      response.json({
        status: 'fail',
      })
    })
}

// create a auth handler
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

async function getUsers(request, response) {
  try{
  const data = await dbClient.table('users').select('username','password')
        response.json({
        status: 'success',
        data: data
     
    })
  } catch(error){
    
    response.json({
      status: 'failed',
      message : error
   
  })

  }
}

async function getUsername(request,response){
  
  try{
    const user = request.params.username;
    
    const data = await dbClient.table('users').select('username','password').where("username",user);
    if(data==null){
      response.json({
        status: 'failed',
        data: data,
      message : "No user found"
     
    })
    }else{
    response.json({
      status: 'success',
      data: data
   
  })}
} catch(error){
  console.log(error)
  
  response.json({

    status: 'failed22',
    message : error
 
})

}

  }
  


express.get('/api/health', sendHealthStatus)
express.get('/api/version', getVersion)
express.post('/api/auth', authenticate); // 1
express.post('/api/register', registerUser);
express.get('/api/users', getUsers)
express.get('/api/users/:username',getUsername);

express.listen(8000, 'localhost', () => {
  console.log("Server is running at ", 8000)
})


// migration in knex

