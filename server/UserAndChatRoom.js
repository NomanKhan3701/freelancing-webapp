var mongoose = require("mongoose");
const { UserChatData } = require("./ChatData");

var UserChatRoomSchema = new mongoose.Schema({
  usernames: {
    type: String,
    unique: true,
    required: true,
  },
  username1: {
    type: String,
    required: true,
  },
  username2: {
    type: String,
    required: true,
  },
});

const UserChatRoom = new mongoose.model("UserChatRoom", UserChatRoomSchema);

const doUsersAlreadyChat = async (username1, username2) => {
  let result, room;
  const usernames1 = username1.concat(username2);
  const usernames2 = username2.concat(username1);
  const data = await UserChatRoom.find({
    usernames: { $in: [usernames1, usernames2] },
  });
  result = data.length === 0 ? 1 : 2;
  room = data.length === 0 ? null : data[0].usernames;
  return { result: result, room: room };
};

const getRoomNo = async (username1, username2) => {
  const usernames1 = username1.concat(username2);
  const usernames2 = username2.concat(username1);
  const data = await UserChatRoom.find({
    usernames: { $in: [usernames1, usernames2] },
  });
  const room = data.length === 0 ? null : data[0].usernames;
  return room;
};

const addNewUsersToChat = async (username1, username2) => {
  const result = await doUsersAlreadyChat(username1, username2);
  if (result.result === 2) {
    return { newChat: false, room: result.room };
  }
  const newChatRoom = new UserChatRoom({
    usernames: username1.concat(username2),
    username1: username1,
    username2: username2,
  });
  const newUserChatData = new UserChatData({
    room: username1.concat(username2),
  });
  try {
    newChatRoom.save();
    newUserChatData.save();
  } catch (error) {
    console.log(error);
  }
  return { newChat: true, room: username1.concat(username2) };
};

const findAllRoomsWithGivenUser = async (username) => {
  const data = await UserChatRoom.find({ username: /username/i });
  return data;
};
module.exports = { getRoomNo, addNewUsersToChat, findAllRoomsWithGivenUser };

//1 chat doesnt exist between users
//2 chat exist between users
