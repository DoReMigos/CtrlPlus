import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile, getUserCarts, deleteCartProd } from "../databaseAdapter";
import CartUpdate from "./CartUpdate"

const Cart = ({ userInfo, setUserInfo }) => {
  const [userCart, setUserCart] = useState([]);
  let token = localStorage.getItem("token");
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
  useEffect(() => {
    getMyInfo();
  }, []);

  async function handleDelete(id){
    const token = localStorage.getItem("token")
    const deleteCartProducts = await deleteCartProd(id, token)
    return deleteCartProducts
  }
  console.log(handleDelete, "THIS IS DELETE CART PRODUCSTS LINE 25")

  //         <div id="myroutines">
  //             {userCart.map((element, index) => {
  //                 return (
  //                     <div key={`userCart${index}`} id="routinesContainers">
  //                         <h2 id="MyTitle">Active Cart</h2>
  //                         <h4 id="subTitles">Creator: {element.userName}</h4>
  //                         <h4 id="subTitles">Routine: {element.email}</h4>
  //                         <h4 id="subTitles">Goal: {element.id}</h4>
  //                         {/* <UpdateRoutine routineId={element.id} />
  //               <DeleteRoutine routineId={element.id} /> */}
  //                         {element.products.map((product, index) => {
  //                             let productId = product.id;
  //                             return (
  //                                 <div key={`myroutines${index}`}>
  //                                     <h2 id='MyTitle'>Active Activity</h2>
  //                                     <h4 id='subTitles'>Activity Name:{product.title}</h4>
  //                                     <h5 id='subTitles'>Brand: {product.brand}</h5>
  //                                     <h5 id='subTitles'>Description: {product.description}</h5>

  //                                     <h5 id='subTitles'>Count: {product.quantity}</h5>
  //                                     <h5 id='subTitles'>Price:{product.Price}</h5>
  //                                     <h5 id='subTitles'>
  //                                         Routine product ID: {product.order_id}
  //                                     </h5>
  //                                 </div>
  //                             );
  //                         })}
  //                     </div>
  //                 );
  //             })}
  //         </div>
  //     );
  // }
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
  // // }, []);
  // console.log(userInfo, 'userinfo')
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

  /* <div>
    <h1 className="text-center">Shop</h1>
    <div className="storeContainer">
        {userCart.length
            ?
            <div id="myroutines">
                {userCart.map((element, index) => {
                    return (
                        <div key={`userCart${index}`} id="routinesContainers">
                            <h2 id="MyTitle">Active Cart</h2>
                            <h4 id="subTitles">Creator: {element.userName}</h4>
                            <h4 id="subTitles">Routine: {element.email}</h4>
                            <h4 id="subTitles">Goal: {element.id}</h4>
                            {/* <UpdateRoutine routineId={element.id} />
              <DeleteRoutine routineId={element.id} /> */
  // <div className="mx-auto my-5">
  //     {element.products.map((product, index) => {
  //         let productId = product.id;
  //         return (
  //             <div key={`myroutines${index}`}>
  //                 <h2 id='MyTitle'>Active Activity</h2>
  //                 <h4 id='subTitles'>Activity Name:{product.title}</h4>
  //                 <h5 id='subTitles'>Brand: {product.brand}</h5>
  //                 <h5 id='subTitles'>Description: {product.description}</h5>

  //                 <h5 id='subTitles'>Count: {product.quantity}</h5>
  //                 <h5 id='subTitles'>Price:{product.Price}</h5>
  //                 <h5 id='subTitles'>
  //                     Routine product ID: {product.order_id}
  //                 </h5>
  //             </div>
  //         );
  //     })} */}

  return (
    <>
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

                          <div id='myroutines'>
                            {userCart.map((element, index) => {
                              return (
                                <>
                                  <div
                                    key={`userCart${index}`}
                                    id='routinesContainers'>
                                    <h2 id='MyTitle'>Active Cart</h2>
                                    <h4 id='subTitles'>
                                      Here's your Cart{" "}
                                      <h3>{element.userName}!</h3>
                                    </h4>
                                    {/* <UpdateRoutine routineId={element.id} />
                                     <DeleteRoutine routineId={element.id} /> */}
                                    {element.products.map((product, index) => {
                                      const id = product.id;

                                      return (
                                        <>
                                            <div
                                              className='cartProducts'
                                              key={`myroutines${index}`}>
                                              <h2 id='MyTitle'>
                                                {product.title}
                                              </h2>
                                              <hr className='my-4'></hr>
                                              <div className='row mb-4 d-flex justify-content-between align-items-center'>
                                                <div className='col-md-2 col-lg-2 col-xl-2'>
                                                  <img
                                                    src={product.image_1}
                                                    className='img-fluid rounded-3'
                                                    alt='Cotton T-shirt'></img>
                                                </div>
                                                <div className='col-md-3 col-lg-3 col-xl-3'>
                                                  <h6 className='text-muted'>
                                                    Brand: {product.brand}
                                                  </h6>
                                                  <h6 className='text-black mb-0'>
                                                    {product.title}
                                                  </h6>
                                                </div>
                                                <div className='col-md-3 col-lg-3 col-xl-2 d-flex'>
                                                  <div styles='width: 50px;'>
                                                    <h5 className='fw-normal mb-0'>
                                                      Description:{" "}
                                                      {product.description}
                                                    </h5>
                                                    <h5 className='fw-normal mb-0'>
                                                      Quantity:{" "}
                                                      <CartUpdate product={product}/>
                                                    </h5>
                                                  </div>
                                                </div>
                                                <div className='col-md-3 col-lg-2 col-xl-2 offset-lg-1'>
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
                      <button onClick={()=>{handleDelete(id)}}>Remove</button>

                                                </div>
                                              </div>
                                            </div>
                                        </>
                                      );
                                    })}
                                  </div>
                                </>
                              );
                            })}
                            <div className='pt-5'>
                              <h6 className='mb-0'>
                                <a href='#!' className='text-body'>
                                  <i className='fas fa-long-arrow-alt-left me-2'></i>
                                  Back to shop
                                </a>
                              </h6>
                            </div>

                            <div className='card bg-primary text-white rounded-3'>
                              <div className='card-body'>
                                <div className='d-flex justify-content-between align-items-center mb-4'>
                                  <h5 className='mb-0'>Card details</h5>
                                  {/* <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                                                                                                className="img-fluid rounded-3" styles="width: 45px;" alt="Avatar"></img> */}
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
                                      siez='17'
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
                                      <div className='form-outline form-white'>
                                        <input
                                          type='text'
                                          id='typeExp'
                                          className='form-control form-control-lg'
                                          placeholder='MM/YYYY'
                                          size='7'
                                          minLength='7'
                                          maxLength='7'
                                        />
                                        <label
                                          className='form-label'
                                          htmlFor='typeExp'>
                                          Expiration
                                        </label>
                                      </div>
                                    </div>
                                    <div className='col-md-6'>
                                      <div className='form-outline form-white'>
                                        <input
                                          type='password'
                                          id='typeText'
                                          className='form-control form-control-lg'
                                          placeholder='&#9679;&#9679;&#9679;'
                                          size='1'
                                          minLength='3'
                                          maxLength='3'
                                        />
                                        <label
                                          className='form-label'
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
                                  <p className='mb-2'>$0.00</p>
                                </div>

                                <div className='d-flex justify-content-between'>
                                  <p className='mb-2'>Shipping</p>
                                  <p className='mb-2'>$20.00</p>
                                </div>

                                <div className='d-flex justify-content-between mb-4'>
                                  <p className='mb-2'>Total(Incl. taxes)</p>
                                  <p className='mb-2'>$20.00</p>
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
        </div>
      </section>
    </>
  );
};
export default Cart;
