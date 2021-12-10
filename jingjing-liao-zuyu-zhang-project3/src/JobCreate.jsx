import "./css/JobCreate.css";
import React, { useState } from "react";
import axios, { Axios } from "axios";

export default function JobCreate() {
  const [newJob, setNewJob] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    description: "",
    emailContact: "",
    companyWebsite: "",
  });

  function handleSubmit() {
    axios
      .post("http://localhost:8000/job/create", newJob)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div class="job-create">
      <div class="form">
        <form class="create-form" onSubmit={handleSubmit}>
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
