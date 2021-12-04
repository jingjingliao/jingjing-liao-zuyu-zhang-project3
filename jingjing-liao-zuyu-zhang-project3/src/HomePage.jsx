import { useState } from "react";
import axios, { Axios } from "axios";
import "./css/HomePage.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import JobDetails from "./JobDetails";

function HomePage() {
  const [formInput, setFormInput] = useState("");

  return (
    <div class="container" id="homepage">
      <div>
        <input
          type="text"
          class="textbox"
          placeholder="Search Jobs"
          value={formInput}
          onChange={(e) => setFormInput(e.target.value)}
        />
        {/* <input
          title="Search"
          value="Search"
          type="submit"
          class="button"
          onClick={onSearchButtonClick}
        /> */}
        <button>
          <Link to={"/find/" + formInput}>Search</Link>
        </button>
      </div>
      {/* <div class="errorMsg">{errorMsg}</div> */}
      <img src="https://images.creativemarket.com/0.1.0/ps/5261195/910/607/m1/fpnw/wm0/job-search-.jpg?1540456875&s=cc4077264458791bd7f44a0a1b4b40b4&fmt=webp" />
      {/* <div class="errorMsg">{errorMsg}</div>

      {jobs.map((job) => (
        <div class="card">
          <div class="card-content">
            <span class="card-title"> {job.JobTitle}</span>
            <p class="card-text">
              {job.Location}
              <p>{job.CompanyName}</p>
            </p>

            <span class={buttonDisplay}>
              <Link to={"/job/" + job.JobID}>More Detals</Link>
            </span>
          </div>
          <img src="https://images.creativemarket.com/0.1.0/ps/5261195/910/607/m1/fpnw/wm0/job-search-.jpg?1540456875&s=cc4077264458791bd7f44a0a1b4b40b4&fmt=webp" />
        </div> */}
      {/* ))} */}
    </div>
  );
}

export default HomePage;
