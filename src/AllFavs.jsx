import axios from "axios";
import { useEffect, useState } from "react";
import Image from "./images/JobSearch1.jpg";
import "./css/AllFavs.css";
import { Link } from "react-router-dom";

export default function AllFavs() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");

  function favSearchResults() {
    axios
      .get("/api/user/findAllFavs/" + currentUser)
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        setError("Failed to get favorite list");
      });
  }
  useEffect(favSearchResults, []);

  return (
    <div class="container" id="favJobs">
      {jobs.map((job) => (
        <div class="card">
          <div class="card-content">
            <span class="card-title">{job.jobTitle}</span>
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
