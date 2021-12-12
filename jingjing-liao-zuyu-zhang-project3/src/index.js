import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import Navbar from "./Navbar";
import JobSearch from "./JobSearch";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import JobDetails from "./JobDetails";
import HomePage from "./HomePage";
import JobCreate from "./JobCreate";
import JobEdit from "./JobEdit";
import JobFav from "./JobFav";

ReactDOM.render(
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/find/:jobTitle" element={<JobSearch />} />
      <Route path="/job/:jobId" element={<JobDetails />} />
      <Route path="/job/edit/:jobId" element={<JobEdit />} />
      <Route path="/job/create" element={<JobCreate />} />
      {/* <Route path="/job/favorite" element={<JobFav />} /> */}
      <Route path="/user/fav/:jobId" element={<JobFav />} />
    </Routes>
  </Router>,
  document.getElementById("root")
);
