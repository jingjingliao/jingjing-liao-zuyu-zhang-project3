import axios from "axios";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./css/Signup.css";

export default function () {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    validation: "",
  });
  return (
    <div class="signup">
      <div class="form">
        <h3>Create Your New Account: </h3>
        {/* <h5>Username: </h5> */}
        <input
          type="text"
          placeholder="Username"
          value={userData.username}
          onChange={(e) => {
            const username = e.target.value;
            setUserData({
              ...userData,
              username: username,
            });
          }}
        />
        {/* <h5>Password: </h5> */}
        <input
          type="password"
          placeholder="Password"
          value={userData.password}
          onChange={(e) => {
            const password = e.target.value;
            setUserData({
              ...userData,
              password: password,
            });
          }}
        />
        {/* <h5>Re-Enter Password: </h5> */}
        <input
          type="password"
          placeholder="Re-Enter Password"
          value={userData.validation}
          onChange={(e) => {
            const validation = e.target.value;
            setUserData({
              ...userData,
              validation: validation,
            });
          }}
        />
        <button
          onClick={() => {
            axios
              .post("http://localhost:8000/user/signup", userData)
              .then((response) => setUserData(response.data))
              .catch((error) => console.log(error));
          }}
        >
          Register
        </button>
        <p class="message">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
