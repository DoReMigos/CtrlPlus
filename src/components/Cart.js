import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'


const Cart = () => {
    let Navigate = useNavigate()
    const handleClick = () =>{
        
    }

    return (
        <><h1>Cart gang</h1>
        <section className="h-100 h-custom" styles="background-color: #d2c9ff;">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12">
        <div className="card card-registration card-registration-2" styles="border-radius: 15px;">
          <div className="card-body p-0">
            <div className="row g-0">
              <div className="col-lg-8">
                <div className="p-5">
                  <div className="d-flex justify-content-between align-items-center mb-5">
                    <h1 className="fw-bold mb-0 text-black">Shopping Cart</h1>
                    <h6 className="mb-0 text-muted">3 items</h6>
                  </div>
                  <hr className="my-4"></hr>

                  <div className="row mb-4 d-flex justify-content-between align-items-center">
                    <div className="col-md-2 col-lg-2 col-xl-2">
                      <img
                        src="https://assets3.razerzone.com/aK_j7NsBW5QYzSNakwj7KAWfKt0=/1500x1000/https%3A%2F%2Fhybrismediaprod.blob.core.windows.net%2Fsys-master-phoenix-images-container%2Fh55%2Fh76%2F9081449447454%2Fbasilisk-ultimate-gallery-1.jpg"
                        className="img-fluid rounded-3" alt="Cotton T-shirt"></img>
                    </div>
                    <div className="col-md-3 col-lg-3 col-xl-3">
                      <h6 className="text-muted">Type</h6>
                      <h6 className="text-black mb-0">Name of Item</h6>
                    </div>
                    <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                    <div styles="width: 50px;">
                          <h5 className="fw-normal mb-0">#</h5>
                        </div>
                    </div>
                    <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                      <h6 className="mb-0">Price</h6>
                    </div>
                    <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                    <button type="button" className="btn btn-danger btn-sm">Remove</button>
                    </div>
                  </div>

                  <hr className="my-4"></hr>

                  <div className="row mb-4 d-flex justify-content-between align-items-center">
                    <div className="col-md-2 col-lg-2 col-xl-2">
                      <img
                        src="https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6425/6425365_bd.jpg"
                        className="img-fluid rounded-3" alt="Cotton T-shirt"></img>
                    </div>
                    <div className="col-md-3 col-lg-3 col-xl-3">
                      <h6 className="text-muted">Type</h6>
                      <h6 className="text-black mb-0">Name of Item</h6>
                    </div>
                    <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                    <div styles="width: 50px;">
                         <h5 className="fw-normal mb-0">#</h5>
                        </div> 
                    </div>
                    <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                      <h6 className="mb-0">Price</h6>
                    </div>
                    <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                    <button type="button" className="btn btn-danger btn-sm">Remove</button>
                    </div>
                  </div>

                  <hr className="my-4"></hr>

                  <div className="row mb-4 d-flex justify-content-between align-items-center">
                    <div className="col-md-2 col-lg-2 col-xl-2">
                      <img
                        src="https://m.media-amazon.com/images/I/51jkxo3a7bL._AC_SL1000_.jpg"
                        className="img-fluid rounded-3" alt="Cotton T-shirt"></img>
                    </div>
                    <div className="col-md-3 col-lg-3 col-xl-3">
                      <h6 className="text-muted">Item</h6>
                      <h6 className="text-black mb-0">Name of Item</h6>
                    </div>
                    <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                    <div styles="width: 50px;">
                         <h5 className="fw-normal mb-0">#</h5>
                        </div>
                    </div>
                    <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                      <h6 className="mb-0">Price</h6>
                    </div>
                    <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                    <button type="button" className="btn btn-danger btn-sm">Remove</button>
                    </div>
                  </div>

                  <hr className="my-4"></hr>

                  <div className="pt-5">
                    <h6 className="mb-0"><a href="/store" className="text-body">Back to shop</a></h6>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 bg-grey">

                <div className="card bg-primary text-white rounded-3">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h5 className="mb-0">Card details</h5>
                      {/* <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                        className="img-fluid rounded-3" styles="width: 45px;" alt="Avatar"></img> */}
                    </div>
                    <p>We accept</p>
                      <img className="me-2" width="45px"
                        src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"/>
                      <img className="me-2" width="45px"
                        src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"/>
                      <img className="me-2" width="45px"
                        src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"/>
                    <form className="mt-4">
                      <div className="form-outline form-white mb-4">
                        <input type="text" id="typeName" className="form-control form-control-lg" siez="17"
                          placeholder="Cardholder's Name" />
                        <label className="form-label" htmlFor="typeName">Cardholder's Name</label>
                      </div>

                      <div className="form-outline form-white mb-4">
                        <input type="text" id="typeText" className="form-control form-control-lg" siez="17"
                          placeholder="1234 5678 9012 3457" minLength="19" maxLength="19" />
                        <label className="form-label" htmlFor="typeText">Card Number</label>
                      </div>

                      <div className="row mb-4">
                        <div className="col-md-6">
                          <div className="form-outline form-white">
                            <input type="text" id="typeExp" className="form-control form-control-lg"
                              placeholder="MM/YYYY" size="7" minLength="7" maxLength="7" />
                            <label className="form-label" htmlFor="typeExp">Expiration</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-outline form-white">
                            <input type="password" id="typeText" className="form-control form-control-lg"
                              placeholder="&#9679;&#9679;&#9679;" size="1" minLength="3" maxLength="3" />
                            <label className="form-label" htmlFor="typeText">Cvv</label>
                          </div>
                        </div>
                      </div>

                    </form>

                    <hr className="my-4"></hr>

                    <div className="d-flex justify-content-between">
                      <p className="mb-2">Subtotal</p>
                      <p className="mb-2">$0.00</p>
                    </div>

                    <div className="d-flex justify-content-between">
                      <p className="mb-2">Shipping</p>
                      <p className="mb-2">$20.00</p>
                    </div>

                    <div className="d-flex justify-content-between mb-4">
                      <p className="mb-2">Total(Incl. taxes)</p>
                      <p className="mb-2">$20.00</p>
                    </div>

                    <a className="btn btn-info btn-lg px-4 me-sm-3" href="/profile">Checkout</a>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
        </>
    )
}

export default Cart;