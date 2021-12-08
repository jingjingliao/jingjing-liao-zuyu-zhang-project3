const Schema = require("mongoose").Schema;
exports.UserSchema = new Schema({
    username: {
        type: String,
    },
    password: {
        type: String
    },
    validation: {
        type: String
    }
}, {
    collection: "users"
});