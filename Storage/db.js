const mongoose = require("mongoose");
require("dotenv").config();
const { ServerApiVersion } = require("mongodb");
// const jscoursesdata = require("./jscourses");
// const javacoursesdata = require("./javacourses");
// const pythoncoursesdata = require("./pythoncourses");
// const {
//   jscourses,
//   javacourses,
//   pythoncourses,
// } = require("../models/courseModel");

const connectionParams = {
  useNewUrlParser: true,
  // useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
};

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@hypernode.osntbic.mongodb.net/?retryWrites=true&w=majority`;

const connection = mongoose
  .connect(uri, connectionParams)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Error connecting to the database", err);
  });

// async function main() {
//   const conn = await connection;
//   console.log("connected to db");
//   pythoncoursesdata.map(async (el) => {
//     const data = new pythoncourses(el);
//     await data.save();
//     console.log("data posted!");
//   });
// }
// main();

module.exports = connection;
