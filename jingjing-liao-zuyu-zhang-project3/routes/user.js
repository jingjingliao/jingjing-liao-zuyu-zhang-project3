const express = require("express");
const router = express.Router();
const UserAccessor = require("./models/User.Model");

router.get("/findAll", function(request, response) {
    return UserAccessor.getAllUsers()
    .then(userResponse => response.status(200).send(userResponse))
    .catch(error => response.status(200).send(error));
});

router.get("/authenticate", (request, response) => {
    let {username, password} = request.body;
    password = JSON.stringify(password);
    if (!username) {
        return response.status(422).send("Please input your username.");
    }
    if (!password) {
        return response.status(422).send("Please input your password");
    }
    return UserAccessor.findUserByUsername(username)
    .then((userResponse) => {
        if (!userResponse) {
            return response.status(404).send("No user found with this username");
        }
        if (userResponse.password === password) {
            return response.status(200).send("You are logged in!");
        } else {
            return response.status(404).send("There is an error in your password. Please check and try again.");
        }
    })
})

router.get("/:username", (request, response) => {
    const username = request.params.username;
    if (!username) {
        return response.status(422).send("Missing data");
    };
    return UserAccessor.findUserByUsername(username)
    .then((userResponse) => {
        if(!userResponse) {
            response.status(404).send("User not found");
        }
        response.send(userResponse);
    })
    .catch((error) => response.status(500).send("Issue getting user"));
});

router.post('/signup', function(req, res) {
    const { username, password } = req.body;
    if (!username) {
        alert("Please input a username.");
    }
    if (!password) {
        alert("Please input a password");
    }
    return UserAccessor.insertUser({username, password})
        .then((userResponse) => {
                return res.status(200).send(userResponse);
        })
        .catch(error => res.status(400).send(error))
});


module.exports = router;