import { useState } from "react";
import "./css/HomePage.css";
import { useNavigate } from "react-router";
import Image from "./images/JobSearch.jpg";

function HomePage() {
  const [formInput, setFormInput] = useState("");
  const [errorMsg, setError] = useState("");
  const navigate = useNavigate();

  function onSearchButton() {
    if (!formInput) {
      setError("You must type in a job title you want to search!");
    } else {
      navigate("/find/" + formInput);
    }
  }

  return (
    <div class="container" id="homepage">
      <div>
        <input
          type="text"
          class="textbox"
          placeholder="Search Jobs"
          value={formInput}
          onChange={(e) => setFormInput(e.target.value)}
        />
        <button onClick={onSearchButton}>Search</button>
        <div class="errorMsg">{errorMsg}</div>
      </div>
      <img src={Image} />
    </div>
  );
}

export default HomePage;
