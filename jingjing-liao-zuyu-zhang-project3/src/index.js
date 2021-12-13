import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import Navbar from "./Navbar";
import JobSearch from "./JobSearch";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import JobDetails from "./JobDetails";
import HomePage from "./HomePage";
import JobCreate from "./JobCreate";
import JobEdit from "./JobEdit";
import AllFavs from "./AllFavs";

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
      <Route path="/allFavs" element={<AllFavs />} />
    </Routes>
  </Router>,
  document.getElementById("root")
);