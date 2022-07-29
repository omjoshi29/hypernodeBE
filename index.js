const express = require("express");
const cors = require("cors");
const courseRouter = require("./routes/courseRoutes");
const connection = require("./Storage/db");
const PORT = process.env.PORT || 8080;
const { Server } = require("socket.io");
const http = require("http");

const category = require("./models/category");
const subcat = require("./models/subcat");
const Bot = require("./models/bot");
const Chatdata = require("./utils/storing");

const app = express();

let httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {},
});

io.on("connection", async (ws) => {
  let chats = await Bot.find();
  let choice = await category.find();
  let sub = await subcat.find();
  ws.emit("history", chats);
  ws.on("message", async (msg) => {
    if (!msg) {
      ws.emit("message", { server: "give valid input", client: "" });
    } else if (msg.includes("ello")) {
      let data = { client: msg, server: "what is your name?" };
      Chatdata(data);
      io.emit("message", data);
    } else if (msg.includes("I am") || msg.includes("i am")) {
      msg = msg.split(" ")[2];
      let data = { client: msg, server: `hello ${msg}, how are you` };
      Chatdata(data);
      io.emit("message", data);
    } else if (
      msg.includes("fine") ||
      msg.includes("good") ||
      msg.includes("awesome") ||
      msg.includes("great")
    ) {
      let choice = await category.find();
      let data = {
        client: msg,
        server: "which field are you interested in?",
        choice,
      };
      Chatdata(data);
      io.emit("message", data);
    } else if (msg === "reset") {
      let del = await Bot.deleteMany({});
      let chat = await Bot.find();
      io.emit("history", chat);
    } else if (msg) {
      let flag = false;
      choice.map(async (el) => {
        if (msg === el.name) {
          flag = true;
          let subs = await category.aggregate([
            {
              $lookup: {
                from: "subcats",
                localField: "subcatid",
                foreignField: "_id",
                as: "subcats",
              },
            },
            {
              $project: {
                subcats: 1,
              },
            },
          ]);
          let data = {
            client: msg,
            server: "which course are you interested in?",
            choice: subs,
          };
          Chatdata(data);
          io.emit("message", data);
        }
      });
      sub.map((el) => {
        if (el.name == msg) {
          flag = true;
          let data = {
            client: msg,
            server:
              "we found some great courses for you, please click the link given below",
            link: `/${msg}`,
          };
          Chatdata(data);
          io.emit("message", data);
        }
      });
      if (flag == false) {
        let data = { client: "", server: "enter valid input" };
        ws.emit("message", data);
      }
    } else {
      let data = { client: "", server: "enter valid input" };
      ws.emit("message", data);
    }
  });
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/", courseRouter);

httpServer.listen(PORT, async () => {
  try {
    await connection;
    console.log("successfully connected to db");
  } catch (error) {
    console.log("Failed to connect");
  }
});
