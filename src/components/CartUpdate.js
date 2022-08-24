import React, {useState} from "react";
import { updateCartProdQuantity } from "../databaseAdapter";


export default function CartUpdate({product}){
    const [quantity, setQuantity] = useState(product.quantity)
    const id = product.id

 async function handleSubmit(event){
    event.preventDefault();
    const token = localStorage.getItem("token");
    alert("Quantity Updated")
    const response = await updateCartProdQuantity(quantity, id, token)
 }
    return (
        <form onSubmit ={handleSubmit}>
            <div>
            <label style={{color:"darkgray"}}> Quantity:</label>
               <input
                type = "number"
                placeholder = "quantity"
                style ={{width: "50px", border:"none", cursor:"pointer", marginLeft:"5px"}}
                value = {quantity}
                onChange = {(event)=>setQuantity(event.target.value)}></input>
            </div>
        </form>
    )
}