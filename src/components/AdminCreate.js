// import React, {useState} from "react";
// import { createProduct } from "../databaseAdapter";


// export default function AdminUpdate({products}){
//     const [price, setPrice] = useState(products.price)
//     const [inventory, setInventory] = useState(products.inventory)
//     const [category, setCategory] = useState(products.category)
//     const productId = products.id

//  async function handleSubmit(event){
//     event.preventDefault();
//     const token = localStorage.getItem("token");
//     // alert("Admin Updated Product")
//     const response = await updateProduct(productId,
//         price,
//         inventory,
//         category,
//         token)
//         console.log(response, "THIS IS RESPONSE FOMR ADMIN UPDATE")
//     return response
//  }
//  console.log(price, inventory, category)
//     return (
//         <form onSubmit ={handleSubmit}>
//             <div>
//                 <input
//                 type = "text"
//                 placeholder = "Price"
//                 value = {price}
//                 onChange = {(event) => setPrice(event.target.value)}></input>
//                <input
//                 type = "number"
//                 placeholder = "Inventory"
//                 value = {inventory}
//                 onChange = {(event)=>setInventory(event.target.value)}></input>
//                 <input
//                 type = "text"
//                 placeholder = "Category"
//                 value = {category}
//                 onChange = {(event)=> setCategory(event.target.value)}></input>
//             </div>
//             <button type="submit">Submit changes</button>

//         </form>
//     )
// }