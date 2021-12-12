const mongoose = require("mongoose");
const UserSchema = require('../schema/User.Schema').UserSchema;

const UserModel = mongoose.model("User", UserSchema);

function insertUser(user) {
    return UserModel.create(user);
}

function getAllUsers() {
    return UserModel.find().exec();
}

function findUserByUsername(username) {
    return UserModel.findOne({username}).exec();
}

function getUserFavorites(username) {
    return UserModel.find({"username": username}, {"favorites": 1, "_id":0});
}

module.exports = {
    insertUser,
    findUserByUsername,
    getAllUsers,
    getUserFavorites,
};