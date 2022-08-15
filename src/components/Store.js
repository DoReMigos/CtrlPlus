import React, { useState, useEffect } from "react";
import { getAllProducts } from "../databaseAdapter";

export default function Store({allProducts, setAllProducts}) {

    useEffect(() => {
        async function fetchProducts() {
            const returnProducts = await getAllProducts();
            setAllProducts(returnProducts)
 console.log(returnProducts)
        }
        fetchProducts();
    }, [])


    return (
<div>
      <h1>Store</h1>
      <div>
        {allProducts.length
          ? allProducts.map((products, index) => {
              return (
                <div key={index}>
                  <div>
                    <b>{products.title}</b>
                  </div>
                  <div>
                    <b>{products.price}</b> 
                  </div>
                  <div>
                    <b>Description</b> {products.description}
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
    )
}