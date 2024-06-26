const User = require("../models/user");

const index = async (req, res) => {
  // async function index(req, res) { //router.get('/', applicationCtrl.index); triggers this function and sends this route to render('applications/index.ejs')
  try {
    const currentUser = await User.findById(req.session.user._id);
    // from Schema Model:applications: [applicationSchema]
    // res.loacals.applications = currentUser.applications; BELOW is Davids way in one line
    res.render("applications/index.ejs", {
      applications: currentUser.applications,
    });
  } catch (error) {
    res.direct("/");
  }
};

// created newAppForm because new is an JS function and cant be named
function newAppForm(req, res) {
  res.render("applications/new.ejs");
}

async function create(req, res) {
  try {
    console.log(req.session.user);
    // Look up the user from req.session
    const foundUser = await User.findById(req.session.user._id);
    // Push req.body (the new form data object) to the
    // applications array of the current user
    foundUser.applications.push(req.body);
    // Save changes to the user
    await foundUser.save();
    // Redirect back to the applications index view
    res.redirect(`/users/${foundUser._id}/applications`);
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect("/");
  }
}
// from lecture
// try {
//     // Look up the user from req.session
//     const currentUser = await User.findById(req.session.user._id);
//     // Push req.body (the new form data object) to the
//     // applications array of the current user
//     currentUser.applications.push(req.body);
//     // Save changes to the user
//     await currentUser.save();
//     // Redirect back to the applications index view
//     res.redirect(`/users/${currentUser._id}/applications`);
//   } catch (error) {
//     // If any errors, log them and redirect back home
//     console.log(error);
//     res.redirect('/')
//   }

const show = async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Find the application by the applicationId supplied from req.params
    const application = currentUser.applications.id(req.params.applicationId);
    // Render the show view, passing the application data in the context object
    res.render("applications/show.ejs", { application });
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect("/");
  }
};

const deleteApp = async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Use the Mongoose .deleteOne() method to delete
    // an application using the id supplied from req.params
    currentUser.applications.id(req.params.applicationId).deleteOne();
    // Save changes to the user
    await currentUser.save();
    // Redirect back to the applications index view
    res.redirect(`/users/${currentUser._id}/applications`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

const edit = async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const application = currentUser.applications.id(req.params.applicationId);
    res.render("applications/edit.ejs", { application });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

const update = async (req, res) => {
  try {
    // Find the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Find the current application from the id supplied by req.params
    const application = currentUser.applications.id(req.params.applicationId);
    // Use the Mongoose .set() method, updating the current application to reflect the new form data on `req.body`
    application.set(req.body);
    // Save changes to the user
    await currentUser.save();
    // Redirect back to the show view of the current application
    res.redirect(
      `/users/${currentUser._id}/applications/${req.params.applicationId}`
    );
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

module.exports = {
  index,
  new: newAppForm, // new is a reserved key word need to create because new is already a built in JS function
  create,
  show,
  deleteApp,
  edit,
  update,
};
