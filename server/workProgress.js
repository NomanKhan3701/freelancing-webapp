var mongoose = require("mongoose");
const { getWorkPostedDataById } = require("./FindWorkData");

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
  },
  endDate: {
    type: String,
  },
  moneyExchanged: {
    type: Object,
  },
  progress: {
    type: String,
    default: "not started",
  },
  freelancer: {
    type: String,
    default: "not selected",
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
  const { workId, startDate, endDate, moneyExchanged, progress, freelancer } =
    data;
  const newWorkProgress = new WorkProgress({
    workId: workId,
    startDate: startDate,
    endDate: endDate,
    moneyExchanged: moneyExchanged,
    progress: progress,
    freelancer: freelancer,
  });
  try {
    newWorkProgress.save();
    return 1;
  } catch (error) {
    console.log(error);
    return 2;
  }
};

const getFreelancerWorkByUsername = async (username) => {
  const data = await WorkProgress.find(
    { freelancer: username },
    { workId: 1, progress: 1 }
  );
  if (data.length === 0) {
    return [];
  } else {
    const freelancerWork = [];
    for (let i = 0; i < data.length; i++) {
      try {
        const dat = await getWorkPostedDataById(data[i].workId);
        freelancerWork.push({ ...data[i], ...dat });
      } catch (error) {
        console.log(error);
      }
    }
    return freelancerWork;
  }
};

const getFreelancerAndProgress = async (workId) => {
  const data = await WorkProgress.find(
    { workId: workId },
    { progress: 1, freelancer: 1 }
  );

  return data;
};

const updateWorkProgress = async (workId, freelancer) => {
  const filter = { workId: workId };
  const update = {
    freelancer: freelancer,
    startDate: new Date(),
    progress: "in progress",
  };

  await WorkProgress.findOneAndUpdate(filter, update);
};

module.exports = {
  addWorkProgress,
  getWorkProcess,
  getFreelancerWorkByUsername,
  getFreelancerAndProgress,
  updateWorkProgress,
};

//0 no user with that user id,
//1 success in adding new review
//2 error in adding new review
