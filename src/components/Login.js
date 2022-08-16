import React, { useState } from "react";
import { userLogin } from "../databaseAdapter";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";


export default function LoggedIn() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOnChange = (event) => {
    const changed = event.target.id;
    if (changed === "form2Example1") {
      setEmail(event.target.value);
    } else if (changed === "form2Example2") {
      setPassword(event.target.value);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    alert(`Happy Shopping ${email}!`);
    const token = await userLogin(email, password);
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    navigate("/Profile");
  };
  return (
    <section>
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center" style ={{marginTop: "50px", marginBottom: "50px"}}>
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div
                className="card"
                style={{ borderRadius: "15px" }}
              >
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">LOGIN</h2>
                  <form onSubmit={handleSubmit}>
                    <div>
                      <input
                        id="form2Example1"
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Enter Email"
                        value={email}
                        onChange={handleOnChange}
                      />
                    </div>
                    <label
                      className="form-label"
                      htmlFor="form3Example1cg"
                    >Please Enter Your Email</label>
                    <div>
                      <input
                        id="form2Example2"
                        className="form-control form-control-lg"
                        type="password"
                        placeholder="Enter Password"
                        onChange={handleOnChange}
                      ></input>
                      <label
                        className="form-label"
                        htmlFor="form3Example1cg"
                      >Please Enter Your Password</label>
                    </div>
                    <div className="d-flex justify-content-center">
                      <button className="btn btn-info" type="submit">
                        Login
                      </button>
                    </div>
                    <div className="d-flex justify-content-center">
                      <h6>Don't have an account?</h6>
                    </div>
                    <div className="d-flex justify-content-center">
                      <Link to="/Register">
                        <p> Register</p>
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
