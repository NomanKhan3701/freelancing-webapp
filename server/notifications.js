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
  return {
    chatNotifications: chatNotifications,
    bidNotifications: bidNotifications,
    commentNotifications: commentNotifications,
    bidAcceptedNotifications: bidAcceptedNotifications,
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
};
