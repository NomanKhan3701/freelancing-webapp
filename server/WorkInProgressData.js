var mongoose = require("mongoose");
const { getFreelancerAndProgress } = require("./workProgress");

//requiring string field to not to be null or undefined
mongoose.Schema.Types.String.checkRequired((v) => typeof v === "string");

var WorkInProgressDataSchema = new mongoose.Schema({
  workId: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
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
    unique: true,
  },
  qualifications: {
    type: [String],
    required: true,
  },
  minBid: {
    type: Number,
    required: true,
    default: 0,
  },
  maxBid: {
    type: Number,
    required: true,
    default: 0,
  },
  numberOfBids: {
    type: Number,
    required: true,
    default: 0,
  },
  username: {
    type: String,
    required: true,
  },
});

const WorkInProgressData = new mongoose.model(
  "WorkInProgressData",
  WorkInProgressDataSchema
);

const getWorkInProgressData = async () => {
  const data = await WorkInProgressData.find({});
  return data;
};

// const addWorkInProgressData = async (workId, freelancer) => {
//   try {
//     const data = await findWorkDataAndDelete(workId);
//   } catch (error) {
//     console.log("wahhhhhhhhhhhhhhhhhhhh");
//     console.log(error);
//   }
//   const {
//     category,
//     title,
//     desc,
//     qualifications,
//     minBid,
//     maxBid,
//     numberOfBids,
//     username,
//   } = data;
//   console.log("whyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
//   try {
//     deleteBids(workId); //no need of await here
//   } catch (error) {
//     console.log("error in deleting from backedn work data");
//   }
//   const newWorkInProgressData = new WorkInProgressData({
//     workId: workId,
//     title: title,
//     desc: desc,
//     qualifications: qualifications,
//     category: category,
//     minBid: minBid,
//     maxBid: maxBid,
//     numberOfBids: numberOfBids,
//     username: username,
//   });
//   console.log("wasuupppppppppppppppp");
//   try {
//     await newWorkInProgressData.save();
//     await updateWorkProgress(workId, freelancer);
//     console.log("amigos whasssup");
//     return 4;
//   } catch (err) {
//     console.log(err);
//     return 2;
//   }
// };

const getWorkInProgressDataByUsername = async (username) => {
  const data = await WorkInProgressData.find({ username: username });
  let finalData = [];
  for (let i = 0; i < data.length; i++) {
    const dat = await getFreelancerAndProgress(data[i].workId);
    //order of opening the doc matter as both have _id, second one will be considered
    finalData.push({ ...dat[0]._doc, ...data[i]._doc });
  }
  return finalData;
};

const getWorkInProgressDataById = async (id) => {
  const data = await WorkInProgressData.find({ _id: id });
  return data;
};

module.exports = {
  getWorkInProgressData,
  getWorkInProgressDataById,
  getWorkInProgressDataByUsername,
  WorkInProgressData,
};

//1 - insufficient data
//4 - successfully added the data

//2 failure
