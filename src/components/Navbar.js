import React from "react";
import { Link } from "react-router-dom";
let Logo = require("./CtrlPlusLogo.png")

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <div className="container-fluid">
          <Link to = "/">
            <img src = {Logo} style = {{width: "60px", height: "60px"}}/></Link><h2 className = "text-info bg-dark">CTRL+</h2>
          {/* <h4 className="text-info bg-dark">CTRL +</h4> */}
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarRightAlignExample"
            aria-controls="navbarRightAlignExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
         <i className="fas fa-bars"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarRightAlignExample">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <div>
                  <Link
                    to="/Store"
                    className="nav-link active"
                  >
                    <p className="text-info bg-dark"> Store</p>
                  </Link>
                </div>
              </li>
              <li className="nav-item">
                <div>
                  <Link to="/Store" className="nav-link">
                  <p className="text-info bg-dark"> Support</p>
                  </Link>
                </div>
              </li>
              <li className="nav-item">
                <div>
                  <Link to="/Store" className="nav-link">
                 🛒
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
