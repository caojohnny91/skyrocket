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
  jobTypes: [{type: [mongoose.Types.ObjectId], ref: 'JobType'}] // new referencing model (jobType), put in array to collect many jobTypes, just curly brackets for one jobType
});

const User = mongoose.model("User", userSchema);

module.exports = User;

// sky rocket is a one to many relationship, EMBEDDING
// Embedding is the practice of storing related data within a single document. This is achieved by nesting sub-documents or arrays of sub-documents inside a parent document.

// Referenceing is good for a many to many ERD relationship
