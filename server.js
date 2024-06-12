const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require("express-session");
// Now that we have our middleware created(isSignedIn & passUserToView), we need to mount and use it in our server.
const isSignedIn = require("./middleware/is-signed-in.js"); // new middleware required
const passUserToView = require("./middleware/pass-user-to-view.js"); // new middleware required

const authController = require("./controllers/auth.js");
const applicationCtrl = require("./routes/applications.js") // Import the applications controller in server.js. 

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

// These middleware functions should run before any routes that check for a valid user or require a user to be signed in to view a page.      
app.use(passUserToView); // new middleware func. Important placement on when to use the middleware! 

// app.get("/", async (req, res) => {
//   res.render("index.ejs", { user: req.session.user });
// }); OLD before updating with middleware

app.get("/", (req, res) => {
  // Check if the user is logged in
  if (req.session.user) {
    // this was before middlware was installed
      // res.render("index.ejs", { 
  //   user: req.session.user,
  // });

    // Redirect logged-in users to their applications index
    res.redirect(`/users/${req.session.user._id}/applications`);
  } else {
    // Show the homepage for users who are not logged in
    res.render("index.ejs");
    }
});

app.use("/auth", authController);
app.use("/", require("./routes/jobTypes.js")); // new referencing
app.use(isSignedIn); // new middleware that sets up auth to not get you past this route if not signed in
// Important placement on when to use the middleware! User should be signed in to view any of the routes. Therefor isSignedIn should be above the foods controller, but not before authController

// app.use("/users/applications", require("./routes/applications.js")); // new from david since we split the applications.js in routes and controllers instead of app.use('/users/applications', applicationsController);

// app.use("/users/applications", applicationCtrl); // old before we added the is-sign-in and pass middleware methods.
app.use("/users/:userId/applications", applicationCtrl); // Use middleware to direct incoming requests to /users/:userId/applications to the foods controller.
// Without a signed-in user, we were able to build and test our first route in the applications controller. However, all of our future routes require a userId for proper functionality, which can only come from having an active user.

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
