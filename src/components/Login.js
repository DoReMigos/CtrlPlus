import React, { useState } from "react";
import { userLogin } from "../databaseAdapter";
import { useNavigate, Link } from "react-router-dom";


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
      alert(`Happy Shopping ${email}!`)
      const token = await userLogin(email, password);
      console.log(token, "this is line 23 from Login")
      localStorage.setItem("token",token);
      localStorage.setItem("email",email);
      navigate("/Profile");
    };
    return (
        <div>
            <h2>LOGIN</h2>
            <form onSubmit={handleSubmit}>
              <div>
            <input
                   id="form2Example1"
                    type ="text"
                    placeholder="Username"
                    value={email}
                    onChange={handleOnChange}  
                 />
                 </div>
                 <div>
             <input
                    id="form2Example2"
                    type="password"
                    placeholder="Password"
                    onChange={handleOnChange}
                  ></input>    
                  </div>
           <div> <button type="submit">
                  Login
            </button>   
            </div> 
            Don't have an account?
            <div>
            <Link to = "/Register">
            <button> Register</button> 
            </Link>
            </div>
            </form>
        </div>
    )}