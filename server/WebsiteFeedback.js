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
    type: String,
    default: new Date(),
  },
  image: {
    type: String,
  },
  votes: {
    type: Number,
    default: 0,
  },
});

const WebsiteFeedback = new mongoose.model(
  "WebsiteFeedback",
  WebsiteFeedbackSchema
);

const addWebsiteFeedback = (data) => {
  const { username, title, desc, image } = data.data;
  const newData = new WebsiteFeedback({
    username: username,
    title: title,
    desc: desc,
    image: image,
  });
  try {
    newData.save();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addWebsiteFeedback,
};
