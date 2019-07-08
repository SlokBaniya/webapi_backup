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
const multer = require("multer");
const path = require('path');

// ** this is is client connection
const bookingService = require('../service/booking');



async function add(request, response){
    try {
  const itemsname = request.body.itemsname;
  const itemId = request.body.itemId;
  const username = request.body.username;
  const userid = request.body.userid;
  const image = request.body.image;
  const created_at = request.body.created_at;
  const updated_at = request.body.updated_at;

  
  const data = {itemsname,itemId,username,userid,category,created_at,updated_at};

    await bookingService.add(data);  
    response.json({
      status: true,
      success: true,
      message: "booking successfully."
  })
} catch (error) {
  console.log(error);
  response.json({
      status: false,
      success: false,
      message: error.message
  });
}
}


async function view(req, res) {
  try {
      const data = await dbClient.select('id', 'itemsname', 'itemId', 'username', 'userid', 'created_at','updated_at').table('booking')
      res.json(data)
  } catch (error) {
      console.log(error);
      res.json({
          status: 'failed'
      })
  }
}
async function viewBooking(req, res) {
  try {
      const userid = req.params.userid;
      const data = await dbClient.select().table('booking').where({ userid: userid });
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
      const data = await dbClient.table('booking').where({ id: req.params.id }).delete();

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

async function update(req, res) {
  try {
    const itemsname = request.body.itemsname;
    const itemId = request.body.itemId;
    const username = request.body.username;
    const userid = request.body.userid;
    const image = request.body.image;
    const created_at = request.body.created_at;
    const updated_at = request.body.updated_at;
         
      
     
      const data = await dbClient.table('booking').where({ id: req.params.id }).update({ itemsname,itemId,username,userid,category,created_at,updated_at});

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
    add,
    
    view,
    viewBooking,
    update,
    remove
    }