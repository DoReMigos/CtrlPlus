import React, { useState } from "react";
import { RegisterUser } from "../databaseAdapter";
import { useNavigate } from "react-router-dom";

export default function Register() {
  let navigate = useNavigate();
  const [newEmail, setnewEmail] = useState("");
  const [password, setPassword] = useState("");
  //eslint-disable-next-line
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const result = await RegisterUser(newEmail, password);
    console.log(result, "this is result")
    localStorage.setItem("token", result.token);
    localStorage.setItem("Email", newEmail);
    navigate("/Login");
  }
  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="Choose Your New Email"
            type="text"
            onChange={(event) => setnewEmail(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Choose Your New Password"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Confirm Password"
            type="password"
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}
