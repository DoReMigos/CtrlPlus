import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile, getUserCarts, deleteCartProd, getAllProducts } from "../databaseAdapter";
import CartUpdate from "./CartUpdate"
import Checkout from './Checkout'
import { Link, useLinkClickHandler } from "react-router-dom";
import "./Cart.css"
// let navigate = useNavigate()
const Cart = ({ userInfo, setUserInfo }) => {
  const [userCart, setUserCart] = useState([]);
  const authorizationToken = localStorage.getItem("token") ? true : false;
  const [cartPrice, setCartPrice] = useState(0)
  let navigate = useNavigate();
  const token = localStorage.getItem('token')
  let guestCart = JSON.parse(localStorage.getItem("products"))
  console.log(userInfo, token);
  const getMyInfo = async () => {
    const response = await getUserProfile(token);
    console.log(token);
    console.log(response, "Message Please Read");
    setUserInfo(response);
    const datad = await getUserCarts(token, userInfo.id);
    setUserCart(datad);
    console.log(datad);
  };
  let total
  let amount
  let money = ''
  let alltotal = 0
  let final = 0

  useEffect(() => {

    getMyInfo();
  }, []);

  async function handleGuestDelete(productId) {
    let storageProducts = JSON.parse(localStorage.getItem('products'));
    let products = storageProducts.filter(product => product.productId !== productId);
    localStorage.setItem('products', JSON.stringify(products));
    window.location.reload(true);
  }

  async function handleDelete(id) {
    const token = localStorage.getItem("token")
    const deleteCartProducts = await deleteCartProd(id, token)
    window.location.reload(true);
  }
  console.log(handleDelete, "THIS IS DELETE CART PRODUCSTS LINE 25")

  async function handleCheckout(event, alltotal) {

    navigate("/Checkout")
  }
  console.log(
    handleCheckout,
    "THIS IS DELETE CART PRODUCSTS LINE 25",
    userCart,
    "USERCART"
  );
  async function handleDelete(id) {
    const token = localStorage.getItem("token")
    const deleteCartProducts = await deleteCartProd(id, token)
    window.location.reload(true);
  }
  console.log(handleDelete, "THIS IS DELETE CART PRODUCSTS LINE 25", userCart, 'USERCART')

  return (
    <>
      <section className='h-100 h-custom ' style={{ background: "black" }}>
        <div className='container py-5 h-100'>
          <div className='row d-flex justify-content-center align-items-center h-100' >
            <div className='col-12' >
              <div className='card-body p-0' >
                <div className='row g-0'>
                  <div className='col-lg-12' >
                    <h1 className='fw-bold mb-0 text-white text-center'>
                      Shopping Cart 
                    </h1>
                    <hr style={{color:"white"}}></hr>
                    <div className='p-3'>
                      <div className='d-flex justify-content-between align-items-center mb-4'>

                        {authorizationToken === true ? (
                          <div>
                            {userCart.map((element, index) => {
                              return (
                                <div
                                  className="card"
                                  key={element.id}
                                  style={{ background: "#212529" }}>
                                  {element.products.map((product, index) => {
                                    const id = product.id;
                                    total = product.price
                                    let arr4
                                    let cur_re =
                                      /\D*(\d+|\d.*?\d)(?:\D+(\d{2}))?\D*$/;
                                    let parts = cur_re.exec(total);
                                    let number = parseFloat(
                                      parts[1].replace(/\D/, "") +
                                      "." +
                                      (parts[2] ? parts[2] : "00")
                                    );
                                    let amount = product.quantity;
                                    let complete = number.toFixed(2) * amount;
                                    alltotal += complete
                                    let money = `$${complete.toFixed(2)}`;

                                    return (
                                      <>
                                        {authorizationToken === true ? (
                                          <div
                                            key={`${product.id}${index}`}
                                            className='card-body cartProducts'>
                                            <h4 id='MyTitle'
                                              style={{ border: 'thin 1px white', borderTopStyle: 'groove', borderTopColor: "white", color: "white" }}
                                            >
                                              {product.title}
                                            </h4>
                                            <hr style={{ color: "white" }}></hr>
                                            <div>
                                              <img
                                                src={product.image_1}
                                                className='img-fluid rounded-3'
                                                alt='Cotton T-shirt'
                                                style={{ objectFit: "cover", width:"100%", height:"300px"}}></img>
                                            </div>
                                            <div className="cartInformation">
                                              <div>
                                                <CartUpdate
                                                  product={product} />
                                                <h6
                                                  style={{
                                                    color: "red",
                                                    fontSize: "10px",
                                                    cursor: "pointer",
                                                  }}
                                                  onClick={() => {
                                                    handleDelete(id);
                                                  }}>
                                                  x remove product from cart
                                                </h6>
                                              </div>
                                              <div >
                                                <h6 style={{ color: "darkgray" }}>
                                                  Price:{product.price}
                                                </h6>
                                              </div>
                                            </div>
                                          </div>
                                        ) : null}
                                      </>)
                                  })}
                                </div>)

                            })}
                          </div>
                        ) :

                          guestCart.map((element, index) => {
                            let productId = element.productId

                            const id = productId;
                            total = element.price
                            let arr4
                            let cur_re =
                              /\D*(\d+|\d.*?\d)(?:\D+(\d{2}))?\D*$/;
                            let parts = cur_re.exec(total);
                            let number = parseFloat(
                              parts[1].replace(/\D/, "") +
                              "." +
                              (parts[2] ? parts[2] : "00")
                            );
                            let amount = element.quantity;
                            let complete = number.toFixed(2) * amount;
                            alltotal += complete
                            let money = `$${complete.toFixed(2)}`;

                            return (
                              <div
                                  className="card"
                                  key={element.id}
                                  style={{ background: "#212529"}}>
                                  <div
                                    key={`${element.id}`}
                                    className='card-body cartProducts'>
                                    <h4 id='MyTitle'
                                      style={{ border: 'thin 1px white', borderTopStyle: 'groove', borderTopColor: "white", color: "white" }}
                                    >
                                      {element.title}
                                    </h4>
                                    <hr style={{ color: "white" }}></hr>
                                    <div>
                                      <img
                                        src={element.image}
                                        className='img-fluid rounded-3'
                                        alt='Cotton T-shirt'
                                        style={{ objectFit: "cover", maxWidth: "700px", marginBottom:"5px" }}></img>
                                    </div>
                                    <div className="cartInformation">
                                      <div>
                                        {element.quantity}
                                        <h6
                                          style={{
                                            color: "red",
                                            fontSize: "10px",
                                            cursor: "pointer",
                                          }}
                                          onClick={() => {
                                            handleGuestDelete(productId);
                                          }}>
                                          x remove product from cart
                                        </h6>
                                      </div>
                                      <div >
                                        <h6 style={{ color: "darkgray" }}>
                                          Price:{element.price}
                                        </h6>
                                      </div>
                                    </div>
                                  </div>
                                  </div>
                            )
                          })

                        }

                        <div className='col-lg-3 bg-grey px-3'>
                          <div className='card bg-primary text-white rounded-3'>
                            <div className='card-body'>
                              <div className='d-flex justify-content-between align-items-center mb-4'>
                                <h5 className='mb-0'>Card details</h5>

                              </div>
                              <p>We accept</p>
                              <img
                                className='me-2'
                                width='45px'
                                src='https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg'
                              />
                              <img
                                className='me-2'
                                width='45px'
                                src='https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg'
                              />
                              <img
                                className='me-2'
                                width='45px'
                                src='https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg'
                              />
                              <form className='mt-4'>
                                <div className='form-outline form-white mb-4'>
                                  <input
                                    type='text'
                                    id='typeName'
                                    className='form-control form-control-lg'
                                    siez='17'
                                    placeholder="Cardholder's Name"
                                  />
                                  <label
                                    className='form-label'
                                    htmlFor='typeName'>
                                    Cardholder's Name
                                  </label>
                                </div>

                                <div className='form-outline form-white mb-4'>
                                  <input
                                    type='text'
                                    id='typeText'
                                    className='form-control form-control-lg'
                                    size='17'
                                    placeholder='1234 5678 9012 3457'
                                    minLength='19'
                                    maxLength='19'
                                  />
                                  <label
                                    className='form-label'
                                    htmlFor='typeText'>
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
                                        size='6'
                                        minLength='6'
                                        maxLength='6'
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

                              <div className='d-flex justify-content-between'>
                                <p className='mb-2'>Subtotal</p>
                                <p className='mb-2'>${alltotal + 1}</p>
                              </div>
                              <div className='d-flex justify-content-between'>
                                <p className='mb-2'>Shipping</p>
                                <p className='mb-2'>$10.00</p>
                              </div>

                              <div className='d-flex justify-content-between mb-4'>
                                <p className='mb-2'>Total(Incl. taxes)</p>
                                <p className='mb-2'>${(final = ((alltotal + 10) * 1.05).toFixed(2))}</p>
                              </div>

                              <button
                                type='btn'
                                className='btn btn-info btn-block btn-lg'
                                onClick={handleCheckout}>
                                <div className='d-flex justify-content-between'>
                                  <span>
                                  </span>
                                  <br>
                                  </br>
                                  <span>
                                    Checkout

                                    <i typeof="btn" className='fas fa-long-arrow-alt-right ms-2'></i>
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
  );
};
export default Cart;