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
    <section className="vh-100 bg-light">
            <div className="column-fluid">
              <div className="row">
                <div className="col-sm-6 text-dark d-flex align-items-center">
                  <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                    <div className="row">
                    <h1 className="">
                      Welcome to CTRL+,{" "}
                      {userInfo.email}
                    </h1>
                    
                    <div className="card bg-dark" id="profileDiv">
                      <div className="card-body">
                        <h2 className="card-body" style = {{color: "#60dde2"}}>My Account:</h2>
                        <h2 className="card-body" style = {{color: "#60dde2"}}>{userInfo.email} </h2>
                          <hr className = "text-white"></hr>
                          <Link to="/Store">
                          <button className="btn btn-info"> Purchase Items</button>
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
                            }}>Sign Out
                          </button>
                          </Link>
                        </div>
                      </div>
                      <div className="card bg-dark mb-5" id="profileDiv">
                      <div className="card-body">
                      <h2 className="card-body" style = {{color: "#60dde2"}}> Order History</h2>
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
                    

                  </div>
                </div>
                <div className="col-sm-6 px-0 d-none d-sm-block">
                  <img
                    src="https://pbs.twimg.com/media/FOZKlglUcAIoB2u?format=jpg&name=large"
                    alt="Login image"
                    className="w-100 vh-100"
                    style={{ objectFit: "cover", objectPosition: "left" }}
                  />
                </div>
              </div>
            </div>
          </section>
        </>
  );
}