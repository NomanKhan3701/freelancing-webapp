const { Schema, model } = require("mongoose");

var bidsSchema = new Schema({
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
  },
  amount: {
    type: Number,
    required: true,
  },
  file: {
    type: String,
  },
  image: {
    type: String,
  },
});

const Bid = new model("Bid", bidsSchema);

const doesUserExistWithBid = async (username, workId) => {
  const data = await Bid.find({ username: username, workId: workId });
  return data.length !== 0;
};

const getBids = async (workid) => {
  const data = await Bid.find({ workId: workid });
  return data;
};

const deleteBids = async (workId) => {
  await Bid.deleteMany({ workId: workId });
};

module.exports = { getBids, deleteBids, Bid, doesUserExistWithBid };

//1 insufficient data
//3 only 1 bid per user is allowed
//4 new bid added succesfully
