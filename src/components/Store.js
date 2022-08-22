import React, { useState, useEffect } from "react";
import { getAllProducts, getUserProfile, deleteProduct, getUserCarts } from "../databaseAdapter";
import AdminUpdate from "./AdminUpdate"
import AddToCart from "./AddToCart"
import "./Store.css"
import { addProductToCart } from "../databaseAdapter";
import LoadingScreen from "./Loading"
// import  AddToCart  from "./AddToCart"
// import handleAdd from "./AddToCart"
export default function Store({userInfo, setUserInfo}) {
  const [allProducts, setAllProducts] = useState([]);
  const [showEdit, setShowEdit] = useState(null)
  const [selectedPage, setSelectedPage] = useState(1)
  const [volumeSelect, setVolumeSelect] = useState(20)
  const [productsToShow, setProductsToShow] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function fetchProducts() {
      const returnProducts = await getAllProducts();
      
      setAllProducts(returnProducts)
      console.log(returnProducts)
     ;
    }
    setTimeout(() => setLoading(false), 2000)
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
function handleEditSelect(productId){
  setShowEdit(productId)
}
useEffect(()=>{
  if (allProducts.length) {
    const listOfProducts = allProducts.filter((_, index) =>{
      if (selectedPage == 1){
         return (volumeSelect - 1)*(selectedPage - 1) <= index && index < (volumeSelect)
        } else {
        return  (volumeSelect - 1)*(selectedPage - 1) < index && index < (volumeSelect)*(selectedPage)

      }
    })
    setProductsToShow(listOfProducts)
  }
},[allProducts])

  return (
    <>
    {loading === false ? 
    <div>
      <h1 className="text-center">Store</h1>
      {isAdmin ? (<AdminCreate allProducts={allProducts} setAllProducts={setAllProducts} />) : null}
      <div className="storeContainer">
        {productsToShow.length
          ? productsToShow.map((products, index) => {
            const productId = products.id
            return (
              <div key={`${products.id}`} className="mx-auto my-5">

                <div className="card productsCard">
                  <div className="card-body d-flex flex-row">
                    <div>
                      <h5 className="card-title font-weight-bold mb-2 text-center" style={{ height: "50px" }}>{products.title}</h5>
                      <div className="priceCartBar">
                        <div className="card-text">{products.price}</div>
                      <AddToCart products={products} userInfo={userInfo}/>
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

                      <div className="accordion accordion-flush" id="accordionFlushExample">
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="flush-headingOne">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                              Description
                            </button>
                          </h2>
                          <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">{products.description}</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        {isAdmin ? (

                          showEdit != products.id ?

                                <button onClick={() => handleEditSelect(products.id)}className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseOne">
                                  Edit or Delete
                                </button>
:
                                  <div>
                                    <AdminUpdate products={products} />
                                    <button onClick={() => { handleDelete(productId) }}>Delete product</button>
                                    <button onClick={() => { setShowEdit(null) }}>Hide Menu</button>
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
: <LoadingScreen />}
    </>
  )
}