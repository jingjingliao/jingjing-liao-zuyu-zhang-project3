const express = require("express");
const jobBoard = require("./routes/jobBoard");
const user = require("./routes/user");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const app = express();

const mongoString = "mongodb://127.0.0.1/user_app";

const mongoDBEndpoint = process.env.MONGODB_URI || mongoString;

mongoose.connect(mongoDBEndpoint, { useNewUrlParser: true });

const mongoDB = mongoose.connection;

mongoDB.on(
  "error",
  console.error.bind(console, "Error connecting to MongoDB:")
);

app.use(
  session({
    secret: "SUPER_DUPER_SECRET",
    store: MongoStore.create({ mongoUrl: mongoString }),
  })
);

app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
