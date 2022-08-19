const addProductToCart = document.getElementsByClassName()
import React, { useState, useEffect } from 'react'
import { addProductToCart } from '../databaseAdapter'

export default function AddToCart({products}){
    // const [userCart, setUserCart] = useState([])
    const [price, setPrice] = useState(products.price)
    const productId = products.id

    async function handleAdd(event){
        event.preventDefault();
        const token = localStorage.getItem("token");
        const response = await addProductToCart(productId,
            price,
            inventory)
        console.log(response)
        return response
    }
    return(
        <form onSubmit ={handleAdd}>
            
        </form>
    )
}

