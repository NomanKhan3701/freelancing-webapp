const mongoose = require("mongoose");

const UserChatDataSchema = new mongoose.Schema({
  room: {
    type: String,
    unique: true,
    required: true,
  },
  data: {
    type: Array,
    default: [],
  },
});

const UserChatData = new mongoose.model("UserChatData", UserChatDataSchema);

const addDataToChat = async (room, message) => {
  const getPreviuosChat = await getChatDataWithRoom(room);
  const previousMessages = getPreviuosChat.data;
  previousMessages.push(message);
  const filter = { room: room };
  const update = { room: room, data: previousMessages };

  const doc = await UserChatData.findOneAndUpdate(filter, update, {
    new: true,
  });
};

const getChatDataWithRoom = async (room) => {
  const data = await UserChatData.find({ room: room });
  return data[0];
};

const getChatDataWithOneUsername = async (username) => {
  // const data = await UserChatData.find({ room: /username/i }); didnt work
  const data = await UserChatData.find({
    room: { $regex: username, $options: "i" },
  });
  return data;
};

module.exports = {
  addDataToChat,
  UserChatData,
  getChatDataWithRoom,
  getChatDataWithOneUsername,
};

//1 chat doesnt exist between users
//2 chat exist between users
