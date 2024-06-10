const mongoose = require("mongoose");

const jobTypeSchema = new mongoose.Schema({
  title: String,
  jobFamily: String
});

const JobType = mongoose.model('JobType', jobTypeSchema);

module.exports = JobType

// many to many referencing