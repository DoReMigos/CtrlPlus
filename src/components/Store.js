import React, { useState, useEffect } from "react";
import { getAllProducts, getUserProfile, deleteProduct, getUserCarts } from "../databaseAdapter";
import AdminUpdate from "./AdminUpdate";
import AdminCreate from "./AdminCreate";
import AddToCart from "./AddToCart"
import ImageCarousel from "./ImageCarousel"
import "./Store.css"
import { addProductToCart } from "../databaseAdapter";
import LoadingScreen from "./Loading"
// import  AddToCart  from "./AddToCart"
// import handleAdd from "./AddToCart"

export default function Store({ userInfo, setUserInfo }) {
  const [allProducts, setAllProducts] = useState([]);
  const [showEdit, setShowEdit] = useState(null)
  const [showDescription, setShowDescription] = useState(null)
  const [selectedPage, setSelectedPage] = useState(1)
  const [volumeSelect, setVolumeSelect] = useState(40)
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
    window.location.reload(true);
  }

  async function handleClick1(event) {
    event.preventDefault()
    setSelectedPage(1);
  }

  async function handleClick2(event) {
    event.preventDefault()
    setSelectedPage(2);
  }

  async function handleClick3(event) {
    event.preventDefault()
  }

  async function handleClick4(event) {
    event.preventDefault()
  }
  

  const isAdmin = userInfo.isAdmin
  console.log(userInfo, "this is userInfo on Store")
  console.log(isAdmin, "this is isAdmin on Store Page")
  function handleEditSelect(productId) {
    setShowEdit(productId)
  }
  function handleDescriptionSelect(productId) {
    setShowDescription(productId)
  }

  useEffect(() => {
    if (allProducts.length) {
      const listOfProducts = allProducts.filter((_, index) => {
        if (selectedPage == 1) {
          return (volumeSelect - 1) * (selectedPage - 1) <= index && index < (volumeSelect)
        } else {
          return (volumeSelect - 1) * (selectedPage - 1) < index && index < (volumeSelect) * (selectedPage)

        }
      })
      setProductsToShow(listOfProducts)
    }
  }, [allProducts])



  return (
    <>
      {loading === false ?
        <div className="bg-dark">
          <h1 className="text-center" style={{ color: "white" }}>Store</h1>
          {isAdmin ? (<AdminCreate allProducts={allProducts} setAllProducts={setAllProducts} />) : null}
          <div className="storeContainer bg-dark">
            {productsToShow.length
              ? productsToShow.map((products, index) => {
                const productId = products.id
                const slides = [
                  products.image_1,
                  products.image_2,
                  products.image_3,
                  products.image_4
                ]
                return (
                  <div key={`${products.id}`} className="mx-auto my-5">

                    <div className="card productsCard" style={{ background: "gray" }}>
                      <div className="card-body d-flex flex-row">
                        <div>
                          <h5 className="card-title font-weight-bold mb-2 text-center" style={{ height: "50px" }}>{products.title}</h5>
                          <div className="priceCartBar">
                            <div className="card-text">{products.price}</div>
                            <AddToCart products={products} userInfo={userInfo} />
                          </div>

                          <ImageCarousel products={products} />

                          <div style={{ marginTop: "30px" }}>
                            {showDescription != products.id ?
                              <button onClick={() => handleDescriptionSelect(products.id)} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseOne">
                                Description
                              </button>
                              :
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div>{products.description}</div>
                                <button onClick={() => { setShowDescription(null) }} className="btn btn-dark">Hide Description</button>
                              </div>}
                          </div>



                          <div>
                            {isAdmin ? (

                              showEdit != products.id ?
                                <button onClick={() => handleEditSelect(products.id)} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseOne">
                                  Edit or Delete
                                </button>
                                :
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                  <button onClick={() => { handleDelete(productId) }} className="btn btn-dark" style={{ marginBottom: "10px" }}>Delete product</button>
                                  <AdminUpdate products={products} />
                                  <button onClick={() => { setShowEdit(null) }} className="btn btn-dark">Hide Menu</button>
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

          <div className="pagination">
            {/* {selectedPage === 1 ? ( */}
              <div>
                <button onClick={ handleClick1 }>1</button>
                <button onClick={ handleClick2 }>2</button>
                <button onClick={ handleClick3 }>3</button>
                <button onClick={ handleClick4 }>4</button>
              </div>
            {/* ) : null
            } */}
          </div>
          {/* create buttons for page numbers/previous/next
            onClick for specific numbers goes into a handleClick function that will set selected page as the template literal for the selected page
            previous and next buttons will +-1 for selected page, but need edge cases if you're on the first page or last page that it disables the prev or next button -- this is probably extra but looks nice. can technically do this just with the numbers and no prev/next if it's too time consuming/difficult.
         */}


        </div>
        : <LoadingScreen />}
    </>
  )
}