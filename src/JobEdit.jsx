import "./css/JobEdit.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import FileBase64 from "react-file-base64";

export default function JobEdit() {
  const [foundJob, setFoundJob] = useState({});
  const jobID = useParams().jobId;

  useEffect(() => {
    axios
      .get(`/api/job/${jobID}`)
      .then((res) => {
        setFoundJob(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  function handleSubmit() {
    axios
      .put(`/api/job/edit/${jobID}`, foundJob)
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => console.log(error));
  }

  return (
    <div class="job-create">
      <div class="form">
        <form class="create-form">
          <FileBase64
            class="custom-file-input"
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setFoundJob({ ...foundJob, companyIcon: base64 })
            }
          />
          <input
            type="text"
            placeholder="Job Title"
            value={foundJob.jobTitle}
            onChange={(e) => {
              setFoundJob({ ...foundJob, jobTitle: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="Company Name"
            value={foundJob.companyName}
            onChange={(e) =>
              setFoundJob({ ...foundJob, companyName: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Location"
            value={foundJob.location}
            onChange={(e) =>
              setFoundJob({ ...foundJob, location: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Description"
            value={foundJob.description}
            onChange={(e) =>
              setFoundJob({ ...foundJob, description: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Employer Email Contact"
            value={foundJob.emailContact}
            onChange={(e) =>
              setFoundJob({ ...foundJob, emailContact: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Company website (optional)"
            value={foundJob.companyWebsite}
            onChange={(e) =>
              setFoundJob({ ...foundJob, companyWebsite: e.target.value })
            }
          />

          <div class="link">
            <Link onClick={handleSubmit} to={"/job/" + jobID}>
              Submit
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
