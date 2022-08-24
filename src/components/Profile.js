import React, {useEffect } from "react";
import { getUserProfile } from "../databaseAdapter";
import { Link } from "react-router-dom";
import "./Profile.css";

export default function Profile({userInfo, setUserInfo}) {
 
  useEffect(() => {
    let token = localStorage.getItem("token");
    async function getUserInfo() {
      try {
        const response = await getUserProfile(token)
      setUserInfo(response);
      } catch (error) {
        console.log(error)
      } ;
      
    }
    getUserInfo();
  }, []);
  return (
    <>
     <div className="pageContainer vh-100" style={{ backgroundImage: "url(https://pbs.twimg.com/media/FOZKlglUcAIoB2u?format=jpg&name=large)",}}>
           
           <h2>Welcome to CTRL+ 
            <h1 className="mt-3"> {userInfo.email} </h1>
            <a className="btn btn-primary btn-lg px-4 me-sm-3"
                        href="/store">Browse Store</a>
            <Link to="/">
            <button
            id="allButton"
            type="button"
            className="btn btn-danger"
            onClick={() => {
              localStorage.removeItem("token");
            }}>
            Sign Out
          </button>
          </Link>
           </h2>
   </div>
  </>
  );
}