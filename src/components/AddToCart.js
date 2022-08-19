import React, { useState, useEffect } from 'react'
import { addProductToCart } from '../databaseAdapter'


export default function AddToCart({products}){
    // const [userCart, setUserCart] = useState([])
    const price = products.price
    const productId = products.id
    async function handleAdd(){

        
        console.log()
        // const token = localStorage.getItem("token");
        // const price = event.target[0].value;
        console.log( productId, "ADD TO CART")
        

        const response = await addProductToCart(productId,
            price)
        console.log(response)
    
        return response
    }
    return(
           <button onClick={() => handleAdd(productId)}>Add to Cart</button> 

    )
}

