import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Image from "./images/1.jpg";
import { useNavigate } from "react-router";
import FileBase64 from "react-file-base64";

import { useParams } from "react-router";
import "./css/JobDetails.css";

export default function () {
  const jobID = useParams().jobId;
  const navigate = useNavigate();

  const [currentId, setCurrentId] = useState(null);
  const [job, setJob] = useState({});
  const [jobDeleteMsg, setJobDeleteMsg] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [previewSource, setPreviewSource] = useState("");

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

  function AddToUsersFavorites() {
    if (!currentUser) {
      navigate("/");
    } else {
      axios
        .post("http://localhost:8000/user/fav/" + jobID)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => console.log("Failed to add to Favorites"));
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
              Employer Email Contact: <a href={job.emailContact}>Email</a>
            </div>
            {job.companyWebsite ? (
              <div>CompanyWebsite: {job.companyWebsite}</div>
            ) : (
              <div></div>
            )}
            <div>Posting Date: {job.createAt}</div>
          </div>

          <div class="card-button" onClick={AddToUsersFavorites}>
            {currentUser === job.creator ? (
              <div>
                <span class="like">Like</span>
                <Link class="edit" to={"/job/edit/" + jobID}>
                  Edit
                </Link>

                <Link class="delete" onClick={deleteJob} to={"/"}>
                  Delete
                </Link>
              </div>
            ) : (
              <div class="like">Like</div>
            )}
          </div>
        </div>
        <img src={Image} />
      </div>
    </div>
  );
}
