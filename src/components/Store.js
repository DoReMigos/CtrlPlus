import React, { useState, useEffect } from "react";
import { getAllProducts, getUserProfile, deleteProduct } from "../databaseAdapter";
import AdminUpdate from "./AdminUpdate";
import AdminCreate from "./AdminCreate";
import AddToCart from "./AddToCart"
import ImageSlider from "./ImageSlider";
import "./Store.css"
import LoadingScreen from "./Loading"
import Pagination from "./Pagination";

export default function Store({ userInfo, setUserInfo }) {
  const [allProducts, setAllProducts] = useState([]);
  const [showEdit, setShowEdit] = useState(null)
  const [showDescription, setShowDescription] = useState(null)
  const [showCreate, setShowCreate] = useState(false)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(16);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = allProducts.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(allProducts.length / recordsPerPage);


  useEffect(() => {
    async function fetchProducts() {
      const returnProducts = await getAllProducts();

      setAllProducts(returnProducts)
        ;
    }
    setTimeout(() => setLoading(false), 2000)
    fetchProducts();
  }, [])

  useEffect(() => {
    let token = localStorage.getItem("token");
    async function getUserInfo() {
      try {
        const response = await getUserProfile(token)
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

  const isAdmin = userInfo.isAdmin

  function handleEditSelect(productId) {
    setShowEdit(productId)
  }
  function handleDescriptionSelect(productId) {
    setShowDescription(productId)
  }

  function handleCreate() {
    setShowCreate(true)
  }

  return (
    <>
      {loading === false ?
        <div className="bg-dark">
          <h1 className="text-center" style={{ color: "white" }}>Store</h1>

          {isAdmin ? (
            showCreate ? <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <button onClick={() => { setShowCreate(false) }} className="btn btn-secondary">Hide Form</button>
              <AdminCreate allProducts={allProducts} setAllProducts={setAllProducts} />
            </div>
              :
              <div className="text-center">
                <button onClick={() => handleCreate()} className="btn btn-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseOne">
                  Create New Product
                </button>
              </div>
          ) : null}


          <div className="storeContainer bg-dark">
            {currentRecords.length
              ? currentRecords.map((products, index) => {
                const productId = products.id
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

                          <ImageSlider products={products} />

                          <div style={{ marginTop: "30px" }}>
                            {showDescription != products.id ?
                              <div className="text-center">
                                <button onClick={() => handleDescriptionSelect(products.id)} className="btn btn-dark" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseOne">
                                  Show Description
                                </button>
                              </div>
                              :
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div>{products.description}</div>
                                <button onClick={() => { setShowDescription(null) }} className="btn btn-dark">Hide Description</button>
                              </div>}
                          </div>

                          <div>
                            {isAdmin ? (

                              showEdit != products.id ?
                                <div className="text-center">
                                  <button onClick={() => handleEditSelect(products.id)} className="btn btn-dark" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseOne">
                                    Edit or Delete
                                  </button>
                                </div>
                                :
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                  <button onClick={() => { setShowEdit(null) }} className="btn btn-dark">Hide Menu</button>
                                  <AdminUpdate products={products} />
                                  <button onClick={() => { handleDelete(productId) }} className="btn btn-dark" style={{ marginBottom: "10px" }}>Delete product</button>
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

          <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />

        </div>
        : <LoadingScreen />}
    </>
  )
}