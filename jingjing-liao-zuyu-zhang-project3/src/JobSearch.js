import axios, { Axios } from "axios";
import "./css/JobSearch.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Image from "./images/JobSearch1.jpg";
const alert = require("alert");

export default function JobSearch() {
  const jobTitle = useParams().jobTitle;
  const [jobs, setJob] = useState([{}]);
  const [errorMsg, setError] = useState("");

  function jobSearchResults() {
    axios
      .get("http://localhost:8000/job/find/" + jobTitle)
      .then((response) => {
        if (response.data.length !== 0) {
          setJob(response.data);
        } else {
          setError("No Job matches your input!");
        }
      })
      .catch((error) => {
        setError("No Job matches your input!");
      });
  }
  useEffect(jobSearchResults, [{}]);

  return (
    <div class="container" id="jobSearch">
      <div class="errorMsg">{errorMsg}</div>

      {jobs.map((job) => (
        <div class="card">
          <div class="card-content">
            <span class="card-title"> {job.jobTitle}</span>
            <p class="card-text">
              {job.location}
              <p>{job.companyName}</p>
            </p>
            <span class="card-link">
              <Link to={"/job/" + job._id}>More Details</Link>
            </span>
          </div>
          <img src={Image} />
        </div>
      ))}
    </div>
  );
}
