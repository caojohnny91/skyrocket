const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require("express-session");
// Now that we have our middleware created, we need to mount and use it in our server.
const isSignedIn = require("./middleware/is-signed-in.js"); // new middleware required
const passUserToView = require("./middleware/pass-user-to-view.js"); // new middleware required

const authController = require("./controllers/auth.js");

const port = process.env.PORT ? process.env.PORT : "3000";

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
// app.use(morgan('dev')); // comment out if term is too crowded
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passUserToView); // new middleware

// server.js

app.get("/", (req, res) => {
  // Check if the user is logged in
  if (req.session.user) {
    // Redirect logged-in users to their applications index
    res.redirect(`/users/${req.session.user._id}/applications`);
  } else {
    // Show the homepage for users who are not logged in
    res.render("index.ejs");
  }
});

app.use("/auth", authController);
app.use(isSignedIn); // new middleware that sets up auth to not get you past this route if not signed in
// app.use("/users/applications", require("./routes/applications.js")); // new from david since we split the applications.js in routes and controllers instead of app.use('/users/applications', applicationsController);
app.use("/users/:userId/applications", require("./routes/applications.js")); // Without a signed-in user, we were able to build and test our first route in the applications controller. However, all of our future routes require a userId for proper functionality, which can only come from having an active user.

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});