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
  const { title, username, desc, votes } = data;
  const filter = { title: title, username: username, desc: desc };
  const update = {
    votes: votes + 1,
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
