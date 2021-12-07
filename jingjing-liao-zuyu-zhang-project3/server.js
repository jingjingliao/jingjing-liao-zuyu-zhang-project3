const express = require("express");
const app = express();
const jobBoard = require("./routes/jobBoard");
const user = require("./routes/user");
const cors = require("cors");
const mongoose = require("mongoose");
// const path = require("path");


const mongoDBEndpoint =
  process.env.MONGODB_URI || "mongodb://127.0.0.1/user_app";

mongoose.connect(mongoDBEndpoint, { useNewUrlParser: true });

const mongoDB = mongoose.connection;

mongoDB.on(
  "error",
  console.error.bind(console, "Error connecting to MongoDB:")
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use("/job", jobBoard);
app.use("/user", user);

// app.use(express.static(path.join(__dirname, 'build')));

// app.get('*', function (req, res) {
//     console.log("received request");
//     res.sendFile(path.join(__dirname, "build", "index.html"));
// });

app.listen(8000, function () {
  console.log("Starting server!");
});