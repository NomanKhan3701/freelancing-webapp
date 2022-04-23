const mongoose = require("mongoose");

const ChatNotificationSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
});

const BidNotificationSchema = new mongoose.Schema({
  username: { type: String, required: true },
  workId: { type: String, required: true },
  title: { type: String, required: true },
  time: { type: String, required: true },
  bid: { type: Boolean, required: true },
});

const BidAcceptedNotificationDataSchema = new mongoose.Schema({
  freelancer: { type: String, required: true },
  workId: { type: String, required: true },
  title: { type: String, required: true },
  time: { type: String, required: true },
  bidAccepted: { type: Boolean, required: true },
});

const CommentsNotificationSchema = new mongoose.Schema({
  username: { type: String, required: true },
  workId: { type: String, required: true },
  title: { type: String, required: true },
  time: { type: String, required: true },
  comment: { type: Boolean, required: true },
});

const FeedbackNotificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  client: { type: String, required: true },
  workId: { type: String, required: true },
  time: { type: String, default: new Date() },
  image: { type: String },
  feedback: { type: Boolean, default: true },
  freelancer: { type: String, required: true },
});

const FeedbackNotificationData = new mongoose.model(
  "FeedbackNotificationData",
  FeedbackNotificationSchema
);

const BidNotificationData = new mongoose.model(
  "BidNotificationData",
  BidNotificationSchema
);

const BidAcceptedNotificationData = new mongoose.model(
  "BidAcceptedNotificationData",
  BidAcceptedNotificationDataSchema
);
const CommentNotificationData = new mongoose.model(
  "CommentNotificationData",
  CommentsNotificationSchema
);

const ChatNotificationData = new mongoose.model(
  "ChatNotificationData",
  ChatNotificationSchema
);

const addUserForChatNotification = async (username) => {
  const data = await ChatNotificationData.find({ username: username });
  if (data.length === 0) {
    const newData = new ChatNotificationData({ username: username });
    newData.save();
  }
};

const isUserForChatNotification = async (username) => {
  const data = await ChatNotificationData.findOneAndDelete({
    username: username,
  });
  return data ? true : false;
};

const addBidNotificationData = async (data) => {
  const bidData = await BidNotificationData.find({ workId: data.workId });
  if (bidData.length === 0) {
    const newData = new BidNotificationData({
      username: data.username,
      workId: data.workId,
      time: data.time,
      title: data.title,
      bid: data.bid,
    });
    newData.save();
  } else {
    const filter = { workId: data.workId };
    const update = { time: new Date() };
    BidNotificationData.findOneAndUpdate(filter, update);
  }
};

const doesUserHasBidNotifications = async (username) => {
  const data = await BidNotificationData.find({ username: username });
  await BidNotificationData.deleteMany({ username: username });
  return data;
};
const addCommentNotificationData = async (data) => {
  const commentData = await CommentNotificationData.find({
    workId: data.workId,
  });
  if (commentData.length === 0) {
    const newData = new CommentNotificationData({
      username: data.username,
      workId: data.workId,
      time: data.time,
      title: data.title,
      comment: data.comment,
    });
    newData.save();
  } else {
    const filter = { workId: data.workId };
    const update = { time: new Date() };
    CommentNotificationData.findOneAndUpdate(filter, update);
  }
};
const doesUserHasCommentNotifications = async (username) => {
  const data = await CommentNotificationData.find({ username: username });
  await CommentNotificationData.deleteMany({ username: username });
  return data;
};

const addBidAcceptedNotificationData = async (data) => {
  const bidAcceptedData = await BidAcceptedNotificationData.find({
    workId: data.workId,
  });
  if (bidAcceptedData.length === 0) {
    const newData = new BidAcceptedNotificationData({
      freelancer: data.freelancer,
      workId: data.workId,
      time: data.time,
      title: data.title,
      bidAccepted: data.bidAccepted,
    });
    newData.save();
  } else {
    const filter = { workId: data.workId };
    const update = { time: new Date() };
    BidAcceptedNotificationData.findOneAndUpdate(filter, update);
  }
};

const addFeedbackNotification = async (data) => {
  const { workId, title, client, feedback, image, freelancer } = data;
  const newData = new FeedbackNotificationData({
    workId: workId,
    title: title,
    client: client,
    feedback: feedback,
    image: image,
    freelancer: freelancer,
  });
  try {
    newData.save();
  } catch (error) {
    console.log(error);
    return 2;
  }
  return 4;
};

const removeFeedbackNotificationWithWokrId = async (workId) => {
  await FeedbackNotificationData.findOneAndDelete({ workId: workId });
};

const doesUserHasFeedbackNotification = async (username) => {
  const data = await FeedbackNotificationData.find({ username: username });
  await FeedbackNotificationData.deleteMany({ username: username });
  return data;
};

const doesUserHasBidAcceptedNotifications = async (username) => {
  const data = await BidAcceptedNotificationData.find({ freelancer: username });
  await BidAcceptedNotificationData.deleteMany({ freelancer: username });
  return data;
};
const notificationsForUser = async (username) => {
  const chatNotifications = await isUserForChatNotification(username);
  const bidNotifications = await doesUserHasBidNotifications(username);
  const bidAcceptedNotifications = await doesUserHasBidAcceptedNotifications(
    username
  );
  const commentNotifications = await doesUserHasCommentNotifications(username);
  const feedbackNotifications = await doesUserHasFeedbackNotification(username);
  return {
    chatNotifications: chatNotifications,
    bidNotifications: bidNotifications,
    commentNotifications: commentNotifications,
    bidAcceptedNotifications: bidAcceptedNotifications,
    feedbackNotifications: feedbackNotifications,
  };
};

module.exports = {
  addUserForChatNotification,
  isUserForChatNotification,
  addBidNotificationData,
  addCommentNotificationData,
  doesUserHasBidNotifications,
  notificationsForUser,
  addBidAcceptedNotificationData,
  doesUserHasBidAcceptedNotifications,
  addFeedbackNotification,
  doesUserHasFeedbackNotification,
  removeFeedbackNotificationWithWokrId,
};
