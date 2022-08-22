import React from "react";
import { Link,useNavigate } from "react-router-dom";
let Logo = require("./CtrlPlusLogo.png")

export default function Navbar() {
  const authorizationToken = localStorage.getItem("token") ? true : false;
  let navigate = useNavigate()
  function handleChange(value){
    navigate(`${value}`)
    value = ""
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark px-3">
        <div className="container-fluid">
          <Link to = "/">
            <img src = {Logo} style = {{width: "60px", height: "60px"}}/></Link><h2 className = "bg-dark" style = {{color: "#60dde2"}}>CTRL+</h2>
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
                    <p className="bg-dark" style = {{color: "#60dde2"}}> Store</p>
                  </Link>
                </div>
              </li>
              <li className="nav-item">
                <div>
                  <Link to="/Store" className="nav-link">
                  {/* <p className="text-info bg-dark"> Info Tab</p> */}
                  <select onChange  ={event => handleChange(event.target.value)}style = {{background:"#222529", color:"white", border: "none", width: "40px", clicker: "pointer"}}>
                    <option className="text-info bg-dark" value ="/" >👤</option>
                    {authorizationToken === true ? (
                    <option className="text-info bg-dark" value ="/Cart">Checkout</option>
                    ):<option className="text-info bg-dark" value ="Login">Login</option>}
                     {authorizationToken === true ? (
                    null
                     ): <option className="text-info bg-dark" value ="Register">Register</option>}
                    {authorizationToken === true ? (
                    <option className="text-info bg-dark" value ="/Profile">My Account</option>
                    ):( <option className="text-info bg-dark" value ="/">Support</option>)}
                    
                  </select>
                  </Link>
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