import "./css/Login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function () {
  const [UserLogginIn, setUserLogginIn] = useState({
    username: "",
    password: "",
  });

  function onSubmit() {
    axios
      .post("http://localhost:8000/user/authenticate", UserLogginIn)
      .then((response) => {
        setUserLogginIn(response.data);

        if (response.status === 200) {
          localStorage.setItem(
            "currentUser",
            JSON.stringify(UserLogginIn.username)
          );
          window.location.reload();
        }
      })
      .catch((error) => console.log(error));
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
        </div>
      </div>
    </div>
  );
}
