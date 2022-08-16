import React, { useState, useEffect } from "react";
import { getUserProfile } from "../databaseAdapter";
import { Link } from "react-router-dom";
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
      <div className="card" id="ProfileDiv">
        <div className="card-body">
        <h2 className="card-body"> Welcome to CTRL+</h2>
          <h2 className="card-body">My Account:</h2>
          <h2 className="card-body">Hi, {userInfo.email}</h2>
          <hr></hr>
          <Link to="/Store">
            <button className="btn btn-info"> Products</button>
          </Link>
          <hr></hr>
          <Link to="/Store">
            <button className="btn btn-info"> History </button>
          </Link>
          <hr></hr>
          <Link to="/">
          <button
            id="allButton"
            type="button"
            className="btn btn-info"
            onClick={() => {
              localStorage.removeItem("token");
            }}>
            Sign Out
          </button>
        </Link>
          <hr></hr>
        </div>
      </div>
      {/* History DIV */}
      <div className="card" id = "ProfileDiv2">
        <div className="card-body">
        <h2 className="card-body"> Order History for {userInfo.email} </h2>
          <hr></hr>
          <Link to="/Store">
           Product
          </Link>
          <Link to="/Store">
            Product
          </Link>
         <Link to="/Store">
            Product
          </Link>
        </div>
      </div>
    </div>
  );
}
