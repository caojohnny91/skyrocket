const express = require("express");
const router = express.Router();
const applicationCtrl = require("../controllers/applications"); // .. means go back one folder

router.get("/", applicationCtrl.index); // connecting with controllers and triggers the index controller and that runs

// create the new route. This route should res.render() a new.ejs view:
router.get("/new", applicationCtrl.new); // object.new

// Next, we need to build the route we listed in our form action. In our applications router:
router.post("/", applicationCtrl.create);

router.get("/:applicationId", applicationCtrl.show);

router.delete("/:applicationId", applicationCtrl.deleteApp);

router.get("/:applicationId/edit", applicationCtrl.edit);

router.put("/:applicationId", applicationCtrl.update);

module.exports = router;
