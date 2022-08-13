import React, { useState } from "react";
import { userLogin } from "../databaseAdapter";
import { useNavigate } from "react-router-dom";


export default function LoggedIn() {
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleOnChange = (event) => {
      const changed = event.target.id;
      console.log(changed, "this is line 13 from Login")
      if (changed === "form2Example1") {
        setEmail(event.target.value);
      } else if (changed === "form2Example2") {
        setPassword(event.target.value);
      }
    };
    const handleSubmit = async (event) => {
      event.preventDefault();
      const token = await userLogin(email, password);
      console.log(token, "this is line 23 from Login")
      localStorage.setItem("token",token);
      localStorage.setItem("email",email);
      navigate("/Register");
    };
    return (
        <div>
            <h2>LOGIN</h2>
            <form onSubmit={handleSubmit}>
            <input
                   id="form2Example1"
                    type ="text"
                    placeholder="Username"
                    value={email}
                    onChange={handleOnChange}  
                 />
             <input
                    id="form2Example2"
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