import React, {useEffect } from "react";
import { getUserProfile } from "../databaseAdapter";
import { Link } from "react-router-dom";
import "./Profile.css";

export default function Profile({userInfo, setUserInfo}) {
 
  useEffect(() => {
    let token = localStorage.getItem("token");
    console.log(token);
    async function getUserInfo() {
      try {
        const response = await getUserProfile(token)
        console.log(token);
      console.log(response, "Message Please Read");
      setUserInfo(response);
      } catch (error) {
        console.log(error)
      } ;
      
    }
    getUserInfo();
  }, []);
  return (
    <div id = "profileContainer">
      <div className="card bg-dark" id="profileDiv">
        <div className="card-body">
        <h2 className="card-body" style = {{color: "#60dde2"}}> Welcome to CTRL+</h2>
          <h2 className="card-body" style = {{color: "#60dde2"}}>My Account:</h2>
          <h2 className="card-body" style = {{color: "#60dde2"}}>Hi, {userInfo.email}</h2>
          <hr className = "text-white"></hr>
          <Link to="/Store">
            <button className="btn btn-info"> Purchase Cart Items</button>
          </Link>
          <hr className = "text-white"></hr>
          <Link to="/Store">
            <button className="btn btn-info"> Back to Store </button>
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
        </div>
      </div>
      {/* History DIV */}
      <div className="card bg-dark" id = "ProfileDiv2">
        <div className="card-body">
        <h2 className="card-body" style = {{color: "#60dde2"}}> Order History for {userInfo.email} </h2>
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