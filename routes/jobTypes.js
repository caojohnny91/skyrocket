const express = require("express");
const router = express.Router();
const jobTypeCtrl = require("../controllers/jobTypes");

router.get("/jobTypes", jobTypeCtrl.index);
router.post("/jobTypes", jobTypeCtrl.create);
router.post(
  "/user/:userId/jobType/:jobTypeId",
  jobTypeCtrl.relateJobTypeToUser
);

module.exports = router;