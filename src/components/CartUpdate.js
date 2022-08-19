import React, {useState} from "react";
import { updateCartProdQuantity } from "../databaseAdapter";


export default function CartUpdate({product}){
    const [quantity, setQuantity] = useState(product.quantity)
    const id = product.id

 async function handleSubmit(event){
    event.preventDefault();
    const token = localStorage.getItem("token");
    // alert("Admin Updated Product")
    const response = await updateCartProdQuantity(quantity, id, token)
        console.log(response, "THIS IS RESPONSE FOMR CART CARRTTTT UPDATE")
 }
//  console.log(id, quantity)
    return (
        <form onSubmit ={handleSubmit}>
            <div>
               <input
                type = "number"
                placeholder = "quantity"
                style ={{width: "50px"}}
                value = {quantity}
                onChange = {(event)=>setQuantity(event.target.value)}></input>
            </div>
        </form>
    )
}