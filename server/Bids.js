const { updateBidCount, updateCountForBid } = require("./FindWorkData");
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
});

const Bid = new model("Bid", bidsSchema);

const addBid = async (data) => {
  const { workId, username, desc, amount } = data;
  if (!workId || !username || !desc || !amount || desc.length < 100) {
    return 1;
  }
  const isTrue = await doesUserExistWithBid(username, workId);

  if (isTrue) {
    return 3;
  }
  const newBid = new Bid({
    workId: workId,
    username: username,
    desc: desc,
    amount: amount,
  });
  try {
    newBid.save();
    // await updateBidCount(workId);
    await updateCountForBid(workId);
    return 4;
  } catch (err) {
    console.log(err);
  }
};

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

module.exports = { getBids, addBid, deleteBids };

//1 insufficient data
//3 only 1 bid per user is allowed
//4 new bid added succesfully
