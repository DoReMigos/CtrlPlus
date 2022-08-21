// import React, {useState} from "react";
// import { createProduct } from "../databaseAdapter";


export default function AdminCreate(){
    const [title, setTitle] = useState("")
    const [brand, setBrand] = useState("")
    const [price, setPrice] = useState("")
    const [inventory, setInventory] = useState("")
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [image_1, setImage_1] = useState("")
    const [image_2, setImage_2] = useState("")
    const [image_3, setImage_3] = useState("")
    const [image_4, setImage_4] = useState("")
    const[error,setError] = useState(null)

 async function handleSubmit(event){
    event.preventDefault();
    alert("New Product Added");
    const token = localStorage.getItem("token");
    const result = await createProduct({
        title, 
        brand,
        price,
        inventory,
        category,
        description, 
        image_1,
        image_2,
        image_3,
        image_4,
        token
    });
    window.location.reload(true);
    return result
 }

    return (
        <form className="text-center" onSubmit ={handleSubmit}>
            <div>
                <h6> Create New Product</h6>
            <input
                type = "text"
                placeholder = "Item Name*"
                required={true}
                onChange = {(event) => setTitle(event.target.value)}></input>
                <input
                type = "text"
                placeholder = "Brand*"
                required={true}
                onChange = {(event) => setBrand(event.target.value)}></input>
                <input
                type = "text"
                placeholder = "Price*"
                required={true}
                onChange = {(event) => setPrice(event.target.value)}></input>
               <input
                type = "number"
                placeholder = "Inventory*"
                required={true}
                onChange = {(event)=>setInventory(event.target.value)}></input>
                <input
                type = "text"
                placeholder = "Category*"
                required={true}
                onChange = {(event)=> setCategory(event.target.value)}></input>
                <input
                type = "text"
                placeholder = "Description*"
                required={true}
                onChange = {(event)=> setDescription(event.target.value)}></input>
                <input
                type = "text"
                placeholder = "Item image url"
                onChange = {(event)=> setImage_1(event.target.value)}></input>
                <input
                type = "text"
                placeholder = "Item image url"
                onChange = {(event)=> setImage_2(event.target.value)}></input>
                <input
                type = "text"
                placeholder = "Item image url"
                onChange = {(event)=> setImage_3(event.target.value)}></input>
                <input
                type = "text"
                placeholder = "Item image url"
                onChange = {(event)=> setImage_4(event.target.value)}></input>
            </div>
            <button type="submit">Create item</button>

//         </form>
//     )
// }