var mongoose = require("mongoose");

var WebsiteFeedbackSchema = new mongoose.Schema({
  username: {
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
  },
  date: {
    type: Date,
    default: Date.now,
  },
  votes: {
    type: Number,
    default: 0,
  },
  votedUsers: {
    type: Array,
    default: [],
  },
});

const WebsiteFeedback = new mongoose.model(
  "WebsiteFeedback",
  WebsiteFeedbackSchema
);

const addWebsiteFeedback = async (data) => {
  const { username, title, desc } = data.data;
  const ralatedtdData = await WebsiteFeedback.find({
    title: title,
    desc: desc,
  });
  if (ralatedtdData.length > 0) {
    return 2;
  }
  const newData = new WebsiteFeedback({
    username: username,
    title: title,
    desc: desc,
  });
  try {
    newData.save();
  } catch (error) {
    console.log(error);
  }
  return 4;
};

const getWebsiteFeedbacks = async () => {
  const data = await WebsiteFeedback.find({});
  return data;
};

const incrementVoteForWebsiteFeedback = async (data) => {
  const { title, username, desc } = data;
  const reqData = await WebsiteFeedback.find(
    { title: title, desc: desc },
    { votes: 1, votedUsers: 1 }
  );
  const filter = { title: title, desc: desc };
  const arr = reqData[0].votedUsers;
  if (!arr.includes("username")) {
    arr.push(username);
  }
  const update = {
    votes: reqData[0].votes + 1,
    votedUsers: arr,
  };
  try {
    await WebsiteFeedback.findOneAndUpdate(filter, update);
  } catch (error) {
    console.log(error);
    return 2;
  }
  return 4;
};

module.exports = {
  addWebsiteFeedback,
  getWebsiteFeedbacks,
  incrementVoteForWebsiteFeedback,
};

//2 error
//4 success
