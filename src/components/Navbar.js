import React from "react";
import { Link } from "react-router-dom";
let Logo = require("./CtrlPlusLogo.png");

export default function Navbar() {
  const authorizationToken = localStorage.getItem("token") ? true : false;
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark px-3">
        <div className="container-fluid">
          <Link to="/">
            <img src={Logo} style={{ width: "60px", height: "60px" }} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarRightAlignExample"
            aria-controls="navbarRightAlignExample"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <i className="fas fa-bars"></i>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarRightAlignExample">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <div>
              <Link to="/Store" className="nav-link active">
                    <p className="bg-dark" style={{ color: "#60dde2" }}>
                      Store
                    </p>
                  </Link>
              </div>
              <li className="nav-item">
                <div>
                <Link to="/Profile" className="nav-link">
                  {authorizationToken === true ? (
                    <p style={{ color: "#60dde2" }}
                      className="bg-dark"
                      value="/">
                      Profile
                    </p>) : null}
                </Link>
                </div>
              </li>
              <li className="nav-item">
                <div>
                {authorizationToken === true ? (
                <Link to="/" className="nav-link">
                    <p style={{ color: "#60dde2" }}
                    onClick={() => {
                      alert("You have sucessfully signed out")
                      localStorage.removeItem("token");
                    }}
                      className="bg-dark"
                      value="/">
                      Logout 
                    </p>
                </Link>) : <Link to="/Login" className="nav-link">
                    <p style={{ color: "#60dde2", marginRight: "15px" }}
                      className="bg-dark"
                      value="/Login">
                      Login
                    </p>
                </Link>}
                </div>
              </li>
              <li className="nav-item">
                <div>
                  <Link to="/Cart" className="nav-link">
                    <p ><span style={{ marginLeft: "5%", marginRight: "5%" }}>🛒</span></p>
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
