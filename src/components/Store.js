import React, { useState, useEffect } from "react";
import { getAllProducts } from "../databaseAdapter";
import "./Store.css"

export default function Store() {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const returnProducts = await getAllProducts();
      setAllProducts(returnProducts)
      console.log(returnProducts)
    }
    fetchProducts();
  }, [])


  return (

    <div className="storeContainer">
      {allProducts.length
        ? allProducts.map((products, index) => {
          return (
            <div key={index} className="mx-auto my-5">

              <div className="card productsCard">
                <div className="card-body d-flex flex-row">
                  <div>
                    <h5 className="card-title font-weight-bold mb-2">{products.title}</h5>
                    <div ></div>
                    <div className="card-text">{products.price}</div>
                  </div>
                </div>

                {/* <div id="carouselExampleIndicators" className="carousel slide" data-mdb-ride="carousel">
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
                        className="d-block w-100" alt="img1" />
                    </div>
                    <div className="carousel-item">
                      <img src={products.image_2}
                        className="d-block w-100" alt="img2" />
                    </div>
                    <div className="carousel-item">
                      <img src={products.image_3}
                        className="d-block w-100" alt="img3" />
                    </div>
                    <div className="carousel-item">
                      <img src={products.image_4}
                        className="d-block w-100" alt="img4" />
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
                </div> */}

                {/* <div className="card-body">
                  <p className="card-text collapse" id="collapseContent">
                    Recently, we added several exotic new dishes to our restaurant menu. They come from
                    countries such as Mexico, Argentina, and Spain. Come to us, have some wine and enjoy
                    our juicy meals from around the world.
                  </p>
                  <div className="d-flex justify-content-between">
                    <a className="btn btn-link link-danger p-md-1 my-1" data-mdb-toggle="collapse" href="#collapseContent"
                      role="button" aria-expanded="false" aria-controls="collapseContent">Read more</a>
                  </div>
                </div> */}
              </div>

            </div>
          );
        })
        : null}
    </div>



    // {/* <div>
    //       <h1>Store</h1>
    //       <div className=="productsContainer">
    //         {allProducts.length
    //           ? allProducts.map((products, index) => {
    //               return (
    //                 <div key={index}>
    //                   <div>
    //                     <b>{products.title}</b>
    //                   </div>
    //                   <div>
    //                     <b>{products.price}</b> 
    //                   </div>
    //                   <div>
    //                     <b>Description</b> {products.description}
    //                   </div>
    //                 </div>
    //               );
    //             })
    //           : null}
    //       </div>
    //     </div> */}
  )
}