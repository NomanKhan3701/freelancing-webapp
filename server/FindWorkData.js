var mongoose = require("mongoose");
const { getWorkInProgressDataByUsername } = require("./WorkInProgressData");
const { getFreelancerAndProgress, addWorkProgress } = require("./workProgress");

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

const addWorkData = async (data) => {
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
    await newWorkData.save();
  } catch (err) {
    console.log(err);
    return 2;
  }
  const someData = await FindWorkData.find(
    { username: username, title: title, desc: desc, category: category },
    { _id: 1 }
  );
  addWorkProgress({ workId: someData[0]._id });
  return 4;
};

const getWorkPostedDataByUsername = async (username) => {
  const data = await FindWorkData.find(
    { username: username },
    {
      workId: 1,
      title: 1,
      desc: 1,
      username: 1,
    }
  );
  let finalData = [];
  for (let i = 0; i < data.length; i++) {
    const dat = await getFreelancerAndProgress(data[i]._doc._id);
    //order of opening the doc matter as both have _id, second one will be considered
    finalData.push({ ...dat[0]._doc, ...data[i]._doc });
  }
  const moreData = await getWorkInProgressDataByUsername(username);

  return [...finalData, ...moreData];
};

const getWorkPostedDataById = async (id) => {
  console.log("AMIGOS");
  const data = await FindWorkData.find(
    { _id: id },
    {
      title: 1,
      desc: 1,
      username: 1,
      qualifications: 1,
    }
  );
  return data;
};

const updateBidCount = async (workId) => {
  let data = await FindWorkData.find({ _id: workId }, { numberOfBids: 1 });
  const filter = { _id: workId };
  data = data[0].numberOfBids;
  data = Number(data) + 1;
  const update = { numberOfBids: data };
  try {
    await FindWorkData.findOneAndUpdate(filter, update);
    console.log(workId);
    return 4;
  } catch (error) {
    console.log("error");
    console.log(error);
    return 2;
  }
};

const findWorkDataAndDelete = async (workId) => {
  const data = await FindWorkData.findOneAndDelete({ _id: workId });
  return data;
};

module.exports = {
  getWorkData,
  addWorkData,
  getWorkFilterData,
  getWorkPostedDataByUsername,
  getWorkPostedDataById,
  updateBidCount,
  findWorkDataAndDelete,
};

//1 - insufficient data
//4 - successfully added the data

//2 failure
