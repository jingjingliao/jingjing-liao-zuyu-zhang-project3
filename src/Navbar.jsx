import "./css/Navbar.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("currentUser")));
  }, []);

  const logout = () => {
    <Link to="/"></Link>;
    setUser(null);
    localStorage.clear();
  };

  return (
    <div id="nav-bar">
      <header class="container">
        <Link class="jobSearch" to="/">
          Job Search Website{" "}
        </Link>

        <ul class="nav-list">
          {user ? (
            <div>
              <li id="reference-to-user">
                <Link to="/">{user} </Link>
              </li>
              <li>
                <Link to="/">Home </Link>
              </li>
              <li>
                <Link to="/job/create">Create Job</Link>
              </li>
              <li>
                <Link to="/allFavs">Favorites</Link>
              </li>
              <li>
                <Link to="/" onClick={logout}>
                  Logout{" "}
                </Link>
              </li>
            </div>
          ) : (
            <div>
              <li>
                <Link to="/">Home </Link>
              </li>
              <li>
                <Link to="/login">Sign In</Link>
              </li>
              <li>
                <Link to="/Signup">Register</Link>
              </li>
            </div>
          )}
        </ul>
      </header>
    </div>
  );
}
