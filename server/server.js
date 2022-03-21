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
//
app.use(cors(corsOptions)) // Use this after the variable declaration
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
  
app.post("/post", (req, res, err) => {
    console.log(123);
    console.log(req.body);
});

app.post("/login", (req, res, err) => {
  
});

app.post("/signup", (req, res, err) => {
  //user exist or user dont exist
  let val = signupDatabase()
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
