import axios from "axios";
import { useEffect, useState } from "react";
// import Image from "./images/JobSearch1.jpg";
import "./css/AllFavs.css";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default function AllFavs() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  //   const [favs, setFavs] = useState([]);
  //   const [job, setJob] = useState({});
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");

  function favSearchResults() {
    axios
      .get("http://localhost:8000/user/findAllFavs/" + currentUser)
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        setError("Failed to get favorite list");
      });
  }
  useEffect(favSearchResults, []);

  return (
    <div>
      {jobs.map((job) => (
        <div class="container" id="favJobs">
          <img class="icon" src={job.companyIcon} />
          <div class="card-title">Job Title: {job.jobTitle}</div>
          <div class="card-text">
            <div>Company Name: {job.companyName}</div>
            <div>Location: {job.location}</div>
            <div>Description: {job.description}</div>

            <div>
              Send Email:{" "}
              <a href={"mailto:" + job.emailContact} method="POST">
                {job.emailContact}
              </a>
            </div>
            {job.companyWebsite ? (
              <div>
                Company Website:{" "}
                <a href={"https://" + job.companyWebsite} target="_blank">
                  {job.companyWebsite}
                </a>
              </div>
            ) : (
              <div></div>
            )}
            <div>Posting Date: {job.createAt}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
