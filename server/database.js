require("dotenv/config");

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const saltRounds = 10

mongoose.connect(process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true }, err => {
      console.log('connected')
  });
const userSignUpSchema = new mongoose.Schema({
    username: {
            type : String,
            required : true,
            unique : true 
          },
    password: {
        type : String
    }
});

userSignUpSchema.pre("save", function (next) {
  
    const user = this;
  
    if (this.isModified("password") || this.isNew) {
      bcrypt.genSalt(saltRounds, function (saltError, salt) {
        if (saltError) {
          return next(saltError)
        } else {
          bcrypt.hash(user.password, salt, function(hashError, hash) {
            if (hashError) {
              return next(hashError)
            }
  
            user.password = hash
            next()
          })
        }
      })
    } else {
      return next()
    }
  })

const UserSignUp = mongoose.model("UserSignUp", userSignUpSchema);

var createNewUser = (data) => {

    let username = data.username;
    let userExistWithUsername = doesUsernameExist(username);
    if(userExistWithUsername === 1){
        if(data.password === ""){
          return 3;
        }
        return 1;
    }
    const newUser = new UserSignUp({
        username: data.username,
        password: data.password
    });
    try{
      newUser.save();
      return 4;
    }catch(error){
      console.log(error);
    }
    return 0;
}

const doesUsernameExist = async (username) => {
  
  const wait = await UserSignUp.find({username: username}, function(err, users){
    if(err)
        console.log(err);
    if(users.length == 0){
      return 2;
    }
    return 1;
  });             
}

const isValidUser = async (user) => {
  console.log("amigos");
  let result;
  const {username, password} = user;
  const data = await UserSignUp.find({username: username, password: password}, function(err, users){
    if(err)
        console.log(err);
    if(users.length == 0){
      if(doesUsernameExist(username) === 1){
        result = 5;
      }
      result = 2;
    }
    result = 6;
  });
  console.log("result : " + result);
  return result;
}

module.exports = {createNewUser, isValidUser, UserSignUp}

//0 something wrong with database
//1 user exist with username
//2 user doesnt exist with username
//3 user exist with username and google SIGN UP trying, 
//do login directly for him,
//4 user didnt exist created succesfully new user
//5 username matched but not password
//6 username and password matched