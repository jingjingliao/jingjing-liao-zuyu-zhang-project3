import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./css/JobDetails.css";

export default function () {
  const jobId = useParams().jobId;
  function findJobNameDetails() {
    axios
      .get("http://localhost:8000/job/" + jobId)
      .then((response) => setJob(response.data))
      .catch((error) => console.log("No job found"));
  }
  const [job, setJob] = useState({});
  useEffect(findJobNameDetails, []);
  return (
    <div>
      <div class="card container" id="jobDetails">
        <div class="card-content">
          <div class="card-title">Job Title: {job.JobTitle}</div>
          <div class="card-text">
            <div>Job Location: {job.Location}</div>
            <div>Job Company: {job.CompanyName}</div>
          </div>
        </div>
        <img src="https://images.creativemarket.com/0.1.0/ps/5261195/910/607/m1/fpnw/wm0/job-search-.jpg?1540456875&s=cc4077264458791bd7f44a0a1b4b40b4&fmt=webp" />
      </div>
    </div>
  );
}
