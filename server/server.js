require("dotenv/config");
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
  FindWorkData,
} = require("./FindWorkData");
const { createNewUser, isValidUser, UserSignUp } = require("./database.js");
const { json } = require("body-parser");
const { log } = require("console");
const {
  getWorkBidCommentsData,
  addCommentToWorkBid,
} = require("./WorkBidCommentsData");
const { getBids, addBid } = require("./Bids");
const { getRoomNo, addNewUsersToChat } = require("./UserAndChatRoom");
const { getChatData, addDataToChat } = require("./ChatData");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());

app.post("/post", (req, res, err) => {});

app.post("/login", (req, res, err) => {
  if (err) {
    //
  }
  const { username, password } = req.body;
  isValidUser({ username: username, password: password })
    .then((response) => {
      res.send({ result: response });
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
    result = createNewUser(req.body);
    res.send({ result: result });
  } catch (error) {
    console.log("some error");
  }
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

app.get("/findtalent/:category", (req, res, err) => {
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
    res.status(500).send("An error occurred", err);
  }
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

//this was supposed to be get requst but we have manipulated using post
app.post("/findwork/bid", (req, res, err) => {
  if (err) {
    console.log(err);
  }
  const workId = req.body.id;
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
    const result = addBid({
      workId: body.workId,
      username: body.username,
      desc: body.desc,
      amount: body.amount,
    });
    res.send({ result: result });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred", error);
  }
});

app.post("/findtalent/postwork", (req, res, err) => {
  if (err) {
    console.log(err);
  }
  const body = req.body.postWorkData;
  const newPostWorkData = new FindWorkData({
    title: body.title,
    desc: body.desc,
    category: body.category,
    skills: body.skills,
    minBid: body.minBid,
    maxBid: body.maxBid,
  });
  try {
    newPostWorkData.save();
    res.send({ result: 1 });
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

app.get("/chat/:username/:usernameToConnect", (req, res, err) => {
  console.log(req.params);
});

//have u closed the connction and there things do here first.
io.on("connection", (socket) => {
  console.log("connected successfully.");
  socket.on("join", ({ username1, username2 }, callback) => {
    console.log("tying to get" + username1 + username2);
    getRoomNo(username1, username2).then((room) => {
      console.log("room + ");
      console.log(room);
      console.log("socket.id : " + socket.id);
      socket.join(room);
      getChatData(room).then((chatData) => {
        console.log("chatData.data");
        console.log(chatData.data);
        socket.emit("chatData", chatData.data);
      });
    });
  });
  socket.on("getRoomNo", ({ username1, username2 }, callback) => {
    console.log(username1);
    console.log(username2);
    getRoomNo(username1, username2).then((room) => {
      socket.emit("getRoomNo", room);
    });
  });
  socket.on("sendMessage", ({ room, message }, callback) => {
    console.log("room issssssssssss");
    console.log(room);
    console.log("message + " + message);
    addDataToChat(room, message);
    socket.broadcast.to(room).emit("message", message);
  });
  socket.on("disconnect", (usernamne) => {
    // socket.broadcast.to(room).emit("offline", usernamne);
    console.log("disconnect signal sent.");
  });
});
