import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile, getUserCarts, deleteCartProd, getAllProducts } from "../databaseAdapter";
import CartUpdate from "./CartUpdate"
import Checkout from './Checkout'
import { Link, useLinkClickHandler} from "react-router-dom";
// let navigate = useNavigate()
const Cart = ({ userInfo, setUserInfo }) => {
  let token = localStorage.getItem("token");
  
  const [userCart, setUserCart] = useState([]);
  const [cartPrice, setCartPrice] = useState(0)
  // const promise = getUserProfile(token)
  // const promiseCart = getUserCarts(token, userInfo.id);
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

  //  useEffect(() => {
  //    promise.then((data) => {
  //     console.log(data, 'data')
  //      setUserInfo(data.user);
  //      setUserCart(data.products);
  //    });
  //  }, []);
  //   console.log(price,'price')
  // const necart = Promise.resolve(cartPriceTotal())
  useEffect(() => {
    
    getMyInfo();
    // cartPriceTotal();
    
    
  }, []);
// let total
//     let amount
  
 
//   async function cartPriceTotal(){
//     try {
//        const arr11 = userCart.copyWithin();
//  let alltotal=0
//        console.log(userCart, arr11, "userCart");
//        let arr2 = await JSON.parse(JSON.stringify(userCart));
//        setTimeout(() => 1000);
//        if (arr2.length) {
         
//        arr11[0].products.forEach((element) => {
//          let total = element.price;
//          let cur_re = /\D*(\d+|\d.*?\d)(?:\D+(\d{2}))?\D*$/;
//          let parts = cur_re.exec(total);
//          let number = parseFloat(
//            parts[1].replace(/\D/, "") + "." + (parts[2] ? parts[2] : "00")
//          );
//          console.log(number.toFixed(2));
//          let amount = element.quantity;
//          let complete = number.toFixed(2) * amount;
//          alltotal += complete;
//          let money = `$${complete.toFixed(2)}`;
        

//          console.log(total, complete, amount, money,alltotal, "dddd");

//          console.log("total:");
//          let arr3 = element.products;
//          let cost = arr2[0].products[0].price;
//          setCartPrice(alltotal)
//          console.log(cost, arr2, "cost");
//         return alltotal
//        })};
      
//     } catch (error) {
//       console.log(error)
//     }
  
//   }
  // useEffect(() => {
    
  //   cartPriceTotal()
  //    let bigmoney = cartPriceTotal();
  //    setCartPrice(bigmoney);
  //    let arr4 = [];
  //    console.log(bigmoney, cartPrice);
  //  }, [userCart]);

  // cartPriceTotal()
  async function handleCheckout(event, alltotal) {
    //  useLinkClickHandler({ To: "/Checkout" }, alltotal);
    // const token = localStorage.getItem("token");
    // const navigate = useNavigate('/Checkout')
    // navigate('/Checkout')
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
                            <div className='col-lg-3 bg-grey px-3'>
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
                                    <p className='mb-2'>$20.00</p>
                                  </div>

                                  <button
                                    type='button'
                                    className='btn btn-info btn-block btn-lg'
                                    onClick={(e)=> handleCheckout(e,alltotal) }>
                                    <div className='d-flex justify-content-between'>
                                    <span>${alltotal+20+10}</span> <br></br>
                                      <span>
                                        Checkout
                                        <Link to="/Checkout"></Link>
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