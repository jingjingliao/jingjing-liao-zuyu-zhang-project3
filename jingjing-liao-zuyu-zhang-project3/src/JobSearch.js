// import { useState } from "react";
import axios, { Axios } from "axios";
import "./css/JobSearch.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import JobDetails from "./JobDetails";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function JobSearch() {
  const jobTitle = useParams().jobTitle;
  const [jobs, setJob] = useState([{}]);
  const [errorMsg, setError] = useState(null);

  function jobSearchResults() {
    axios
      .get("http://localhost:8000/find/" + jobTitle)
      .then((response) => {
        setJob(response.data);
      })
      .catch((error) => {
        setError("No Job matches your input");
      });
  }
  useEffect(jobSearchResults, [{}]);

  return (
    <div class="container" id="jobSearch">
      {/* <div class="errorMsg">{errorMsg}</div> */}

      {jobs.map((job) => (
        <div class="card">
          <div class="card-content">
            <span class="card-title"> {job.jobTitle}</span>
            <p class="card-text">
              {job.location}
              <p>{job.companyName}</p>
            </p>

            <span class="card-link">
              <Link to={"/job/" + job._id}>More Detals</Link>
            </span>
          </div>
          <img src="https://images.creativemarket.com/0.1.0/ps/5261195/910/607/m1/fpnw/wm0/job-search-.jpg?1540456875&s=cc4077264458791bd7f44a0a1b4b40b4&fmt=webp" />
        </div>
      ))}
    </div>
  );
}
