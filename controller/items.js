const bcrypt = require('bcrypt');
const Express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
// connection factory
const knex = require('knex');
const dbConfig = require('./../knexfile');
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
    
    const data = {itemsname,price,category,desc,image,category};

      await userService.register(data);  
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



module.exports = {
  add,
  uploadImage
  }