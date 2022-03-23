const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose"); 
const cors = require("cors");
const corsOptions = {
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

const {createNewUser, isValidUser} =   require("./database.js");
const { json } = require("body-parser");

app.use(cors(corsOptions)) // Use this after the variable declaration
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/../client/public/index.html");
//  });
   
app.post("/post", (req, res, err) => {
});

app.post("/login", (req, res, err) => {
  const result = isValidUser(req.body);
  //send to react the result code
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
