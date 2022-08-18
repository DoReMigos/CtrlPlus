import React, { useState, useEffect } from "react";
import { getAllProducts, getUserProfile, deleteProduct } from "../databaseAdapter";
import AdminUpdate from "./AdminUpdate"
import "./Store.css"

export default function Store({ userInfo, setUserInfo }) {
  const [allProducts, setAllProducts] = useState([]);


  useEffect(() => {
    async function fetchProducts() {
      const returnProducts = await getAllProducts();
      setAllProducts(returnProducts)
      console.log(returnProducts)
    }
    fetchProducts();
  }, [])


  useEffect(() => {
    let token = localStorage.getItem("token");
    console.log(token);
    async function getUserInfo() {
      try {
        const response = await getUserProfile(token)
        console.log(token);
        console.log(response, "Message Please Read");
        setUserInfo(response);
      } catch (error) {
        console.log(error)
      };

    }
    getUserInfo();
  }, []);

  async function handleDelete(productId) {
    const token = localStorage.getItem("token")
    const deleteProducts = await deleteProduct(token, productId)
    return deleteProducts
  }

  const isAdmin = userInfo.isAdmin
  console.log(userInfo, "this is userInfo on Store")
  console.log(isAdmin, "this is isAdmin on Store Page")

  return (
    <div>
      <h1 className="text-center">Store</h1>
      <div className="storeContainer">
        {allProducts.length
          ? allProducts.map((products, index) => {
            const productId = products.id
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


                      <div id="carouselExampleIndicators" className="carousel slide" data-mdb-ride="carousel">
                        <div className="carousel-indicators">
                          <button
                            type="button"
                            data-mdb-target="#carouselExampleIndicators"
                            data-mdb-slide-to="0"
                            className="active"
                            aria-current="true"
                            aria-label="Slide 1"
                          ></button>
                          <button
                            type="button"
                            data-mdb-target="#carouselExampleIndicators"
                            data-mdb-slide-to="1"
                            aria-label="Slide 2"
                          ></button>
                          <button
                            type="button"
                            data-mdb-target="#carouselExampleIndicators"
                            data-mdb-slide-to="2"
                            aria-label="Slide 3"
                          ></button>
                          <button
                            type="button"
                            data-mdb-target="#carouselExampleIndicators"
                            data-mdb-slide-to="3"
                            aria-label="Slide 4"
                          ></button>
                        </div>
                        <div className="carousel-inner">
                          <div className="carousel-item active">
                            <img src={products.image_1}
                              className="d-block w-100 object-cover object-center" height="300px" alt="img1" />
                          </div>
                          <div className="carousel-item">
                            <img src={products.image_2}
                              className="d-block w-100 object-cover object-center" alt="img2" />
                          </div>
                          <div className="carousel-item">
                            <img src={products.image_3}
                              className="d-block w-100 object-cover object-center" alt="img3" />
                          </div>
                          <div className="carousel-item">
                            <img src={products.image_4}
                              className="d-block w-100 object-cover object-center" alt="img4" />
                          </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-mdb-target="#carouselExampleIndicators" data-mdb-slide="prev">
                          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                          <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-mdb-target="#carouselExampleIndicators" data-mdb-slide="next">
                          <span className="carousel-control-next-icon" aria-hidden="true"></span>
                          <span className="visually-hidden">Next</span>
                        </button>
                      </div>

                      <div class="accordion accordion-flush" id="accordionFlushExample">
                        <div class="accordion-item">
                          <h2 class="accordion-header" id="flush-headingOne">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                              Description
                            </button>
                          </h2>
                          <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">{products.description}</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        {isAdmin ? (
                          <div class="accordion accordion-flush" id="flush-headingTwo">
                            <div class="accordion-item">
                              <h2 class="accordion-header" id="flush-headingOne">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseOne">
                                  Edit or Delete
                                </button>
                              </h2>
                              <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body"><div><AdminUpdate products={products} /><button onClick={() => { handleDelete(productId) }}>Delete product</button></div></div>
                              </div>
                            </div>
                          </div>







                        ) : null}
                      </div>
                    </div>
                  </div>




                </div>

              </div>
            );
          })
          : null}
      </div>
    </div>
  )
}