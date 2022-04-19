const mongoose = require("mongoose");
const {
  setFreelanceWorkCount,
  setFreelanceWorkCountAndRating,
} = require("./UserProfileData");

const FeedbackSchema = new mongoose.Schema({
  freelancer: {
    type: String,
    required: true,
  },
  client: {
    type: String,
    required: true,
  },
  workId: {
    type: String,
    required: true,
    unique: true,
  },
  ratingToFreelancer: {
    type: Number,
    required: true,
  },
  ratingToClient: {
    type: Number,
    required: true,
    default: 1,
  },
  feedbackToFreelancer: {
    type: String,
    required: true,
  },
  feedbackToClient: {
    type: String,
    required: true,
    default: "no feedback given",
  },
});

const FeedbackData = new mongoose.model("FeedbackData", FeedbackSchema);

const addFeedbackStart = async (data) => {
  const { workId, client, rating, feedback, freelancer } = data;
  const newFeedback = new FeedbackData({
    workId: workId,
    client: client,
    ratingToFreelancer: rating,
    feedbackToFreelancer: feedback,
    freelancer: freelancer,
  });
  try {
    await newFeedback.save();
    const ratings = await FeedbackData.find(
      { username: freelancer },
      { ratingToFreelancer: 1 }
    );
    const count = ratings.length;
    let sum = 0;
    for (let i = 0; i < ratings.length; i++) {
      sum += ratings[i].ratingToFreelancer;
    }
    setFreelanceWorkCountAndRating(freelancer, sum / count, count);
  } catch (error) {
    console.log(error);
    return 2;
  }
  return 4;
};

const updateFeedbackFromFreelancer = async (data) => {
  const { workId, rating, feedback } = data;
  const filter = { workId: workId };
  const update = {
    ratingToClient: rating,
    feedbackToClient: feedback,
  };
  try {
    await FeedbackData.findOneAndUpdate(filter, update);
  } catch (error) {
    console.log(error);
    return 2;
  }
  return 4;
};
module.exports = { addFeedbackStart, updateFeedbackFromFreelancer };
