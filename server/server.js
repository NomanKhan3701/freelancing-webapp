const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose"); 
const cors = require("cors");

var fs = require('fs');
var path = require('path');
require("dotenv/config");

// set up multer for storing uploaded files image upload database
var multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({ storage: storage });
var categoryImgModel = require('./categoryData');
var findWorkDataModel = require('./FindWorkData');

const corsOptions = {
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

const {createNewUser, isValidUser} = require("./database.js");
const { json } = require("body-parser");
const { log } = require("console");

app.use(cors(corsOptions)) // Use this after the variable declaration
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
app.use(bodyParser.json());

app.post("/post", (req, res, err) => {
});

app.post("/login", (req, res, err) => {
  const result = isValidUser(req.body);
  //send to react the result code
});

app.get('/findtalent', (req, res, err) => {
  if(err){
    console.log(err);
  }
  categoryImgModel.find({}, (error, items) => {
    if (error) {
      console.log(error);
      res.status(500).send('An error occurred', err);
    }
    else {
      res.send({ items: items });
    }
  });
});

app.get('/findwork', (req, res, err) => {
  if(err){
    console.log(err);
  }
  const findWorkData = findWorkDataModel.FindWorkData;
  findWorkData.find({}, (error, items) => {
    if (error) {
      console.log(error);
      res.status(500).send('An error occurred', err);
    }
    else {
      res.send({ items: items });
    }
  });
});


app.post("/signup", (req, res, err) => {
  if(err){
    //
  }
  //user exist or user dont exist
  let result;
  try{
    result = createNewUser(req.body);
    res.send({result: result});
  }catch(error){    
    console.log("some error");
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
