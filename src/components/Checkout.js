import React, { useState } from "react";
import "./Checkout.css";
let Logo = require("./CtrlPlusLogo.png");


export default function Checkout() {
  const [show, setShow] = useState(true);

  return (
    <div>
    <div className="container" id="box">
      <div className="py-5 text-center">
     
        <img
          className="d=block mx-auto mb-4"
          src={Logo}
          style={{ width: "72px", height: "72px" }}
        ></img>
    
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
      <div className="row">
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
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="same-address"
                />
                <label className="custom-control-label" htmlFor="same-address">
                  Shipping address is the same as my billing address
                </label>
              </div>
              <hr className="mb-4"></hr>
              <h4 className="mb-3">Payment</h4>
              <div className="d-block my-3">
                <div className="custom-control custom-radio">
                  <input
                    id="credit"
                    name="paymentMethod"
                    type="radio"
                    className="custom-control-input"
                    required
                  />
                  <label className="custom-control-label" htmlFor="credit">
                    Credit card
                  </label>
                </div>
                <div className="custom-control custom-radio">
                  <input
                    id="debit"
                    name="paymentMethod"
                    type="radio"
                    className="custom-control-input"
                    required
                  />
                  <label className="custom-control-label" htmlFor="debit">
                    Debit card
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="cc-name">Name on card</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-name"
                    placeholder=""
                    required
                  />
                  <small className="text-muted">
                    Full name as displayed on card
                  </small>
                  <div className="invalid-feedback">
                    Name on card is required
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="cc-number">Credit card number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-number"
                    placeholder="Please Do Not Use Valid Information"
                    required
                  />
                  <div className="invalid-feedback">
                    Credit card number is required
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 mb-3">
                  <label htmlFor="cc-expiration">Expiration</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-expiration"
                    placeholder="Not A Real E-Commerce Website"
                    required
                  />
                  <div className="invalid-feedback">
                    Expiration date required
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="cc-cvv">CVV</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-cvv"
                    placeholder=""
                    required
                  />

                  <div className="invalid-feedback">Security code required</div>
                </div>
              </div>
              <hr className="mb-4"></hr>
              <button
                onClick={() => setShow(!show)}
                id="toggle"
                className="btn btn-primary btn-lg btn-block"
                type="submit"
                style={{ marginBottom: "5%" }}
              >
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
                          <h2 className="text-uppercase text-center mb-5">
                            Thank You For Your Purchase!
                          </h2>
                          <h2 className="text-uppercase text-center mb-5">Hope to see you back soon!</h2>
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
