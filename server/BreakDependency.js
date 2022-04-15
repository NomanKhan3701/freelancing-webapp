const { doesUserExistWithBid, Bid, deleteBids } = require("./Bids");
const {
  updateCountForBid,
  getWorkPostedDataById,
  findWorkDataAndDelete,
  getNumberOfJobsPosted,
} = require("./FindWorkData");
const { WorkProgress, updateWorkProgress } = require("./workProgress");
const { WorkInProgressData } = require("./WorkInProgressData");
const { getNumberOfRegisteredUsers } = require("./database");
const addBid = async (data) => {
  const { workId, username, desc, amount, image } = data;
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
    image: image,
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

const addWorkInProgressData = async (workId, freelancer) => {
  let data;
  try {
    data = await findWorkDataAndDelete(workId);
  } catch (error) {
    console.log(error);
  }
  const {
    category,
    title,
    desc,
    qualifications,
    minBid,
    maxBid,
    numberOfBids,
    username,
  } = data;

  try {
    deleteBids(workId); //no need of await here
  } catch (error) {
    console.log("error in deleting from backedn work data");
  }
  const newWorkInProgressData = new WorkInProgressData({
    workId: workId,
    title: title,
    desc: desc,
    qualifications: qualifications,
    category: category,
    minBid: minBid,
    maxBid: maxBid,
    numberOfBids: numberOfBids,
    username: username,
  });
  try {
    newWorkInProgressData.save();
    updateWorkProgress(workId, freelancer);
    return 4;
  } catch (err) {
    console.log(err);
    return 2;
  }
};

const getNumberOfRegisteredUsersAndJobsPosted = async () => {
  const registeredUsers = await getNumberOfRegisteredUsers();
  const jobsPosted = await getNumberOfJobsPosted();
  return {
    registeredUsers: registeredUsers,
    jobsPosted: jobsPosted,
  };
};
module.exports = {
  addBid,
  getFreelancerWorkByUsername,
  addWorkInProgressData,
  getNumberOfRegisteredUsersAndJobsPosted,
};
