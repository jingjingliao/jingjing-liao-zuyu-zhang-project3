const express = require("express");
const router = express.Router();
const UserAccessor = require("./models/User.Model");
const alert = require("alert");

const jwt = require("jsonwebtoken");
const auth_middleware = require("./auth_middleware");

router.get("/findAll", function (request, response) {
  return UserAccessor.getAllUsers()
    .then((userResponse) => response.status(200).send(userResponse))
    .catch((error) => response.status(200).send(error));
});

router.get("/whoIsLoggedIn", auth_middleware, function (request, response) {
  const username = request.session.username;
  return response.send(username);
});

router.post("/authenticate", (request, response) => {
  let { username, password } = request.body;
  if (!username || !password) {
    alert("Please input both your username and password");
    return response.status(422).send("Username and/or password not provided");
  }
  return UserAccessor.findUserByUsername(username).then((userResponse) => {
    if (!userResponse) {
      alert(
        "No account found with this username & password combination. Please check again or click on link below to register."
      );
      return response.status(404).send("No user found with this username");
    }
    if (userResponse.password === password) {
      request.session.username = username;
      alert("Welcome back, " + username + "!");
      return response.status(200).send({ username });
    } else {
      alert("There is an error in your password. Please check and try again.");
      return response
        .status(404)
        .send(
          "There is an error in your password. Please check and try again."
        );
    }
  });
});

router.get("/:username", (request, response) => {
  const username = request.params.username;
  if (!username) {
    return response.status(422).send("Missing data");
  }
  return UserAccessor.findUserByUsername(username)
    .then((userResponse) => {
      if (!userResponse) {
        response.status(404).send("User not found");
      }
      response.send(userResponse);
    })
    .catch((error) => response.status(500).send("Issue getting user"));
});

router.post("/signup", function (request, response) {
  const { username, password, validation } = request.body;
  if (!username || !password || !validation) {
    alert("Please fill in all fields");
    return response.status(422).send("Sign up failed. Missing data.");
  }
  // check if username already exists
  return UserAccessor.findUserByUsername(username)
    .then((userResponse) => {
      if (userResponse) {
        alert("Username is already taken");
        return response.status(422).send("Sign up failed. Username is taken");
      } else {
        // check if passwords match
        if (password !== validation) {
          alert("Passwords don't match.");
          return response
            .status(422)
            .send("Sign up failed. Passwords don't match");
        }
        return UserAccessor.insertUser({ username, password, validation })
          .then((userResponse) => {
            alert("Account created. Welcome, " + username + "!");
            //TODO: redirect to homepage
            return response.status(200).send(userResponse);
          })
          .catch((error) => response.status(400).send(error));
      }
    })
    .catch((error) => response.status(400).send(error));
});

router.post("/logout", function (request, response) {
  request.session.destroy();
  alert("Successfully Logged Out!");
  return response.send("Logout Successfully");
});

module.exports = router;
