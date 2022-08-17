import React, { useState, useEffect } from "react";
import { getUserProfile } from "../databaseAdapter";
import { Link } from "react-router-dom";
import "./Profile.css";

export default function Profile({userInfo, setUserInfo}) {

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
    <div id = "profileContainer">
      <div className="card bg-dark" id="profileDiv">
        <div className="card-body">
        <h2 className="card-body" style = {{color: "#3a86ff"}}> Welcome to CTRL+</h2>
          <h2 className="card-body" style = {{color: "#3a86ff"}}>My Account:</h2>
          <h2 className="card-body" style = {{color: "#3a86ff"}}>Hi, {userInfo.email}</h2>
          <hr className = "text-white"></hr>
          <Link to="/Store">
            <button className="btn btn-info"> Products</button>
          </Link>
          <hr className = "text-white"></hr>
          <Link to="/Store">
            <button className="btn btn-info"> History </button>
          </Link>
          <hr className = "text-white"></hr>
          <Link to="/Store">
            <button className="btn btn-info"> Admin Profile </button>
          </Link>
          <hr className = "text-white"></hr>
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
          <hr className = "text-white"></hr>
        </div>
      </div>
      {/* History DIV */}
      <div className="card bg-dark" id = "ProfileDiv2">
        <div className="card-body">
        <h2 className="card-body text-white"> Order History for {userInfo.email} </h2>
          <hr className = "text-white"></hr>
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