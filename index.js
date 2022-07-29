const express = require("express");
const cors = require("cors");
const courseRouter = require("./routes/courseRoutes");
const connection = require("./Storage/db");
const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/", courseRouter);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("successfully connected to db");
  } catch (error) {
    console.log("Failed to connect");
  }
});
