const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const saltRounds = 10


mongoose.connect("mongodb+srv://admin-shreyash:Shrey%40sh22mar@cluster0.pcdxk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", 
    {useNewUrlParser: true});

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
    const user = this
  
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

const createNewUser = (data) => {
    let username = data.username;
    let userExistWithUsername = doesUsernameExist(email);
    if(userExistWithUsername){
        return false;
    }
    const newUser = new UserSignUp({
        username: data.username,
        password: data.password
    });
    newUser.save();
    return true;
}
