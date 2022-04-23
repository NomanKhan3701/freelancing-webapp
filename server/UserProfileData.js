const { updateUserDataTaken } = require("./database");

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
  },
  linkdin: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  category: {
    type: Array,
    default: [],
  },
  skills: {
    type: Array,
    default: [],
  },
  rating: {
    type: Number,
    default: 0,
  },
  freelanceWorkCount: {
    type: Number,
    default: 0,
  },
  joiningDate: {
    type: String,
    default: new Date(),
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

const getUserImage = async (username) => {
  const data = await UserProfileData.find({ username: username }, { image: 1 });
  if (data.length === 0) {
    return "";
  }
  return data[0];
};

const getUserProfileDataUsingUsername = async (username) => {
  const data = await UserProfileData.find({ username: username });
  if (data.length === 0) {
    return 0;
  }
  return data[0];
};

const addUserProfile = async (data) => {
  const { username, fullname, desc, email, linkdin, image, skills, category } =
    data;
  const newUser = new UserProfileData({
    fullname: fullname,
    username: username,
    desc: desc,
    email: email,
    linkdin: linkdin,
    image: image,
    skills: skills,
    category: category,
  });
  try {
    newUser.save();
    await updateUserDataTaken(username, true);
    return 1;
  } catch (error) {
    console.log(error);
    return 2;
  }
};

const getRating = async (username) => {
  const data = await UserProfileData.find({ username: username }).select(
    "username"
  );
  return data;
};

const setRating = async (username, rating) => {
  const filter = { username: username };
  const update = { rating: rating };
  try {
    await Character.findOneAndUpdate(filter, update);
  } catch (error) {
    return 2;
  }
  return 1;
};

const setFreelanceWorkCountAndRating = async (username, rating, count) => {
  const filter = { username: username };
  const update = { rating: rating, freelanceWorkCount: count };
  try {
    await UserProfileData.findOneAndUpdate(filter, update);
    return 1;
  } catch (error) {
    return 2;
  }
};

const getRatingForUsername = async (username) => {
  const rating = UserProfileData.find({ username: username }, { rating: 1 });
  return rating[0];
};

module.exports = {
  addUserProfile,
  getRating,
  setRating,
  getUserProfileDataUsingId,
  getUserProfileDataUsingUsername,
  getRatingForUsername,
  getUserImage,
  setFreelanceWorkCountAndRating,
};

//0 no user with that user id,
//1 success in adding new user or just success
//2 error in adding new user or just error
