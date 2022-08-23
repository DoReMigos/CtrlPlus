import React, {useState} from "react";
import { updateProduct } from "../databaseAdapter";



export default function AdminUpdate({products}){
    const [price, setPrice] = useState(products.price)
    const [inventory, setInventory] = useState(products.inventory)
    const [description, setdescription] = useState(products.description)
    const productId = products.id

 async function handleSubmit(event){
    event.preventDefault();
    const token = localStorage.getItem("token");
    alert("Product updated!")
    const response = await updateProduct(productId,
        price,
        inventory,
        description,
        token)
    window.location.reload(true);
 }

    return (
        <form onSubmit ={handleSubmit}>
            <div>
                <hr></hr>
                <label>Modify Price:</label>
                <input
                type = "text"
                placeholder = "Price"
                value = {price}
                style ={{width: "80px", cursor:"pointer", border:"none", marginLeft:"5px"}}
                onChange = {(event) => setPrice(event.target.value)}/>
                <hr></hr>
                <label> Modify Quantity:</label>
               <input
                type = "number"
                placeholder = "Inventory"
                value = {inventory}
                style ={{width: "80px", cursor:"pointer", border:"none", marginLeft:"5px"}}
                onChange = {(event)=>setInventory(event.target.value)}/>
                <hr></hr>
                <label> Description:</label>
                <input
                type = "text"
                placeholder = "description"
                value = {description}
                style = {{height: "auto", border:"none", marginLeft:"5px"}}
                onChange = {(event)=> setdescription(event.target.value)}></input>
                <hr></hr>
            </div>
            <div style ={{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
            <button type="submit" className="btn btn-dark"  style ={{width: "80px", cursor:"pointer", marginBottom: "10px", marginTop:"10px"}} > Submit</button>
            </div>
        </form>
    )
}