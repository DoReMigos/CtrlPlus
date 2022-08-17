import React, { useState, useEffect } from "react";
import { getUserProfile } from "../databaseAdapter";
import { Link } from "react-router-dom";
import Navbar from "./Navbar"
import "./Profile.css";

export default function Profile() {
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    let token = localStorage.getItem("token");
    console.log(token);
    async function getUserInfo() {
      const response = await getUserProfile(token);
      console.log(token);
      console.log(response);
      setUserInfo(response);
    }
    getUserInfo();
  }, []);
  return (
    <div>
      {/* <Navbar/> */}
      {/* <div className="card" id="card">
        <div className="card-body">
          <h2 className="card-body">Hi, User{userInfo.email}.</h2>
          <h2 className="card-body"> Welcome to CTRL+</h2>
          <hr></hr>
          <Link to="/Store">
            <button className="btn btn-info"> Products</button>
          </Link>
          <hr></hr>
          <h5>Purchases</h5>
          <hr></hr>
          <h5>Sign Out</h5>
          <hr></hr>
        </div>
      </div> */}
    </div>
  );
}
