import "./css/Login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
const alert = require("alert");

export default function () {
  const navigate = useNavigate();
  const [UserLogginIn, setUserLogginIn] = useState({
    username: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  function onSubmit() {
    axios
      .post("/api/user/authenticate", UserLogginIn)
      .then((response) => {
        setUserLogginIn(response.data);
        if (response.status === 200) {
          localStorage.setItem(
            "currentUser",
            JSON.stringify(UserLogginIn.username)
          );
          navigate("/");
          window.location.reload();
        } else {
          console.log(response);
        }
        // else if (response.status === 422) {
        //   setErrorMsg("Please input both your username and password!");
        // } else {
        //   setErrorMsg("No user found with this username!");
        // }
      })
      .catch((error) => {
        setErrorMsg(
          "Both username and password should be provided and they need to be matched, please try again! "
        );
      });
  }

  return (
    <div class="login-page">
      <div class="form">
        <div class="login-form">
          <input
            type="text"
            placeholder="Username"
            value={UserLogginIn.username}
            onChange={(e) => {
              const username = e.target.value;
              setUserLogginIn({
                ...UserLogginIn,
                username: username,
              });
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={UserLogginIn.password}
            onChange={(e) => {
              const password = e.target.value;
              setUserLogginIn({
                ...UserLogginIn,
                password: password,
              });
            }}
          />
          <button onClick={onSubmit}>Login</button>
          <p class="message">
            Not registered? <Link to="/signup">Create an account</Link>
          </p>

          <div class="errorMsg">{errorMsg}</div>
        </div>
      </div>
    </div>
  );
}
