var mongoose = require("mongoose");

//requiring string field to not to be null or undefined
mongoose.Schema.Types.String.checkRequired((v) => typeof v === "string");

var UserProfileDataSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  linkdin: {
    type: String,
    unique: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  skills: {
    type: Array,
    default: [],
  },
  rating: {
    type: Number,
    default: 0,
  },
});

const UserProfileData = new mongoose.model(
  "UserProfileData",
  UserProfileDataSchema
);

// const addCommentToWorkBid = (data) => {
//   //user posting this information
//   const { workId, username, desc } = data;
//   if (desc.length < 20) {
//     return 1;
//   }
//   const newComment = new WorkBidCommentsData({
//     workId: workId,
//     username: username,
//     desc: desc,
//   });
//   try {
//     newComment.save();
//   } catch (err) {
//     console.log(err);
//   }
//   return 4;
// };

// const getWorkBidCommentsData = async (workId) => {
//   const data = WorkBidCommentsData.find({ workId: workId });
//   return data;
// };

const getUserProfileDataUsingId = async (id) => {
  const data = await UserProfileData.find({ _id: id });
  if (data.length === 0) {
    return 0;
  }
  return data[0];
};

const addUserProfile = (data) => {
  const { username, fullname, desc, email, linkdin, image, skills } = data;
  const newUser = new UserProfileData({
    fullname: fullname,
    username: username,
    desc: desc,
    email: email,
    linkdin: linkdin,
    image: image,
    skills: skills,
  });
  try {
    newUser.save();
    return 1;
  } catch (error) {
    console.log(error);
    return 2;
  }
};
module.exports = { getWorkBidCommentsData, addCommentToWorkBid };

//0 no user with that user id,
//1 success in adding new user
//2 error in adding new user
