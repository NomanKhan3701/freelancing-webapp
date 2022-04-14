var mongoose = require("mongoose");

//requiring string field to not to be null or undefined
mongoose.Schema.Types.String.checkRequired((v) => typeof v === "string");

var WorkBidCommentsDataSchema = new mongoose.Schema({
  workId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
    unique: true,
  },
  time: {
    type: Number,
    default: new Date().getTime(),
  },
  image: {
    type: String,
  },
});

const WorkBidCommentsData = new mongoose.model(
  "WorkBidCommentsData",
  WorkBidCommentsDataSchema
);

const addCommentToWorkBid = (data) => {
  //user posting this information
  const { workId, username, desc, image } = data;
  if (desc.length < 20) {
    return 1;
  }
  const newComment = new WorkBidCommentsData({
    workId: workId,
    username: username,
    desc: desc,
    image: image,
  });
  try {
    newComment.save();
  } catch (err) {
    console.log(err);
  }
  return 4;
};

const getWorkBidCommentsData = async (workId) => {
  const data = WorkBidCommentsData.find({ workId: workId });
  return data;
};
module.exports = { getWorkBidCommentsData, addCommentToWorkBid };

//1 - insufficient data
//4 - successfully added the data
