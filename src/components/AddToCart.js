import React, { useState, useEffect } from 'react'
import { addProductToCart,createCart,getUserCarts } from '../databaseAdapter'


export default function AddToCart({products, userInfo}){
    // const [userCart, setUserCart] = useState([])
    const [quantity, setQuantity] = useState(1)

    const price = products.price
    const productId = products.id
    // const quantity = products.quantity
    // console.log(order, 'orderddd')
    async function addProduct(){
        if(localStorage.getItem('products')){
            products = JSON.parse(localStorage.getItem('products'))
        }
        products.push({'productId': productId, image:'<iimageLink>'})
        localStorage.setItem('products', JSON.stringify(products));
        console.log(products, "THIS IS PRODUCTS FROM ADD TO CART!!")
    }
    async function handleAdd(){      
        const token = localStorage.getItem("token");
         const pdata = await getUserCarts(token, userInfo.id);
         // pdata.products.push(product)
         console.log(pdata, "dapafs");
         
            // const makeCart = await createCart(token, userInfo.id)
            // console.log(makeCart,'makenewcart')

    
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
        <div>
            <button onClick={()=>{addProduct()}} className="btn btn-dark" style ={{height: "35px", width:"110px"}}> Guest Add Cart</button>
            <button onClick={() => {handleAdd(productId)}} onChange = {(event)=>{setQuantity(event.target.value)}}  className="btn btn-dark" style ={{height: "35px", width:"110px"}}>Add to Cart</button> 
            </div>
    )
}

