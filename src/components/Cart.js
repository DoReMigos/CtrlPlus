import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile, getUserCarts, deleteCartProd, getAllProducts } from "../databaseAdapter";
import CartUpdate from "./CartUpdate"
import Checkout from './Checkout'
import { Link, useLinkClickHandler} from "react-router-dom";
// let navigate = useNavigate()
const Cart = ({ userInfo, setUserInfo }) => {
  const [userCart, setUserCart] = useState([]);
  const authorizationToken = localStorage.getItem("token") ? true : false;
  const [cartPrice, setCartPrice] = useState(0)
  let navigate = useNavigate();
  const token = localStorage.getItem('token')
  let guestCart= JSON.parse(localStorage.getItem("products"))
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

  async function handleGuestDelete(productId){
    let storageProducts = JSON.parse(localStorage.getItem('products'));
    let products = storageProducts.filter(product => product.productId !== productId );
    localStorage.setItem('products', JSON.stringify(products));
    window.location.reload(true);
  }

  async function handleDelete(id){
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
  async function handleDelete(id){
    const token = localStorage.getItem("token")
    const deleteCartProducts = await deleteCartProd(id, token)
    window.location.reload(true);
  }
  console.log(handleDelete, "THIS IS DELETE CART PRODUCSTS LINE 25",userCart,'USERCART')

  return (
    <>
      <h1></h1>
      <section className='h-100 h-custom ' styles='background-color: #d2c9ff;'>
        <div className='container py-5 h-100'>
          <div className='row d-flex justify-content-center align-items-center h-100'>
            <div className='col-12'>
              <div
                // className='card card-registration card-registration-2'
                styles='border-radius: 15px;'>
                <div className='card-body p-0'>
                  <div className='row g-0'>
                    <div className='col-lg-12'>
                          <h1 className='fw-bold mb-0 text-black'>
                            Shopping Cart <h2 id='MyTitle'></h2>
                            <div>
                            <h4 id='subTitles'>
                              Here's your Cart: {userInfo.email}!
                            </h4></div>
                          </h1>
                      <div className='p-3'>
                        <div className='d-flex justify-content-between align-items-center mb-4'>
                        {/* ///RUBY ADDED THIS RECENTLY */}
                        {authorizationToken === true ? (
                          <div id='myroutines'>
                            {userCart.map((element, index) => {
                              return (
                                  <div
                                    className="card"
                                    key={element.id}
                                    id='routinesContainers'>
                                    {/* <UpdateRoutine routineId={element.id} />
                                     <DeleteRoutine routineId={element.id} /> */}
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
                                      console.log(number.toFixed(2));
                                      let amount = product.quantity;
                                      let complete = number.toFixed(2) * amount;
                                      alltotal += complete
                                      // awaitarr4.push(complete)
                                      let money = `$${complete.toFixed(2)}`;
                                      
                                      console.log(
                                        total,
                                        complete,
                                        amount,
                                        money,
                                        alltotal,
                                        "dddd"
                                      );

                                      return (
                                        <>
                                      {authorizationToken === true ? (
                                          <div
                                            key={`${product.id}${index}`}
                                            className='card-body cartProducts bg-grey'>
                                            <h4 id='MyTitle'
                                            className="bg-grey"
                                              style={{ border: 'thin 1px', borderTopStyle: 'groove', paddin:'10px'}}
                                            >
                                            {product.title}
                                          </h4><hr className='my-3'></hr><div className='row mb-4 d-flex justify-content-between align-items-center'>
                                            <div className='col-md-4col-lg-4 col-xl-3'>
                                              <img
                                                src={product.image_1}
                                                className='img-fluid rounded-3'
                                                alt='Cotton T-shirt'
                                                style={{ objectFit: "cover" }}></img>
                                            </div>
                                            <div className='col-md-2 col-lg-2 col-xl-2'>
                                              <h6 className='text-muted'>
                                                Brand: {product.brand}
                                              </h6>
                                              <h6 className='text-black mb-0'>
                                                {product.title}
                                              </h6>
                                            </div>
                                            <div className='col-md-4 col-lg-4 col-xl-3 d-flex'>
                                              <div styles='width: 50px;'>
                                                <h5 className='fw-normal mb-0 '>
                                                  Description:{" "}
                                                  <p className=' fw-light fs-sm overflow-y-scroll' style={{ height: '10rem', overflow: 'auto', fontSize: 'medium' }}>
                                                    {product.description}
                                                  </p>
                                                </h5>
                                                <h5 className='fw-bold mb-0 border'>
                                                  Quantity:{" "}
                                                  <CartUpdate
                                                    product={product} />
                                                </h5>
                                              </div>
                                            </div>
                                            <div className='col-md-2 col-lg-2 col-xl-2 offset-lg-1'>
                                              <h6 className='mb-0'>
                                                Price:{product.price}
                                              </h6>
                                            </div>
                                            <div className='col-md-1 col-lg-1 col-xl-1 text-end'>
                                              <a
                                                href='#!'
                                                className='text-muted'>
                                                <i className='fas fa-times'></i>
                                              </a>
                                              <h6
                                                style={{
                                                  color: "red",
                                                  fontSize: "25px",
                                                  cursor: "pointer",
                                                }}
                                                onClick={() => {
                                                  handleDelete(id);
                                                } }>
                                                X
                                              </h6>
                                              <div className="cart"></div>
                                            </div>
                                          </div>
                                        </div> 
                                          ) : null}
                                    </>)
                                    })}
                                  </div>)
                          
                                 
                            
                            })}
                            <div className='pt-4'>
                              <h6 className='mb-0'>
                                <a href='#!' className='text-body'>
                                  <i className='fas fa-long-arrow-alt-left me-2'></i>
                                  Back to shop
                                </a>
                              </h6>
                            </div>
                        </div>
                        // ruby added this recently
                        ) :  guestCart.map((element, index)=>{
                          let productId = element.productId
                          return(
                            <div key={`${element.id}`}>    
                            <h2>{element.title}</h2>
                            <img style = {{width: "100px"}}src = {element.image}/>
                            <h5>{element.price}</h5>   
                            <h5>{element.quantity}</h5>                            
                            <h4>{element.description}</h4>
                            <h6
                              style={{
                              color: "red",  
                              fontSize: "25px",
                              cursor: "pointer",
                              }}
                              onClick={() => {
                              handleGuestDelete(productId);
                              }}>
                              X
                            </h6>                            
                            </div>
                          )
                        })}

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
                                    <p className='mb-2'>${(final = ((alltotal+10)*1.05).toFixed(2))}</p>
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
        </div>
      </section>
    </>
  );
};
export default Cart;