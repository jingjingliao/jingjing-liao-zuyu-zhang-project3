import axios from "axios";
import React, { useState } from "react";

export default (props) => {

    const [userData, setUserData] = useState({
        password: "",
        username: ""
    });
    return (
        <div>
            <div class="form">
                <h3>Create Your New Account: </h3>
                <h5>Username: </h5>
                <input value={userData.username} onChange={(e) => {
                    const username = e.target.value;
                    setUserData(
                        {
                            ...userData,
                            username: username
                        }
                    )
                }}/>
                <h5>Password: </h5>
                <input value={userData.password} onChange={(e) => {
                    const password = e.target.value;
                    setUserData(
                        {
                            ...userData,
                            password: password
                        }
                    )
                }} type="password"/>
                <button
                onClick={() => {
                    axios.post("http://localhost:8000/user/signup", userData)
                    .then(response => console.log(response))
                    .catch(error => console.log(error));
                }}>
                    Register
                </button>
            </div>
        </div>
    )
}
