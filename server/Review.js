var mongoose = require("mongoose");

//requiring string field to not to be null or undefined
mongoose.Schema.Types.String.checkRequired((v) => typeof v === "string");

var ReviewSchema = new mongoose.Schema({
  workId: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  clientUsername: {
    type: String,
    required: true,
  },
  freelancerUsername: {
    type: String,
    required: true,
  },
  forClient: {
    type: Object,
  },
  forFreelancer: {
    type: Object,
  },
});

const Review = new mongoose.model("Review", ReviewSchema);

const getReviewForWorkId = async (id) => {
  const data = await Review.find({ workId: id });
  if (data.length === 0) {
    return 0;
  }
  return data[0];
};

const addReview = (data) => {
  const {
    workId,
    clientUsername,
    freelancerUsername,
    forClient,
    forFreelancer,
  } = data;
  const newReview = new Review({
    workId: workId,
    clientUsername: clientUsername,
    freelancerUsername: freelancerUsername,
    forClient: forClient,
    forFreelancer: forFreelancer,
  });
  try {
    newReview.save();
    return 1;
  } catch (error) {
    console.log(error);
    return 2;
  }
};
module.exports = { addReview, getReviewForWorkId };

//0 no user with that user id,
//1 success in adding new review
//2 error in adding new review
