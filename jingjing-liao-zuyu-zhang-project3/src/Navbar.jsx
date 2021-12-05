import "./css/Navbar.css";
import * as ReactBootStrap from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Login";

export default function Navbar() {
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
          <li>
            <Link to="/login">Login </Link>
          </li>
          <li>
            <Link to="/Signup">Sign up </Link>
          </li>
          <li>
            <Link to="/job/create">Job Create </Link>
          </li>
        </ul>
      </header>
    </div>
  );
}
