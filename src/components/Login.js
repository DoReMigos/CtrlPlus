import React, { useState } from "react";
import { userLogin } from "../databaseAdapter";
import { useNavigate } from "react-router-dom";


export default function LoggedIn() {
    let navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const handleOnChange = (event) => {
      const changed = event.target.id;
      if (changed === "form2Example1") {
        setUsername(event.target.value);
      } else if (changed === "form2Example2") {
        setPassword(event.target.value);
      }
    };
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const token = await userLogin(username, password);
      localStorage.setItem("token",token);
      localStorage.setItem("username",username);
      navigate("/MyRoutines");
    };
    return (
        <div>
            <h2>LOGIN</h2>
            <form onSubmit={handleSubmit}>
            <input
                    type ="text"
                    placeholder="Username"
                    value={username}
                    onChange={handleOnChange}  
                 />
             <input
                    type="password"
                    placeholder="Password"
                    onChange={handleOnChange}
                  ></input>    
            <button type="submit">
                  Login
            </button>     
            </form>
        </div>
    )}