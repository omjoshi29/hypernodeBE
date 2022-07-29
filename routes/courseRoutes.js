const { Router } = require("express");
const {
  jscourses,
  javacourses,
  pythoncourses,
} = require("../models/courseModel");

const courseRouter = Router();

courseRouter.get("/", async (req, res) => {
  res.status(201).send("welcome to hypernode!");
});

courseRouter.get("/javascript", async (req, res) => {
  let jslist = await jscourses.find();
  res.status(201).send(jslist);
});

courseRouter.get("/java", async (req, res) => {
  let javalist = await javacourses.find();
  res.status(201).send(javalist);
});

courseRouter.get("/python", async (req, res) => {
  let pythonlist = await pythoncourses.find();
  res.status(201).send(pythonlist);
});

module.exports = courseRouter;
