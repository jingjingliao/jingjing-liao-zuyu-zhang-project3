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
              <Link to="/">{user} </Link>
              <li>
                <Link to="/job/create">Job Create </Link>
              </li>
              <li>
                <Link to="/job/favorite">Fav Jobs </Link>
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
                <Link to="/login">Login </Link>
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
