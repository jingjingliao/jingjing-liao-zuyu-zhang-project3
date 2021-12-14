import "./css/JobCreate.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import FileBase64 from "react-file-base64";

export default function JobCreate() {
  const navigate = useNavigate();
  const [newJob, setNewJob] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    description: "",
    emailContact: "",
    companyWebsite: "",
    companyIcon: "",
    creator: JSON.parse(localStorage.getItem("currentUser")),
  });

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("/api/job/create", newJob)
      .then((response) => {
        navigate("/job/" + response.data._id);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div class="job-create">
      <div class="form">
        <form class="create-form" onSubmit={handleSubmit}>
          <FileBase64
            class="custom-file-input"
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setNewJob({ ...newJob, companyIcon: base64 })
            }
          />
          <input
            type="text"
            placeholder="Job Title"
            value={newJob.jobTitle}
            onChange={(e) => setNewJob({ ...newJob, jobTitle: e.target.value })}
          />
          <input
            type="text"
            placeholder="Company Name"
            value={newJob.companyName}
            onChange={(e) =>
              setNewJob({ ...newJob, companyName: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Location"
            value={newJob.location}
            onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={newJob.description}
            onChange={(e) =>
              setNewJob({ ...newJob, description: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Employer Email Contact"
            value={newJob.emailContact}
            onChange={(e) =>
              setNewJob({ ...newJob, emailContact: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Company website (optional)"
            value={newJob.companyWebsite}
            onChange={(e) =>
              setNewJob({ ...newJob, companyWebsite: e.target.value })
            }
          />

          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}
