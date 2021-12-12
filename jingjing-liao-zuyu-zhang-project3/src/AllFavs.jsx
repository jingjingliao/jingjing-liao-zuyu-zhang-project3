import axios from "axios";
import { useEffect, useState } from "react";
import Image from "./images/JobSearch1.jpg";
import "./css/JobSearch.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default function AllFavs() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const [favs, setFavs] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [errorMsg, setError] = useState("");

    
    function favSearchResults() {
        axios
        .get("http://localhost:8000/user/findAllFavs/" + currentUser)
        .then((response) => {
            setFavs(response.data);
        })
        .catch((error) => {
            setError("Failed to get favorite list");
        });
    }
    useEffect(favSearchResults, []);

    function getJobObjects() {
        axios
         .post("http://localhost:8000/job/getJobObjects", favs)
         .then((response) => {
             setJobs(response.data);
         })
         .catch((error) => {
            setError("Failed to get job objects");
        });
    }
    useEffect(getJobObjects, []);

    return (
        <div>
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
    )
}