import React, { useState } from "react";
import { RegisterUser } from "../databaseAdapter";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css"



export default function Register() {
  let navigate = useNavigate();
  const [newEmail, setnewEmail] = useState("");
  const [password, setPassword] = useState("");
  //eslint-disable-next-line
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    alert(`Thank you for Registering with Ctrl+ ${newEmail}!`);
    const result = await RegisterUser(newEmail, password);
    console.log(result, "this is result");
    localStorage.setItem("token", result.token);
    localStorage.setItem("Email", newEmail);
    navigate("/Login");
  }
  return (
    <section id = "RegisterSection">
      <div id="containerDiv">
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: "15px", marginTop:"10%", marginBottom: "10%" }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">
                    Register With CTRL+
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <input
                        id="form3Example1cg"
                        className="form-control form-control-lg"
                        placeholder="Email"
                        type="text"
                        onChange={(event) => setnewEmail(event.target.value)}
                      />
                      <label className="form-label" htmlFor="form3Example1cg">
                        Enter Your Email
                      </label>
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        id="form3Example4cg"
                        className="form-control form-control-lg"
                        placeholder="Password"
                        type="password"
                        onChange={(event) => setPassword(event.target.value)}
                      />
                      <label className="form-label" htmlFor="form3Example4cg">
                        Enter Your Password
                      </label>
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        id="form3Example4cdg"
                        className="form-control form-control-lg"
                        placeholder="Password"
                        type="password"
                        onChange={(event) =>
                          setConfirmPassword(event.target.value)
                        }
                      />
                      <label className="form-label" htmlFor="form3Example4cdg">
                        Confirm Your Password
                      </label>
                    </div>
                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-info"
                      >
                        Confirm Registration
                      </button>
                    </div>
                    <p className="text-center text-muted mt-5 mb-0">
                     <p> Have already an account?</p>
                      <Link to="/Login">
                        <u>Login here</u>
                      </Link>
                    </p>
                  </form>
                </div>
                </div>

              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
