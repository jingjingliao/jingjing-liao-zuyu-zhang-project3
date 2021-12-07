import "./css/Login.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";

export default function Login() {
  const [UserLogginIn, setUserLogginIn] = useState({
    username: "",
    password: ""
  });

  function checkUserTryingToLogIn() {
    axios.get("http://localhost:8000/user/authenticate")
    .then(response => setUserLogginIn(response.data))
    .catch(error => console.error(error))
  }

  return (
    <div class="login-page">
      <div class="form">
        <form class="login-form">
          <input type="text" placeholder="username"
          value={UserLogginIn.username}
          onChange={(e) => {
            const username = e.target.value;
            setUserLogginIn(
              {
                ...UserLogginIn,
                username: username
              }
            )
          }}/>
          <input type="password" placeholder="password"
          value={UserLogginIn.password}
          onChange={(e) => {
            const password = e.target.value;
            setUserLogginIn(
              {
                ...UserLogginIn,
                password: password
              }
            )
          }} type="password"/>
          <button onClick={() => {
            checkUserTryingToLogIn();
          }}>Login</button>
          <p class="message">
            Not registered? 
            <Link to="/signup">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
}