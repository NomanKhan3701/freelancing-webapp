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
  console.log("room and message");
  console.log(room);
  console.log(message);
  const getPreviuosChat = await getChatData(room);
  console.log("previous chat");
  console.log(getPreviuosChat);
  const previousMessages = getPreviuosChat.data;
  previousMessages.push(message);
  console.log("=====================");
  console.log(previousMessages);
  console.log("=====================");
  const filter = { room: room };
  const update = { room: room, data: previousMessages };

  const doc = await UserChatData.findOneAndUpdate(filter, update, {
    new: true,
  });
  console.log("doc");
  console.log(doc);
};

const getChatData = async (room) => {
  const data = await UserChatData.find({ room: room });
  return data[0];
};

module.exports = { addDataToChat, UserChatData, getChatData };

//1 chat doesnt exist between users
//2 chat exist between users
