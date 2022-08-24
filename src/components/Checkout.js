import React, { useState } from "react";
import "./Checkout.css";
let Logo = require("./CtrlPlusLogo.png");


export default function Checkout() {
  const [show, setShow] = useState(true);
  const [num, setNum] = useState(0)

  function randomConfirmationNum(min, max){
    return Math.floor(Math.random()*(max-min +1)) + min;
  }

  const handleClick = () => {
    setNum(randomConfirmationNum(1,3000000))
  }

  return (
    <div>
    <div className="container" id="box">
      <div className="py-5 text-center">
      {show && (
        <img
          className="d=block mx-auto mb-4"
          src={Logo}
          style={{ width: "72px", height: "72px" }}
        ></img>
      )}
    
        {show && (
        <p className="lead">
          Thank you for shopping with CTRL+, we are happy to serve your
          technological needs.
        </p>
         )}
        {show && (
          <p className="lead">
            Please proceed to fill out the below information to purchase your
            order!
          </p>
        )}
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8 order-md-1">
          {show && (
            <form className="needs-validation novalidate">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>First Name: </label>
                  <input className="form-control" required type="text"></input>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="lastName">Last name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder=""
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="email">
                  Email <span className="text-muted">(Optional)</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="you@example.com"
                />
                <div className="invalid-feedback">
                  Please enter a valid email address for shipping updates.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="1234 Main St"
                  required
                />
                <div className="invalid-feedback">
                  Please enter your shipping address.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="address2">
                  Address 2 <span className="text-muted">(Optional)</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address2"
                  placeholder="Apartment or suite"
                />
              </div>
              <div className="row">
                <div className="col-md-5 mb-3">
                  <label htmlFor="country">Country</label>
                  <select
                    className="custom-select d-block w-100"
                    id="country"
                    required=""
                  >
                    <option>Choose...</option>
                    <option>United States</option>
                  </select>
                  <div className="invalid-feedback">
                    Please select a valid country.
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="state">State</label>
                  <select
                    className="custom-select d-block w-100"
                    id="state"
                    required=""
                  >
                    <option>Choose...</option>
                    <option>Texas</option>
                    <option>Illinois</option>
                    <option>Michiigan</option>
                    <option>Oklahoma</option>
                    <option>Colorado</option>
                  </select>
                  <div className="invalid-feedback">
                    Please provide a valid state.
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="zip">Zip</label>
                  <input
                    type="text"
                    className="form-control"
                    id="zip"
                    placeholder=""
                    required
                  />
                  <div className="invalid-feedback">Zip code required.</div>
                </div>
              </div>
              <hr className="mb-4"></hr>
              <button
                onClick={() => {setShow(!show); handleClick();} }
                id="toggle"
                className="btn btn-primary btn-lg btn-block"
                type="submit"
                style={{ marginBottom: "5%" }}>
                Purchase
              </button>
            </form>
          )}
        </div>
      </div>
      </div>
      {!show && (
            <section id="registerSection">
              <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                  <div
                    className="row d-flex justify-content-center align-items-center"
                    style={{ marginTop: "50px", marginBottom: "50px" }}
                  >
                    <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                      <div className="card">
                        <div className="card-body p-5">
                        <h2 className="text-uppercase text-center mb-5">Confirmation # {num} </h2>
                        <h2 className="text-uppercase text-center mb-5">Please Print Confirmation Page For You Records </h2>
                          <h2 className="text-uppercase text-center mb-5">
                            Thank You For Your Purchase!
                          </h2>
                          <form>
                            <div></div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
    </div>
  );
}
