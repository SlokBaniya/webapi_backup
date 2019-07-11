const bcrypt = require('bcrypt');
const Express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// connection factory
const knex = require('knex');
const dbConfig = require('./../knexfile');
const dbClient = knex(dbConfig);
const jwt = require('jsonwebtoken');
// create an express instance
const express = new Express();
express.use(cors());
express.use(bodyParser.json());
// ** this is is service connection
const userService = require('../service/users');


async function register(request, response) {
  try {
    const fullname = request.body.fullname;
    const address = request.body.address;
    const contact = request.body.contact;
    const gender = request.body.gender;
    const username = request.body.username;
    const password = request.body.password;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const data = { fullname, address, contact, gender, username, hashedPassword }
    

    await userService.register(data);
    response.json({
      status: 'success',
      success:true,
      message:"Account Created"

    })
  } catch (error) {
    console.log(error)
    response.json({
      status: 'fail',
      success: false,
      message: 'registration failed',
      error: '808'

    })

  }
}
async function authentication(request, response) {
  try {
    const username = request.body.username;
    const password = request.body.password;

    const hashedPassword = await userService.authenticate(username);
    // console.log(hashedPassword.password);
    if (!hashedPassword) {
      response.json({
        status: false,
        message: 'User not found'
      })
    } else {
      const isMatch = bcrypt.compareSync(password, hashedPassword.password);
      if (isMatch) {
        // password matched
        response.json({

          success: true,
          status: true,
          message: 'authorized',
          accessToken: jwt.sign({
            username: username
          }, 'secret_key')
        })
      } else {
        response.json({
          status: false,
          success: false,
          message: 'unauthorized'
        })
      }
    }
  } catch (error) {
    response.json({
      status: false,
      success: false,
      message: 'User Authentication failed',
      error: error.message
    })
  }
}
async function details(req, res) {
  try {
    const username = req.params.username;
    const data = await dbClient.table('users').select('fullname', 'username', 'address', 'contact').where("username",username);
    res.json(data[0]);
} catch (error) {
    console.log(error);
    res.json({
        status: 'failed'
    })
}
}

async function remove(req, res) {
  try {
      const data = await dbClient.table('users').where({ id: req.params.id }).delete();

      res.json({
          status: 'success',
          success: true,
          message: 'delete success'
      })
  } catch (error) {
      console.log(error)
      res.json({
          success: false,
          status: 'fail',
          message: 'failed to delete' 
      })
  }
}
async function users(request, response) {
  try {
    const data = await dbClient.select('id', 'fullname', 'address','contact', 'username', 'password', 'gender').table('users');
        
    response.json({
        status: 'ok',
        data: data,
        error: 'false'
    })
} catch (error) {
    console.log(error);
    response.json({
        status: 'failed'
    })
}
}
////////////////////////
async function update(req, res) {
  try {
      const fullname = req.body.fullname;
      const address = req.body.address;
      const contact = req.body.contact     
      const passwordBody = req.body.password;

      const password = bcrypt.hashSync(passwordBody, 10);
      const data = await dbClient.table('users').where({ username: req.params.username }).update({ fullname, address, contact, password });

      res.json({
          status: 'success',
          success: true,
          message: 'update success'
      })
  } catch (error) {
      console.log(error)
      res.json({
          success: false,
          status: 'fail',
          message: 'failed to update'
      })
  }
}


module.exports = {
  register,
  authentication,
  details,
  users,
  update
}