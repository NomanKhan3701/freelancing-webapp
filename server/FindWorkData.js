var mongoose = require("mongoose");
const { getWorkInProgressDataByUsername } = require("./WorkInProgressData");
const { getFreelancerAndProgress, addWorkProgress } = require("./workProgress");
const { ObjectId } = require("bson");
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
  workImage: {
    type: String,
  },
  image: {
    type: String,
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
  const {
    category,
    title,
    desc,
    qualifications,
    minBid,
    maxBid,
    username,
    image,
    workImage,
  } = data;
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
    image: image,
    workImage: workImage,
  });
  try {
    //dont remove the await, or use diff appraoch to get di there are,
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
      _id: 1,
      title: 1,
      desc: 1,
      username: 1,
      image: 1,
    }
  );
  let finalData = [];
  for (let i = 0; i < data.length; i++) {
    //when we use json.stringify in this case of JSON.stringify(data[i]._id) it returns string with "" and so
    //that caused all the mess
    const dat = await getFreelancerAndProgress(JSON.stringify(data[i]._id));
    finalData.push({ ...dat[0]._doc, ...data[i]._doc });
  }
  const moreData = await getWorkInProgressDataByUsername(username);
  return [...finalData, ...moreData];
};

const getWorkPostedDataById = async (id) => {
  const data = await FindWorkData.find(
    { _id: ObjectId(id) },
    {
      title: 1,
      desc: 1,
      username: 1,
      qualifications: 1,
      workImage: 1,
    }
  );
  return data;
};

const getWorkPostedDataByIdWithMoreData = async (id) => {
  const data = await FindWorkData.find(
    { _id: ObjectId(id) },
    {
      title: 1,
      desc: 1,
      username: 1,
      qualifications: 1,
      image: 1,
      workImage: 1,
    }
  );
  return data[0];
};

const updateBidCount = async (workId) => {
  let data = await FindWorkData.find({ _id: workId }, { numberOfBids: 1 });
  const filter = { _id: workId };
  data = data[0].numberOfBids;
  data = Number(data) + 1;
  const update = { numberOfBids: data };
  try {
    await FindWorkData.findOneAndUpdate(filter, update);
    return 4;
  } catch (error) {
    console.log("error");
    console.log(error);
    return 2;
  }
};

const updateCountForBid = async (workId) => {
  let data = await FindWorkData.find({ _id: workId }, { numberOfBids: 1 });
  const filter = { _id: workId };
  data = data[0].numberOfBids;
  data = Number(data) + 1;
  const update = { numberOfBids: data };
  try {
    await FindWorkData.findOneAndUpdate(filter, update);
    return 4;
  } catch (error) {
    console.log("error");
    console.log(error);
    return 2;
  }
};

const findWorkDataAndDelete = async (workId) => {
  //_id is the mongoose document id, and not id created by usm thats why while deleting we have to
  //use ObjectId function, than only it works,
  //while find() we dont need to do that well we can if we want
  const data = await FindWorkData.findOneAndDelete({ _id: ObjectId(workId) });
  return data;
};

const getNumberOfJobsPosted = async () => {
  const data = await FindWorkData.estimatedDocumentCount();
  return data;
};

module.exports = {
  getWorkData,
  addWorkData,
  getWorkFilterData,
  getWorkPostedDataByUsername,
  getWorkPostedDataById,
  updateBidCount,
  updateCountForBid,
  findWorkDataAndDelete,
  getNumberOfJobsPosted,
  getWorkPostedDataByIdWithMoreData,
};

//1 - insufficient data
//4 - successfully added the data

//2 failure
