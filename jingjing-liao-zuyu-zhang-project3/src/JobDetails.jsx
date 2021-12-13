import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Image from "./images/JobSearch1.jpg";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import "./css/JobDetails.css";

export default function () {
  const jobID = useParams().jobId;
  const [jobInFav, changeJobFavState] = useState(false);
  const navigate = useNavigate();

  const [job, setJob] = useState({});
  const [jobDeleteMsg, setJobDeleteMsg] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [FavMessage, setFavMessage] = useState("");
  const [favDeleteMessage, setFavDeleteMessage] = useState("");

  function findJobNameDetails() {
    axios
      .get("http://localhost:8000/job/" + jobID)
      .then((response) => setJob(response.data))
      .catch((error) => console.log("No job found"));
  }

  

  function JobExistsInFavList() {
    axios
      .get(
        "http://localhost:8000/user/existsInFavs/" + currentUser + "/" + jobID
      )
      .then((response) => changeJobFavState(response.data))
      .catch((error) => console.log("Failed to check"));
  }
  useEffect(JobExistsInFavList, []);

  function deleteJob() {
    axios
      .delete("http://localhost:8000/job/" + jobID)
      .then(
        (response) => setJob(response.data),
        setJobDeleteMsg("This Job has been successfully deleted!")
      )
      .catch((error) => console.log("No job found"));
  }

  function AddToUsersFavorites() {
    if (!currentUser) {
      navigate("/login");
    } else {
      axios
        .post("http://localhost:8000/user/fav/" + currentUser + "/" + jobID)
        .then(
          (response) => setFavMessage("Added job to your favorites!"), window.location.reload()
        )
        .catch((error) => console.log("Failed to add to Favorites"));
    }
  }

  function RemoveFromUsersFavorites() {
    if (!currentUser) {
      navigate("/login");
    } else {
      axios
        .delete("http://localhost:8000/user/fav/" + currentUser + "/" + jobID)
        .then(
          (response) => setFavDeleteMessage("Removed from your favorites!"), window.location.reload()
        )
        .catch((error) => console.log("Failed to remove from favorites"));
    }
  }

  useEffect(findJobNameDetails, []);

  return (
    <div>
      <div class="card container" id="jobDetails">
        <div class="card-content">
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

          <div class="card-button">
            {jobInFav ? (
              <div onClick={RemoveFromUsersFavorites} class="like bts">
                Unfavorite
                <div>{favDeleteMessage}</div>
              </div>
            ) : (
              <div onClick={AddToUsersFavorites} class="like bts">
                Add to Favorites
                <div>{FavMessage}</div>
              </div>
            )}

            {currentUser === job.creator ? (
              <div class="edit-and-delete">
                <div class="edit">
                  <Link to={"/job/edit/" + jobID}>Edit</Link>
                </div>

                <div class="delete">
                  <Link onClick={deleteJob} to={"/"}>
                    Delete
                  </Link>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <img src={Image} />
      </div>
    </div>
  );
}
