import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import * as ReactBootStrap from "react-bootstrap";

function App() {
  return (
    <>
      <ReactBootStrap.Navbar bg="dark" variant="dark">
        <ReactBootStrap.Container>
          <ReactBootStrap.Navbar.Brand href="#home">
            <img alt="" src="images/JobSearch.jpg" width="50" height="50" /> Job
            Search
          </ReactBootStrap.Navbar.Brand>
          <ReactBootStrap.Navbar.Collapse className="justify-content-end">
            <a href="#login">Sign In</a>
          </ReactBootStrap.Navbar.Collapse>
        </ReactBootStrap.Container>
      </ReactBootStrap.Navbar>
    </>
  );
}

export default App;
