process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1; //for video calling
require("dotenv/config");

const fetch = require("node-fetch"); //for video calling
const logger = require("morgan"); //for video calling
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const socketio = require("socket.io");
const http = require("http");
const app = express();

// const server = http.createServer(app);
// const io = socketio(server);
// const Server = app.listen(8080);

var fs = require("fs");
var path = require("path");

// set up multer for storing uploaded files image upload database
var multer = require("multer");
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
var upload = multer({ storage: storage });

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions)); // Use this after the variable declaration

const { categoryImageData } = require("./categoryData");
const {
  getWorkData,
  getWorkFilterData,
  addWorkData,
  getWorkPostedDataByUsername,
  updateBidCount,
  getWorkPostedDataById,
} = require("./FindWorkData");
const {
  getTalentData,
  getTalentFilterData,
  addTalentData,
} = require("./FindTalentData");
const {
  createNewUser,
  isValidUser,
  UserSignUp,
  isUserDataTaken,
} = require("./database.js");
const { json } = require("body-parser");
const { log } = require("console");
const {
  getWorkBidCommentsData,
  addCommentToWorkBid,
} = require("./WorkBidCommentsData");
const { getBids } = require("./Bids");
const {
  addBid,
  getFreelancerWorkByUsername,
  addWorkInProgressData,
  getNumberOfRegisteredUsersAndJobsPosted,
} = require("./BreakDependency");
const {
  getRoomNo,
  addNewUsersToChat,
  findAllRoomsWithGivenUser,
  findAllRoomsWithGivenUserAndDoOtherUSerExits,
} = require("./UserAndChatRoom");
const {
  addDataToChat,
  getChatDataWithRoom,
  getChatDataWithOneUsername,
} = require("./ChatData");

const {
  getOnlineUsers,
  addOnlineUser,
  removeOnlineUser,
  getSocketId,
} = require("./onlineUsers");

const {
  addUserProfile,
  getUserProfileDataUsingUsername,
  getRatingsAndUsername,
  getUserImage,
} = require("./UserProfileData");

app.use(logger("dev")); //for video calling
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json());

// app.post("/post", (req, res, err) => {});

