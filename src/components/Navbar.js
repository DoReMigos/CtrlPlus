import React from "react";
import { Link } from "react-router-dom";
let Logo = require("./CtrlPlusLogo.png")

export default function Navbar() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-dark">
        <div class="container-fluid">
            <img src = {Logo} style = {{width: "60px", height: "60px"}}/><h2 className = "text-info bg-dark">CTRL+</h2>
          {/* <h4 class="text-info bg-dark">CTRL +</h4> */}
          <button
            class="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarRightAlignExample"
            aria-controls="navbarRightAlignExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
         <i class="fas fa-bars"></i>
          </button>

          <div class="collapse navbar-collapse" id="navbarRightAlignExample">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <div>
                  <Link
                    to="/Store"
                    class="nav-link active"
                  >
                    <p class="text-info bg-dark"> Store</p>
                  </Link>
                </div>
              </li>
              <li class="nav-item">
                <div>
                  <Link to="/Store" class="nav-link">
                  <p class="text-info bg-dark"> Support</p>
                  </Link>
                </div>
              </li>
              <li class="nav-item">
                <div>
                  <Link to="/Store" class="nav-link">
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
