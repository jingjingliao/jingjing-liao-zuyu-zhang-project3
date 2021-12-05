import "./css/JobCreate.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";

export default function JobCreate() {
  const [job, setJob] = useState({});
  // const [errorMsg, setError] = useState(null);
  function createJob() {
    axios
      .post("http://localhost:8000/job/create")
      .then((response) => {
        setJob(response.data);
      })
      .catch((error) => {
        console.log(error);
        // setError("No Job matches your input");
      });
  }

  useEffect(createJob, {});

  return (
    <div class="job-create">
      <div class="form">
        <div class="create-form">
          <input type="text" placeholder="Job Title" />
          <input type="text" placeholder="Company Name" />
          <input type="text" placeholder="Location" />
          <input type="text" placeholder="Description" />
          <input type="text" placeholder="Employer Email Contact" />
          <input type="text" placeholder="Company website (optional)" />
          <button>submit</button>
        </div>
      </div>
    </div>
  );
}
