const {
  findAllOtherUsersChattingWithGivenUser,
  roomData,
} = require("./UserAndChatRoom");

var onlineUsers = [];
const onlineUsersAndSocketId = new Map();

const getOnlineUsers = async (username) => {
  const data = await findAllOtherUsersChattingWithGivenUser(username);
  let otherOnlineUsers = [];
  for (let i = 0; i < data.length; i++) {
    const otherUsername =
      data[i].username1 === username ? data[i].username2 : data[i].username1;
    if (onlineUsers.includes(otherUsername)) {
      otherOnlineUsers.push({
        username: otherUsername,
        socketId: onlineUsersAndSocketId.get(otherUsername),
      });
    }
  }
  return otherOnlineUsers;
};

const isUserOnline = async (sender, username, room) => {
  if (onlineUsers.includes(username)) {
    const data = await roomData(room);
    if (data.username1 === sender) {
      return { socketId: getSocketId(username), image: data.image1 };
    } else {
      return { socketId: getSocketId(username), image: data.image2 };
    }
  }
  return false;
};

const addOnlineUser = (socketId, username) => {
  if (!onlineUsers.includes(username)) {
    onlineUsers.push(username);
    onlineUsersAndSocketId.set(username, socketId);
  }
};

const removeOnlineUser = (username) => {
  if (onlineUsers.includes(username)) {
    const index = onlineUsers.indexOf(username);

    if (index > -1) {
      onlineUsers.splice(index, 1);
    }
    onlineUsersAndSocketId.delete(username);
  }
};

const getSocketId = (username) => {
  return onlineUsersAndSocketId.get(username);
};

const isUserOnlineNoData = (username) => {
  return onlineUsers.includes(username);
};

const notifyBid = async (title, workId, username) => {};

module.exports = {
  getOnlineUsers,
  addOnlineUser,
  removeOnlineUser,
  isUserOnline,
  isUserOnlineNoData,
  getSocketId,
};
