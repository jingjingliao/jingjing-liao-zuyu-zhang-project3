const Schema = require("mongoose").Schema;
exports.UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    validation: {
      type: String,
    },
    favorites: {
      type: Array,
    },
  },
  {
    collection: "users",
  }
);