app.post("/login", (req, res, err) => {
  if (err) {
    //
  }
  const { username, password } = req.body;
  isValidUser({ username: username, password: password })
    .then((response) => {
      getUserImage(username).then((image) => {
        res.send({
          result: response.result,
          userDataTaken: response.userDataTaken,
          image: image,
        });
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("An error occurred", error);
    });
});

app.post("/signup", (req, res, err) => {
  if (err) {
    //
  }
  //user exist or user dont exist
  let result;
  try {
    createNewUser(req.body).then((result) => {
      res.send({ result: result, userDataTaken: false });
    });
  } catch (error) {
    console.log("some error");
  }
});

app.get("/getFooterData", (req, res, err) => {
  if (err) {
    console.log(err);
  }
  getNumberOfRegisteredUsersAndJobsPosted().then((data) => {
    res.send({ data: data });
  });
});

app.get("/findtalent", (req, res, err) => {
  if (err) {
    console.log(err);
  }
  categoryImageData()
    .then((response) => {
      res.send({ items: response });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/findtalent/cards", (req, res, err) => {
  if (err) {
    console.log(err);
    getTalentData().then((response) => {
      res.send({ result: response });
    });
  }
});

app.post("/userprofileinput", (req, res, err) => {
  if (err) {
    console.log(err);
  }
  const body = req.body.userData;
  addUserProfile(body)
    .then((response) => {
      res.send({ result: response });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/findtalent/postwork", (req, res, err) => {
  if (err) {
    console.log(err);
  }
  const body = req.body.postWorkData;
  // const newPostWorkData = new FindWorkData({
  //   title: body.title,
  //   desc: body.desc,
  //   category: body.category,
  //   qualifications: body.skills,
  //   minBid: body.minBid,
  //   maxBid: body.maxBid,
  // });

  try {
    // newPostWorkData.save();
    addWorkData({
      title: body.title,
      desc: body.desc,
      category: body.category,
      qualifications: body.skills,
      minBid: body.minBid,
      maxBid: body.maxBid,
      username: body.username,
      image: body.image,
    }).then((response) => {
      res.send({ result: response.result });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred", error);
  }
});
app.post("/findwork/posttalent", (req, res, err) => {
  if (err) {
    console.log(err);
  }
  const body = req.body.postTalentData;
  try {
    // newPostWorkData.save();
    addTalentData({
      title: body.title,
      desc: body.desc,
      category: body.category,
      qualifications: body.skills,
      price: body.price,
      perHourRate: body.perHourRate,
      username: body.username,
    }).then((response) => {
      res.send({ result: response });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred", error);
  }
});

app.get("/findtalent/:category", (req, res, err) => {
  if (err) {
    console.log(err);
  }
  try {
    getTalentData().then((items) => {
      getWorkFilterData().then((filterData) => {
        res.send({ items: items, filterData: filterData });
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred", err);
  }
});

app.get("/userprofile/allpost/:username", (req, res, err) => {
  const username = req.params.username;
  getWorkPostedDataByUsername(username)
    .then((workPosted) => {
      res.send({ workPosted: workPosted });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/userprofile/allwork/:username", (req, res, err) => {
  const username = req.params.username;
  getFreelancerWorkByUsername(username)
    .then((freelancingWork) => {
      res.send({ freelancingWork: freelancingWork });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/userprofiledata/:username", (req, res, err) => {
  const username = req.params.username;
  getUserProfileDataUsingUsername(username)
    .then((response) => {
      getWorkPostedDataByUsername(username).then((workPosted) => {
        getFreelancerWorkByUsername(username).then((freelancingWork) => {
          isUserDataTaken(username).then((isUserDataTaken) => {
            res.send({
              userProfileData: response._doc,
              workPosted: workPosted,
              freelancingWork: freelancingWork,
              isUserDataTaken: isUserDataTaken,
            });
          });
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/userprofiledata", (req, res, err) => {
  if (err) {
    console.log(err);
  }

  // categoryImageData()
  //   .then((response) => {
  //     res.send({ items: response });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
});

app.get("/findwork", (req, res, err) => {
  if (err) {
    console.log(err);
  }
  categoryImageData()
    .then((response) => {
      res.send({ items: response });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/findwork/:category", (req, res, err) => {
  if (err) {
    console.log(err);
  }
  try {
    getWorkData().then((items) => {
      getWorkFilterData().then((filterData) => {
        res.send({ items: items, filterData: filterData });
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred", error);
  }
});

app.get(`/findworkdata/:workId`, (req, res, err) => {
  if (err) {
    console.log(err);
  }
  getWorkPostedDataById(req.params.workId).then((response) => {
    res.send({ result: response });
  });
});

app.post("/acceptbid", (req, res, err) => {
  if (err) {
    console.log(err);
  }
  const body = req.body;
  addWorkInProgressData(body.workId, body.freelancer)
    .then((response) => {
      res.send({ result: response });
    })
    .catch((error) => {
      console.log("error in sending final result to front end");
      res.status(500).send({ error: "An error occurred" });
    });
});

app.post("/findwork/bid/newComment", (req, res, err) => {
  if (err) {
    console.log(err);
  }
  const body = req.body;
  try {
    const result = addCommentToWorkBid({
      workId: body.workId,
      username: body.username,
      desc: body.desc,
      image: body.image,
    });
    res.send({ result: result });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred", error);
  }
});

app.post("/findwork/bid/newBid", (req, res, err) => {
  if (err) {
    console.log(err);
  }
  const body = req.body;
  try {
    addBid({
      workId: body.workId,
      username: body.username,
      desc: body.desc,
      amount: body.amount,
      image: body.image,
    }).then((result) => {
      res.send({ result: result });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred", error);
  }
});

//this was supposed to be get requst but we have manipulated using post
app.post("/findwork/bid/:workId", (req, res, err) => {
  if (err) {
    console.log(err);
  }
  const workId = req.params.workId;
  try {
    getWorkBidCommentsData(workId).then((items) => {
      getBids(workId).then((bids) => {
        let totalBids = 0;
        for (let i = 0; i < bids.length; i++) {
          totalBids += bids[i].amount;
        }
        res.send({
          items: items,
          bids: bids,
          avgBid: Math.floor(totalBids / bids.length),
        });
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred", error);
  }
});

const PORT = process.env.PORT || 8080;
// app.listen(PORT, console.log(`Server started on port ${PORT}`));
//chat application using socket.io
const Server = app.listen(PORT, () => {
  console.log("server started on port 8080");
});

const io = require("socket.io")(Server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// app.get("/chat/:username", (req, res, err) => {
//   if (err) {
//     console.log(err);
//   }
//   const username = req.params.username;
//   findAllRoomsWithGivenUser(username).then((chats) => {
//     getChatDataWithOneUsername(username).then((chatData) => {
//       res.send({ chats: chats, chatData: chatData });
//     });
//   });
// });

// app.get("/chat/:username/:receiver", (req, res, err) => {
//   if (err) {
//     console.log(err);
//   }
//   const { username, receiver } = req.params;

//   //below if showing data after adding new user after refresh
//   findAllRoomsWithGivenUserAndDoOtherUSerExits(username, receiver).then(
//     (chats) => {
//       getChatDataWithOneUsername(username).then((chatData) => {
//         res.send({ chats: chats, chatData: chatData });
//       });
//     }
//   );
// });

app.post("/chat/:username", (req, res, err) => {
  if (err) {
    console.log(err);
  }
  const username = req.params.username;
  findAllRoomsWithGivenUser(username).then((chats) => {
    getChatDataWithOneUsername(username).then((chatData) => {
      res.send({ chats: chats, chatData: chatData });
    });
  });
});

app.post("/chat/:sender/:receiver", (req, res, err) => {
  if (err) {
    console.log(err);
  }
  const { sender, receiver } = req.params;
  const { image1, image2 } = req.body;
  //below if showing data after adding new user after refresh
  findAllRoomsWithGivenUserAndDoOtherUSerExits(
    sender,
    receiver,
    image1,
    image2
  ).then((chats) => {
    getChatDataWithOneUsername(sender).then((chatData) => {
      res.send({ chats: chats, chatData: chatData });
    });
  });
});

//video calling
const VC_API_KEY = process.env.VC_API_KEY;

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "Bearer " + VC_API_KEY,
};

const getRoom = (room) => {
  return fetch(`https://api.daily.co/v1/rooms/${room}`, {
    method: "GET",
    headers,
  })
    .then((res) => res.json())
    .then((json) => {
      return json;
    })
    .catch((err) => console.error("error:" + err));
};

const createRoom = (room) => {
  return fetch("https://api.daily.co/v1/rooms", {
    method: "POST",
    headers,
    body: JSON.stringify({
      name: room,
      properties: {
        enable_screenshare: true,
        enable_chat: true,
        start_video_off: true,
        start_audio_off: false,
        lang: "en",
      },
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      return json;
    })
    .catch((err) => console.log("error:" + err));
};

app.get("/video-call/:id", async function (req, res) {
  const roomId = req.params.id;

  const room = await getRoom(roomId);
  if (room.error) {
    const newRoom = await createRoom(roomId);
    res.status(200).send(newRoom);
  } else {
    res.status(200).send(room);
  }
});

//have u closed the connction and there things do here first.
io.on("connection", (socket) => {
  socket.on("online", (username) => {
    addOnlineUser(socket.id, username);
    getOnlineUsers(username).then((data) => {
      const onlineUsernamesForYou = data.map((o) => o.username);
      socket.emit("onJoin", onlineUsernamesForYou);
      for (let i = 0; i < data.length; i++) {
        io.to(data[i].socketId).emit("newUserJoined", username);
      }
    });
  });
  socket.on("offline", (username) => {
    removeOnlineUser(username);
    getOnlineUsers(username).then((data) => {
      for (let i = 0; i < data.length; i++) {
        io.to(data[i].socketId).emit("userLeft", username);
      }
    });
  });
  socket.on("join", ({ username1, username2 }, callback) => {
    getRoomNo(username1, username2).then((room) => {
      socket.join(room);
      socket.emit("getRoomNo", room);
    });
  });
  socket.on("getRoomNo", ({ username1, username2 }, callback) => {
    getRoomNo(username1, username2).then((room) => {
      socket.emit("getRoomNo", room);
    });
  });
  socket.on("sendMessage", ({ room, message, receiver }, callback) => {
    addDataToChat(room, message);
    socket.broadcast.to(room).emit("message", message);
    // if (io.sockets.adapter.rooms.get(room).size === 2) {
    //   socket.broadcast.to(room).emit("message", message);
    // } else {
    //   const otherUsersocketId = getSocketId(receiver);
    //   if (otherUsersocketId) {
    //     io.to(otherUsersocketId).emit("msgWithoutRoom", { room, message });
    //   }
    // }
  });
  socket.on("disconnect", (username) => {
    // socket.broadcast.to(room).emit("offline", usernamne);
    // console.log("disconnect signal sent.");
    // removeOnlineUser(username);
  });
});
