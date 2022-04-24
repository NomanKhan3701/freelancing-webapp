var mongoose = require("mongoose");
const { getRatingForUsername } = require("./UserProfileData");

//requiring string field to not to be null or undefined
mongoose.Schema.Types.String.checkRequired((v) => typeof v === "string");

var findTalentDataSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
    unique: true,
  },
  qualifications: {
    type: [String],
    required: true,
  },
  perHourRate: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    default: 0,
  },
  username: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
});

const findTalentFilterDataSchema = new mongoose.Schema({
  category: {
    type: Object,
    unique: true,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
    unique: true,
  },
});

const FindTalentFilterData = new mongoose.model(
  "FindTalentFilterData",
  findTalentFilterDataSchema
);
const FindTalentData = new mongoose.model(
  "FindTalentData",
  findTalentDataSchema
);

const getTalentData = async () => {
  const data = await FindTalentData.find({});
  return data;
};
const getTalentDataUsernameOnly = async () => {
  const data = await FindTalentData.find({}, { username: 1, _id: false });
  return data;
};

const getTalentFilterData = async () => {
  const data = await FindTalentFilterData.find({});
  return data;
};

const addTalentData = async (data) => {
  //user posting this information
  const {
    category,
    title,
    desc,
    qualifications,
    perHourRate,
    price,
    username,
  } = data;
  if (title.length < 10 || desc.length < 30 || qualifications.length < 1) {
    return 1;
  }

  const rating = await getRatingForUsername(username);

  const hasUserPostedTalentBeforeInSameCategory = await FindTalentData.find({
    username: username,
    category: category,
  });

  if (hasUserPostedTalentBeforeInSameCategory.length !== 0) {
    return 3;
  }

  const newTalentData = new FindTalentData({
    title: title,
    desc: desc,
    qualifications: qualifications,
    category: category,
    perHourRate: perHourRate,
    price: price,
    username: username,
    rating: rating,
  });

  try {
    newTalentData.save();
  } catch (err) {
    console.log(err);
  }
  return 4;
};

module.exports = {
  getTalentData,
  addTalentData,
  getTalentFilterData,
  getTalentDataUsernameOnly,
};

//1 - insufficient data
//4 - successfully added the data
//3 - user alredy posted talent in this category
