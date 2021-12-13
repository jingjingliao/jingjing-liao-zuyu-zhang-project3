import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Image from "./images/JobSearch1.jpg";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import "./css/JobDetails.css";
import FileBase64 from "react-file-base64";

export default function () {
  const jobID = useParams().jobId;
  const [jobInFav, changeJobFavState] = useState(false);
  const navigate = useNavigate();

  // const [currentId, setCurrentId] = useState(null);
  const [job, setJob] = useState({});
  const [jobDeleteMsg, setJobDeleteMsg] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [FavMessage, setFavMessage] = useState("");
  const [favDeleteMessage, setFavDeleteMessage] = useState("");
  // const [previewSource, setPreviewSource] = useState("");

  function findJobNameDetails() {
    axios
      .get("http://localhost:8000/job/" + jobID)
      .then((response) => setJob(response.data))
      .catch((error) => console.log("No job found"));
  }

  useEffect(findJobNameDetails, []);

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
          (response) => setFavMessage("Added job to your favorites!"),
          navigate("/job/" + jobID)
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
          (response) => setFavDeleteMessage("Removed from your favorites!"),
          navigate("/job/" + jobID)
        )
        .catch((error) => console.log("Failed to remove from favorites"));
    }
  }

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
              <span onClick={RemoveFromUsersFavorites} class="like">
                Unfavorite
                <div>{favDeleteMessage}</div>
              </span>
            ) : (
              <span onClick={AddToUsersFavorites} class="like">
                Add to Favorites
                <div>{FavMessage}</div>
              </span>
            )}

            {currentUser === job.creator ? (
              <div>
                <span class="edit">
                  <Link to={"/job/edit/" + jobID}>Edit</Link>
                </span>

                <span class="delete">
                  <Link onClick={deleteJob} to={"/"}>
                    Delete
                  </Link>
                </span>
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
