const {
  doesUserExistWithBid,
  Bid,
  deleteBids,
  getbidUsernameOnly,
} = require("./Bids");
const {
  updateCountForBid,
  findWorkDataAndDelete,
  getNumberOfJobsPosted,
} = require("./FindWorkData");
const {
  WorkProgress,
  updateWorkProgress,
  workEnd,
  getFreelancerUsernameonly,
} = require("./workProgress");
const {
  WorkInProgressData,
  getWorkInProgressDataById,
} = require("./WorkInProgressData");
const { getNumberOfRegisteredUsers } = require("./database");
const {
  addFeedbackStart,
  updateFeedbackFromFreelancer,
} = require("./Feedback");
const { removeFeedbackNotificationWithWokrId } = require("./notifications");
const {
  getTalentData,
  getTalentDataUsernameOnly,
} = require("./FindTalentData");
const { getUserProfileDataUsingUsernameArray } = require("./UserProfileData");
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
  }
  const freelancerWork = [];
  for (let i = 0; i < data.length; i++) {
    try {
      const dat = await getWorkInProgressDataById(data[i].workId);
      freelancerWork.push({ ...data[i]._doc, ...dat[0]._doc });
    } catch (error) {
      console.log(error);
    }
  }
  return freelancerWork;
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
    image,
    workImage,
  } = data;

  try {
    deleteBids(workId); //no need of await here
  } catch (error) {
    console.log(error);
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
    image: image,
    workImage: workImage,
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

const addFeedbackFromClient = async (data) => {
  try {
    await addFeedbackStart(data);
    await workEnd(data.workId);
  } catch (error) {
    console.log(error);
    return 2;
  }
  return 4;
};

const addFeedbackFromFreelancer = async (data) => {
  try {
    await updateFeedbackFromFreelancer(data);
    await removeFeedbackNotificationWithWokrId(data.workId);
  } catch (error) {
    console.log(error);
    return 2;
  }
  return 4;
};

const getTalentDataForPartnerPage = async () => {
  const usernames = await getTalentDataUsernameOnly();
  const usernamesOnly = usernames.map((username) => {
    return username.username;
  });
  const usernamesMore = await getbidUsernameOnly();
  const usernamesMoreOnly = usernamesMore.map((username) => {
    return username.username;
  });
  const moreUsernames = await getFreelancerUsernameonly();
  const moreUsernamesOnly = moreUsernames.map((username) => {
    return username.freelancer;
  });

  const finalUsernames = [
    ...usernamesOnly,
    ...usernamesMoreOnly,
    ...moreUsernamesOnly,
  ];
  let uniqueUsernames = [...new Set(finalUsernames)];
  var index = uniqueUsernames.indexOf("not selected");
  if (index !== -1) {
    uniqueUsernames.splice(index, 1);
  }
  const userProfileData = await getUserProfileDataUsingUsernameArray(
    uniqueUsernames
  );
  return userProfileData;
};

module.exports = {
  addBid,
  getFreelancerWorkByUsername,
  addWorkInProgressData,
  getNumberOfRegisteredUsersAndJobsPosted,
  addFeedbackFromClient,
  addFeedbackFromFreelancer,
  getTalentDataForPartnerPage,
};
