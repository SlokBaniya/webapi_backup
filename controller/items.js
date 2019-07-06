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


// ** this is is client connection
const itemsService = require('../service/items');


const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
      cb(
          null,
          file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
  }
});

const upload = multer({ storage }).single("image");
const uploadImage = (req, res) => {
  upload(req, res, err => {
      if (err) {
          res.json({ status: false, message: err.message });
      } else {
          res.json({ status: true, message: req.file.filename });
      }
  });
};

async function add(request, response){
      try {
    const itemsname = request.body.itemsname;
    const price = request.body.price;
    const category = request.body.category;
    const desc = request.body.desc;
    const image = request.body.image;
    const created_at = request.body.created_at;
    const updated_at = request.body.updated_at;

    
    const data = {itemsname,price,desc,image,category,created_at,updated_at};

      await itemsService.add(data);  
      response.json({
        status: true,
        success: true,
        message: "items added successfully."
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

////////////////
async function view(req, res) {
    try {
        const data = await dbClient.select('id', 'itemsname', 'category', 'price', 'desc', 'image', 'created_at','updated_at').table('items')
        res.json(data)
    } catch (error) {
        console.log(error);
        res.json({
            status: 'failed'
        })
    }
}
async function viewbyCategory(req, res) {
    try {
        const category = req.params.category;
        const data = await dbClient.select('id', 'title', 'content', 'author', 'category', 'image', 'CURRENT_TIMESTAMP').table('news').where({ category: category })
        res.json(data)
    } catch (error) {
        console.log(error);
        res.json({
            status: 'failed'
            
        })
    }
}


module.exports = {
  add,
  uploadImage,
  view
  }