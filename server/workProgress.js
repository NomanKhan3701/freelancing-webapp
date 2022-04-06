var mongoose = require("mongoose");

//requiring string field to not to be null or undefined
mongoose.Schema.Types.String.checkRequired((v) => typeof v === "string");

var workProgressSchema = new mongoose.Schema({
  workId: {
    type: String,
    required: true,
    unique: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
  },
  moneyExchanged: {
    type: Object,
    required: true,
  },
});

const WorkProgress = new mongoose.model("WorkProgress", workProgressSchema);

const getWorkProcess = async (id) => {
  const data = await WorkProgress.find({ workId: id });
  if (data.length === 0) {
    return 0;
  }
  return data[0];
};

const addWorkProgress = (data) => {
  const { workId, startDate, endDate, moneyExchanged } = data;
  const newWorkProgress = new WorkProgress({
    workId: workId,
    startDate: startDate,
    endDate: endDate,
    moneyExchanged: moneyExchanged,
  });
  try {
    newWorkProgress.save();
    return 1;
  } catch (error) {
    console.log(error);
    return 2;
  }
};
module.exports = { addWorkProgress, getWorkProcess };

//0 no user with that user id,
//1 success in adding new review
//2 error in adding new review
