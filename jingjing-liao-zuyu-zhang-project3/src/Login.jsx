import "./css/Login.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";

export default function () {
  const [UserLogginIn, setUserLogginIn] = useState({
    username: "",
    password: "",
  });

  return (
    <div class="login-page">
      <div class="form">
        <form class="login-form">
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
          <button
            onClick={() => {
              axios
                .post("http://localhost:8000/user/authenticate", UserLogginIn)
                .then((response) => setUserLogginIn(response.data))
                .catch((error) => console.log(error));
            }}
          >
            Login
          </button>
          <p class="message">
            Not registered? <Link to="/signup">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
