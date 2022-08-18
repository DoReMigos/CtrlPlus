import React, { useState, useEffect } from 'react'
import {  useNavigate  } from 'react-router-dom'
import { getUserProfile, getUserCarts } from "../databaseAdapter";




const Cart = ({ userInfo, setUserInfo }) => {
    const [userCart, setUserCart] = useState([])
    let token = localStorage.getItem("token");
    console.log(userInfo, token)
     const getMyInfo = async () => {
       const response = await getUserProfile(token);
       console.log(token);
        console.log(response, "Message Please Read");
        setUserInfo(response);
        const datad = await getUserCarts(token, userInfo.id)
         setUserCart(datad)
       console.log(datad);
     };;
     useEffect(() => {
       getMyInfo();
     }, []);

    //  const handleChange = () => {
       
    //  };

    //  const handleSubmit = async (event) => {
    //    event.preventDefault();
       
    //   ;
    //  };


    // useEffect(() => {
    //     let token = localStorage.getItem("token");
    //     console.log(token);
    //     async function getUserInfo() {
    //         try {
    //             const response = await getUserProfile(token);
    //             console.log(token);
    //             console.log(response, "Message Please Read");
    //             setUserInfo(response);
    //             const data = await getUserCarts(token, userInfo.id)
    //             console.log(data, 'getCartById data')
    //             setUserCart(data)

    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     getUserInfo();
    // }, []);
    console.log(userInfo, 'userinfo')
    // useEffect(() => {
    //     let token = localStorage.getItem("token");
    //     console.log(token);
    //     async function getUserCartInfo() {
    //         try {
    //             const data = await getUserCarts(token, userInfo.id);
    //             setUserCart(data);
    //             console.log(data, "getCartById data");
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     getUserCartInfo();
    // }, []);

    // let Navigate = useNavigate()
    // const handleClick = () => {

    // }

    return (

         <div>
      <h1 className="text-center">Shop</h1>
      <div className="storeContainer">
        {userCart.length
          ? userCart.products.map((products, index) => {
            console.log(products)
            return (
              <div key={index} className="mx-auto my-5">

                <div className="card productsCard">
                  <div className="card-body d-flex flex-row">
                    <div>
                      <h5 className="card-title font-weight-bold mb-2 text-center" style={{ height: "50px" }}>{products.title}</h5>
                      <div className="priceCartBar">
                        <div className="card-text">{products.price}</div>
                        <button>Add to Cart</button>
                      </div>

                        <div className="carousel-inner">
                          <div className="carousel-item active">
                            <img src={products.image_1}
                              className="d-block w-100 object-cover object-center" height="300px" alt="img1" />
                          </div>
                        </div>
                      </div>
                      <div>
                        {products.description}
                      </div>

                    </div>
                  </div>




                </div>

            );
          })
          : 
  


      (<>
        <h1>Cart gang</h1>
        <section className='h-100 h-custom' styles='background-color: #d2c9ff;'>
          <div className='container py-5 h-100'>
            <div className='row d-flex justify-content-center align-items-center h-100'>
              <div className='col-12'>
                <div
                  className='card card-registration card-registration-2'
                  styles='border-radius: 15px;'>
                  <div className='card-body p-0'>
                    <div className='row g-0'>
                      <div className='col-lg-8'>
                        <div className='p-5'>
                          <div className='d-flex justify-content-between align-items-center mb-5'>
                            <h1 className='fw-bold mb-0 text-black'>
                              Shopping Cart
                            </h1>
                            
                          { userCart.products.map( (cart, idx) => {
                            

                            
                            console.log(cart, idx, 'cart idx')
                            return (
                                <div
                                  className='cartProducts'
                                  key={cart.id}>
                                  <hr className='my-4'></hr>
                                  <div className='row mb-4 d-flex justify-content-between align-items-center'>
                                    <div className='col-md-2 col-lg-2 col-xl-2'>
                                      <img
                                        src={cart.image_1}
                                        className='img-fluid rounded-3'
                                        alt='Cotton T-shirt'></img>
                                    </div>
                                    <div className='col-md-3 col-lg-3 col-xl-3'>
                                      <h6 className='text-muted'>
                                        {cart.brand}
                                      </h6>
                                      <h6 className='text-black mb-0'>
                                        <cart.title/>
                                      </h6>
                                    </div>
                                    <div className='col-md-3 col-lg-3 col-xl-2 d-flex'>
                                      <div styles='width: 50px;'>
                                        <h5 className='fw-normal mb-0'>`Quantity: ${cart.quantity}`</h5>
                                      </div>
                                    </div>
                                    <div className='col-md-3 col-lg-2 col-xl-2 offset-lg-1'>
                                      <h6 className='mb-0'>
                                        Price:{cart.price}
                                      </h6>
                                    </div>
                                    <div className='col-md-1 col-lg-1 col-xl-1 text-end'>
                                      <a href='#!' className='text-muted'>
                                        <i className='fas fa-times'></i>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                          )  ;
                          })}
                         
                          <div className='pt-5'>
                            <h6 className='mb-0'>
                              <a href='#!' className='text-body'>
                                <i className='fas fa-long-arrow-alt-left me-2'></i>
                                Back to shop
                              </a>
                            </h6>
                          </div>
                        </div>

                        <div className='col-lg-4 bg-grey'>
                          <div className='card bg-primary text-white rounded-3'>
                            <div className='card-body'>
                              {<div className='d-flex justify-content-between align-items-center mb-4'>
                                <h5 className='mb-0'>Card details</h5>
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                                    className="img-fluid rounded-3" styles="width: 45px;" alt="Avatar"></img> 
                              </div>}

                              <p className='small mb-2'>Card type</p>
                              <a href='#!' type='submit' className='text-white'>
                                <i className='fab fa-cc-mastercard fa-2x me-2'></i>
                              </a>
                              <a href='#!' type='submit' className='text-white'>
                                <i className='fab fa-cc-visa fa-2x me-2'></i>
                              </a>
                              <a href='#!' type='submit' className='text-white'>
                                <i className='fab fa-cc-amex fa-2x me-2'></i>
                              </a>
                              <a href='#!' type='submit' className='text-white'>
                                <i className='fab fa-cc-paypal fa-2x'></i>
                              </a>

                              <form className='mt-4'>
                                <div className='htmlForm-outline htmlForm-white mb-4'>
                                  <input
                                    type='text'
                                    id='typeName'
                                    className='htmlForm-control htmlForm-control-lg'
                                    size='17'
                                    placeholder="Cardholder's Name"
                                  />
                                  <label className='htmlForm-label' htmlFor='typeName'>
                                    Cardholder's Name
                                  </label>
                                </div>

                                <div className='htmlForm-outline htmlForm-white mb-4'>
                                  <input
                                    type='text'
                                    id='typeText'
                                    className='htmlForm-control htmlForm-control-lg'
                                    size='17'
                                    placeholder='1234 5678 9012 3457'
                                    minLength='19'
                                    maxLength='19'
                                  />
                                  <label className='htmlForm-label' htmlFor='typeText'>
                                    Card Number
                                  </label>
                                </div>

                                <div className='row mb-4'>
                                  <div className='col-md-6'>
                                    <div className='htmlForm-outline htmlForm-white'>
                                      <input
                                        type='text'
                                        id='typeExp'
                                        className='htmlForm-control htmlForm-control-lg'
                                        placeholder='MM/YYYY'
                                        size='7'
                                        minLength='7'
                                        maxLength='7'
                                      />
                                      <label
                                        className='htmlForm-label'
                                        htmlFor='typeExp'>
                                        Expiration
                                      </label>
                                    </div>
                                  </div>
                                  <div className='col-md-6'>
                                    <div className='htmlForm-outline htmlForm-white'>
                                      <input
                                        type='password'
                                        id='typeText'
                                        className='htmlForm-control htmlForm-control-lg'
                                        placeholder='&#9679;&#9679;&#9679;'
                                        size='1'
                                        minLength='3'
                                        maxLength='3'
                                      />
                                      <label
                                        className='htmlForm-label'
                                        htmlFor='typeText'>
                                        Cvv
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </form>

                              <hr className='my-4'></hr>

                              {/* <div className='d-flex justify-content-between'>
                                <p className='mb-2'>Subtotal</p> */}
                                {/* <p className="mb-2">$4798.00{userCart.products.htmlForEach((e)=>{return e.quantity + e.price })}</p>
                              </div> */}

                              <div className='d-flex justify-content-between'>
                                <p className='mb-2'>Shipping</p>
                                <p className='mb-2'>$20.00</p>
                              </div>

                              <div className='d-flex justify-content-between mb-4'>
                                <p className='mb-2'>Total(Incl. taxes)</p>
                                <p className='mb-2'>$4818.00</p>
                              </div>

                              <button
                                type='button'
                                className='btn btn-info btn-block btn-lg'>
                                <div className='d-flex justify-content-between'>
                                  <span>$4818.00</span>
                                  <span>
                                    Checkout
                                    <i className='fas fa-long-arrow-alt-right ms-2'></i>
                                  </span>
                                </div>
                              </button>
                            </div>
                          </div>
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
      )}</div>
    </div>
)}

export default Cart;