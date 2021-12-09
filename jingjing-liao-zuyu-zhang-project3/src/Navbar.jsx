import "./css/Navbar.css";
import * as ReactBootStrap from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import React, { useState } from "react";

export default function Navbar() {
  // const user = null;

  // const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [user, setUser] = useState(null);
  // useEffect(() => {
  //   const token = user?.token;

  //   if (token) {
  //     const decodedToken = decode(token);

  //     if (decodedToken.exp * 1000 < new Date().getTime()) logout();
  //   }

  //   setUser(JSON.parse(localStorage.getItem("profile")));
  // }, [location]);

  const logout = () => {
    <Link to="/"></Link>;
    setUser = null;
    localStorage.clear();
  };

  return (
    <div>
      <header class="container">
        <Link class="jobSearch" to="/">
          Job Search Website{" "}
        </Link>

        <ul class="nav-list">
          <li>
            <Link to="/">Home </Link>
          </li>

          {user ? (
            <div>
              <li>{user}</li>
              <li>
                <Link to="/job/create">Job Create </Link>
              </li>
              <li>
                <Link to="/job/favorite">Fav Jobs </Link>
              </li>
              <li>
                <Link to="/">Logout </Link>
              </li>
            </div>
          ) : (
            <div>
              <li>
                <Link to="/login" onClick={logout}>
                  Login{" "}
                </Link>
              </li>
              <li>
                <Link to="/Signup">Sign up </Link>
              </li>
            </div>
          )}
        </ul>
      </header>
    </div>
  );
}
