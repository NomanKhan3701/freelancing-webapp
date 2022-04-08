var mongoose = require("mongoose");
const { getFreelancerAndProgress } = require("./workProgress");

//requiring string field to not to be null or undefined
mongoose.Schema.Types.String.checkRequired((v) => typeof v === "string");

var findWorkDataSchema = new mongoose.Schema({
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
  minBid: {
    type: Number,
    required: true,
    default: 0,
  },
  maxBid: {
    type: Number,
    required: true,
    default: 0,
  },
  numberOfBids: {
    type: Number,
    required: true,
    default: 0,
  },
  username: {
    type: String,
    required: true,
  },
});

const findWorkFilterDataSchema = new mongoose.Schema({
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

const FindWorkFilterData = new mongoose.model(
  "FindWorkFilterData",
  findWorkFilterDataSchema
);
const FindWorkData = new mongoose.model("FindWorkData", findWorkDataSchema);

const getWorkData = async () => {
  const data = await FindWorkData.find({});
  return data;
};

const getWorkFilterData = async () => {
  const data = await FindWorkFilterData.find({});
  return data;
};

const addWorkData = (data) => {
  //user posting this information
  const { category, title, desc, qualifications, minBid, maxBid, username } =
    data;
  if (title.length < 10 || desc.length < 30 || qualifications.length < 1) {
    return 1;
  }
  const newWorkData = new FindWorkData({
    title: title,
    desc: desc,
    qualifications: qualifications,
    category: category,
    minBid: minBid,
    maxBid: maxBid,
    username: username,
  });
  try {
    newWorkData.save();
  } catch (err) {
    console.log(err);
  }
  return 4;
};

const getWorkPostedDataByUsername = async (username) => {
  const data = await FindWorkData.find(
    { username: username },
    {
      _id: 1,
      title: 1,
      desc: 1,
      username: 1,
    }
  );
  let finalData = [];
  for (let i = 0; i < data.length; i++) {
    const dat = await getFreelancerAndProgress(data[i]._id);
    finalData.push({ ...data[i], ...dat });
  }
  return finalData;
};

const getWorkPostedDataById = async (id) => {
  const data = await FindWorkData.find(
    { _id: id },
    {
      title: 1,
      desc: 1,
      username: 1,
    }
  );
  return data;
};

module.exports = {
  getWorkData,
  addWorkData,
  getWorkFilterData,
  getWorkPostedDataByUsername,
  getWorkPostedDataById,
};

//1 - insufficient data
//4 - successfully added the data
