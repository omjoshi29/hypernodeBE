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

// get courses
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

// filter by platform
courseRouter.get("/javascript/filter", async (req, res) => {
  let data;
  if (req.query.platform) {
    data = await jscourses.find({ platform: req.query.platform });
  }
  res.status(201).send(data);
});

courseRouter.get("/java/filter", async (req, res) => {
  let data;
  if (req.query.platform) {
    data = await javacourses.find({ platform: req.query.platform });
  }
  res.status(201).send(data);
});

courseRouter.get("/python/filter", async (req, res) => {
  let data;
  if (req.query.platform) {
    data = await pythoncourses.find({ platform: req.query.platform });
  }
  res.status(201).send(data);
});

// sort by ratings
courseRouter.get("/javascript/sort", async (req, res) => {
  let data;
  if (req.query.rating) {
    if (req.query.rating == "rhtl") {
      req.query.rating = -1;
    } else {
      req.query.rating = 1;
    }
    data = await jscourses.find().sort({ rating: req.query.rating });
  }
  res.status(201).send(data);
});

courseRouter.get("/java/sort", async (req, res) => {
  let data;
  if (req.query.rating) {
    if (req.query.rating == "rhtl") {
      req.query.rating = -1;
    } else {
      req.query.rating = 1;
    }
    data = await javacourses.find().sort({ rating: req.query.rating });
  }
  res.status(201).send(data);
});

courseRouter.get("/python/sort", async (req, res) => {
  let data;
  if (req.query.rating) {
    if (req.query.rating == "rhtl") {
      req.query.rating = -1;
    } else {
      req.query.rating = 1;
    }
    data = await pythoncourses.find().sort({ rating: req.query.rating });
  }
  res.status(201).send(data);
});

module.exports = courseRouter;
