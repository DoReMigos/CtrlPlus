import React, {useState} from "react";
import { updateProduct } from "../databaseAdapter";


<<<<<<< HEAD
export default function AdminUpdate({product}){
    const [price, setPrice] = useState(product.price)
    const [inventory, setInventory] = useState(product.inventory)
    const [category, setCategory] = useState(product.category)
    const [description, setDescription] = useState (product.description)
    const productId = product.id
=======
export default function AdminUpdate({products}){
    const [price, setPrice] = useState(products.price)
    const [inventory, setInventory] = useState(products.inventory)
    const [description, setdescription] = useState(products.description)
    const productId = products.id
>>>>>>> 03cb0414371683d76a792412e1320d929411d161

 async function handleSubmit(event){
    event.preventDefault();
    const token = localStorage.getItem("token");
    // alert("Admin Updated Product")
    const response = await updateProduct(productId,
        price,
        inventory,
<<<<<<< HEAD
        // category,
=======
>>>>>>> 03cb0414371683d76a792412e1320d929411d161
        description,
        token)
    window.location.reload(true);
 }
 console.log(price, inventory, description)
    return (
        <form onSubmit ={handleSubmit}>
            <div>
                <hr></hr>
                <label>Modify Price:</label>
                <input
                type = "text"
                placeholder = "Price"
                value = {price}
                style ={{width: "80px", cursor:"pointer", border:"none"}}
                onChange = {(event) => setPrice(event.target.value)}/>
                <hr></hr>
                <label> Modify Quantity:</label>
               <input
                type = "number"
                placeholder = "Inventory"
                value = {inventory}
<<<<<<< HEAD
                onChange = {(event)=>setInventory(event.target.value)}></input>
                {/* <input
                type = "text"
                placeholder = "Category"
                value = {category}
                onChange = {(event)=> setCategory(event.target.value)}></input> */}
                <input
                type = "text"
                placeholder = "Description"
                value = {description}
                onChange = {(event)=> setDescription(event.target.value)}></input>
=======
                style ={{width: "80px", cursor:"pointer", border:"none"}}
                onChange = {(event)=>setInventory(event.target.value)}/>
                <hr></hr>
                <label> Description:</label>
                <input
                type = "text"
                placeholder = "description"
                value = {description}
                style = {{border:"none"}}
                onChange = {(event)=> setdescription(event.target.value)}></input>
                <hr></hr>
            </div>
            <div style ={{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
            <button type="submit" className="btn btn-dark"  style ={{width: "80px", cursor:"pointer", marginBottom: "10px", marginTop:"10px"}} > Submit</button>
>>>>>>> 03cb0414371683d76a792412e1320d929411d161
            </div>
        </form>
    )
}