import React, { useState, useEffect } from 'react'
import { addProductToCart,getUserCarts } from '../databaseAdapter'


export default function AddToCart({products, userInfo}){
    // const [userCart, setUserCart] = useState([])
    const price = products.price
    const productId = products.id
    const quantity = products.quantity
    // console.log(order, 'orderddd')
    async function handleAdd(){
        

        
       
        const token = localStorage.getItem("token");
         const pdata = await getUserCarts(token, userInfo.id);
         // pdata.products.push(product)
         console.log(pdata, "dapafs");
        // const price = event.target[0].value;
        console.log( productId, "ADD TO CART")
        let order_id = pdata[0].id
        console.log(order_id)
        const response = await addProductToCart(productId,
            price,order_id,quantity, token)
        console.log(response)
    
        return response
    }
    return(
           <button onClick={() => handleAdd(productId)}>Add to Cart</button> 

    )
}

