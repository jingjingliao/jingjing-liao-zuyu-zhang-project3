import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./css/Signup.css";
import { useNavigate } from "react-router";

export default function () {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    validation: "",
  });

  function onRegister() {
    axios
      .post("api/user/signup", userData)
      .then((response) => setUserData(response.data), navigate("/"))
      .catch((error) => console.log(error));
  }

  return (
    <div class="signup">
      <div class="form">
        <h3>Create Your New Account: </h3>
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
        <button onClick={onRegister}>Register</button>
        <p class="message">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}