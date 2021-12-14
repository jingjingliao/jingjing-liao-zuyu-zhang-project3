const express = require("express");
const router = express.Router();
const UserAccessor = require("./models/User.Model");
const JobAccessor = require("./models/Job.Model");
const alert = require("alert");

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
    return response.status(404).send("Username and/or password not provided");
  }
  return UserAccessor.findUserByUsername(username).then((userResponse) => {
    if (!userResponse) {
      return response.status(404).send("No user found with this username");
    }
    if (userResponse.password === password) {
      request.session.username = username;

      alert("Welcome back, " + username + "!");
      return response.status(200).send({ userResponse });
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
            return response.status(200).send(userResponse);
          })
          .catch((error) => response.status(400).send(error));
      }
    })
    .catch((error) => response.status(400).send(error));
});

router.post("/fav/:username/:jobId", (request, response) => {
  const jobId = request.params.jobId;
  const username = request.params.username;
  return UserAccessor.getUsersFavJobId(username, jobId)
    .then((userResponse) => {
      response.send(userResponse);
    })
    .catch((error) => response.status(500).send("Failed to get favorites"));
});

router.delete("/fav/:username/:jobId", (request, response) => {
  const jobId = request.params.jobId;
  const username = request.params.username;
  return UserAccessor.deleteFromFavorites(username, jobId)
    .then((userResponse) => {
      response.send(userResponse);
    })
    .catch((error) => response.status(500).send("Failed to delete"));
});

router.get("/findAllFavs/:username", async (request, response) => {
  try {
    const username = request.params.username;
    const ids = await UserAccessor.getAllUsersFavorites(username);
    const favIds = ids[0].favorites;
    await JobAccessor.findJobByIds(favIds).then((userResponse) => {
      response.send(userResponse);
    });
  } catch (err) {
    response.status(500).send("Failed to get all favorites");
  }
});

router.get("/existsInFavs/:username/:jobId", (request, response) => {
  const jobId = request.params.jobId;
  const username = request.params.username;
  return UserAccessor.getAllUsersFavorites(username)
    .then((userResponse) => {
      const favArray = userResponse[0].favorites;
      for (let i = 0; i < favArray.length; i++) {
        if (favArray[i] == jobId) {
          return response.status(200).send(true);
        }
      }
      return response.status(200).send(false);
    })
    .catch((error) =>
      response
        .status(500)
        .send("Failed to check if job exists in user's favorites!!")
    );
});

router.post("/logout", function (request, response) {
  request.session.destroy();
  alert("Successfully Logged Out!");
  return response.send("Logout Successfully");
});

module.exports = router;
