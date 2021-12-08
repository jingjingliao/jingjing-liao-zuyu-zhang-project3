import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Navbar from "./Navbar";
import JobSearch from "./JobSearch";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import JobDetails from "./JobDetails";
import HomePage from "./HomePage";
import JobCreate from "./JobCreate";

ReactDOM.render(
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/find/:jobTitle" element={<JobSearch />} />
      <Route path="/job/:jobId" element={<JobDetails />} />
      <Route path="/job/create" element={<JobCreate />} />
    </Routes>
  </Router>,
  document.getElementById("root")
);