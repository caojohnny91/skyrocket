const JobType = require("../models/jobType");
const User = require("../models/user");

async function index(req, res) {
  try {
    const jobTypes = await JobType.find({});
    res.render("jobTypes/index.ejs", { jobTypes });
  } catch (err) {
    console.log(err);
    res.redirect("/jobTypes");
  }
}

async function create(req, res) {
  try {
    await JobType.create(req.body);
    res.redirect("/jobTypes");
  } catch (err) {
    console.log(err);
    res.redirect("/jobTypes");
  }
}

async function relateJobTypeToUser(req, res) {
  try {
    const foundUser = await User.findById(req.params.userId);
    if (foundUser.jobTypes) {
      foundUser.jobTypes.push(req.params.jobTypeId);
    } else {
      foundUser.jobTypes = [req.params.jobTypeId];
    }
    await foundUser.save();
    res.redirect("/jobTypes");
  } catch (err) {
    console.log(err);
    res.redirect("/jobTypes");
  }
}

module.exports = {
  index,
  create,
  relateJobTypeToUser,
};