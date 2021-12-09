const express = require("express");
const jobBoard = require("./routes/jobBoard");
const user = require("./routes/user");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
// const alert = require("alert");
// const cookieSession = require("cookie-session");
// const flash = require("connect-flash");
// const popup = require("popups");
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

// app.use(session({
//   cookie: {
//     maxAge: 60000
//   },
//   resave: true,
//   saveUninitialized: true}));
// app.use(flash());

// app.get('/flash', function(req, res){
//   // Set a flash message by passing the key, followed by the value, to req.flash().
//   req.flash('info', 'Flash is back!')
//   res.redirect('/');
// });

// app.use(express.static(path.join(__dirname, 'build')));

// app.get('*', function (req, res) {
//     console.log("received request");
//     res.sendFile(path.join(__dirname, "build", "index.html"));
// });

app.listen(8000, function () {
  console.log("Starting server!");
});
