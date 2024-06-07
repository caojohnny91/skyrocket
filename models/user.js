const mongoose = require("mongoose");

const applicationSchema = mongoose.Schema({
  // properties of applications from ERD
  company: { type: String, required: true },
  title: { type: String, required: true },
  notes: String,
  postingLink: String,
  status: {
    type: String,
    enum: ["interested", "applied", "interviewing", "rejected", "accepted"],
    required: true,
  }, // enum is a list of allowed values that you can input for this key
});

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  applications: [applicationSchema], // embedding the applicationSchema here
});

const User = mongoose.model("User", userSchema);

module.exports = User;