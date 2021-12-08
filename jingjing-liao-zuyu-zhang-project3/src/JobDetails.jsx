import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { useParams } from "react-router";
import "./css/JobDetails.css";

export default function () {
  const jobID = useParams().jobId;

  const [currentId, setCurrentId] = useState(null);
  const [job, setJob] = useState({});
  const [jobDeleteMsg, setJobDeleteMsg] = useState("");

  function findJobNameDetails() {
    axios
      .get("http://localhost:8000/job/" + jobID)
      .then((response) => setJob(response.data))
      .catch((error) => console.log("No job found"));
  }

  function deleteJob() {
    axios
      .delete("http://localhost:8000/job/" + jobID)
      .then(
        (response) => setJob(response.data),
        setJobDeleteMsg("This Job has been successfully deleted!")
      )
      .catch((error) => console.log("No job found"));
  }

  useEffect(findJobNameDetails, []);

  return (
    <div>
      <div class="card container" id="jobDetails">
        <div class="card-content">
          <div class="card-title">Job Title: {job.jobTitle}</div>
          <div class="card-text">
            <div>Company Name: {job.companyName}</div>
            <div>Location: {job.location}</div>
            <div>Description: {job.description}</div>
            <div>Employer Email Contact: {job.emailContact}</div>
            <div>CompanyWebsite: {job.companyWebsite}</div>
          </div>

          {/* <div class="deleteMsg">{jobDeleteMsg}</div> */}

          <div class="card-button">
            <div class="like">Like</div>

            <div class="edit">
              <Link to={"/job/edit/" + jobID}>Edit</Link>
            </div>

            <div class="delete">
              <Link onClick={deleteJob} to={"/"}>
                Delete
              </Link>
            </div>

            {/* <div class="delete" onClick={deleteJob}>
              Delete
            </div> */}
          </div>
        </div>
        <img src="https://images.creativemarket.com/0.1.0/ps/5261195/910/607/m1/fpnw/wm0/job-search-.jpg?1540456875&s=cc4077264458791bd7f44a0a1b4b40b4&fmt=webp" />
      </div>
    </div>
  );
}
