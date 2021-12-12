const mongoose = require("mongoose");
const UserSchema = require("../schema/User.Schema").UserSchema;

const UserModel = mongoose.model("User", UserSchema);

function insertUser(user) {
  return UserModel.create(user);
}

function getAllUsers() {
  return UserModel.find().exec();
}

function findUserByUsername(username) {
  return UserModel.findOne({ username }).exec();
}

function getUsersFavJobId(username, jobId) {
  return UserModel.findOneAndUpdate(
    { username: username },
    { $push: { favorites: jobId } }
  ).exec();
<<<<<<< HEAD
}

function deleteFromFavorites(username, jobId) {
  return UserModel.findOneAndUpdate(
    { username: username },
    { $pull : { favorites: jobId } }
  ).exec();
}

function getAllUsersFavorites(username) {
  return UserModel.find({"username": username}, {"favorites": 1, "_id":0});
=======
>>>>>>> 93f3e809c78f63f569486a3597d1def49a15f1e9
}

module.exports = {
  insertUser,
  findUserByUsername,
  getAllUsers,
  getUsersFavJobId,
<<<<<<< HEAD
  getAllUsersFavorites,
  deleteFromFavorites,
};
=======
};
>>>>>>> 93f3e809c78f63f569486a3597d1def49a15f1e9
