// When writing a custom middleware function, recall that we want three parameters instead of the usual two parameters our route handlers have been using:

// req is the request object,
// res is the response object,
// next is the third parameter, representing the next function in the long line of middleware and route handlers that a request is processed through.
// This function’s purpose is to check if a user is signed in and authorized to access certain routes or resources

const isSignedIn = (req, res, next) => {
  if (req.session.user) return next(); // dont need extra {} because its just one return
  res.redirect("/auth/sign-in");
};

module.exports = isSignedIn; // export this middleware function

// The function checks if there’s a user object in the session (provided by req.session.user). This is typically used to confirm that a user is logged in.

// If the user is logged in, next() is called, allowing the request to proceed to the next middleware or route handler. If this check fails, however, it moves to redirect the user to the sign-in page, strongly suggesting to the user that, to get where they want to go, they’ll have to sign-in.
