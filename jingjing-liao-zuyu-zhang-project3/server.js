const express = require("express");
const jobBoard = require("./routes/jobBoard");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// const mongoDBEndpoint =
//   "mongodb+srv://jingjing:Cherryjingjing1!2@@jobboardproject.uunuw.mongodb.net/pokemon_app?retryWrites=true&w=majority";

const mongoDBEndpoint =
  process.env.MONGODB_URI || "mongodb://127.0.0.1/jobSearch_app";

mongoose.connect(mongoDBEndpoint, { useNewUrlParser: true });

const mongoDB = mongoose.connection;

mongoDB.on(
  "error",
  console.error.bind(console, "Error connecting to MongoDB:")
);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", jobBoard);

app.listen(8000, function () {
  console.log("Starting server!");
});
