const { Schema, model } = require("mongoose");

const courseSchema = new Schema({
  name: String,
  teacher: String,
  platform: String,
  price: String,
  certificate: String,
  rating: String,
});

const jscourses = model("jscourses", courseSchema);
const javacourses = model("javacourses", courseSchema);
const pythoncourses = model("pythoncourses", courseSchema);

module.exports = { jscourses, javacourses, pythoncourses };
