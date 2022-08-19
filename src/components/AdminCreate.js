import React, {useState} from "react";
import { createProduct } from "../databaseAdapter";


export default function AdminUpdate({allProducts}){
    const [title, setTitle] = useState(allProducts.title)
    const [brand, setBrand] = useState(allProducts.title)
    const [price, setPrice] = useState(allProducts.price)
    const [inventory, setInventory] = useState(allProducts.inventory)
    const [category, setCategory] = useState(allProducts.category)
    const [description, setDescription] = useState(allProducts.description)
    const [image_1, setImage_1] = useState(allProducts.image_1)
    const [image_2, setImage_2] = useState(allProducts.image_2)
    const [image_3, setImage_3] = useState(allProducts.image_3)
    const [image_4, setImage_4] = useState(allProducts.image_4)

 async function handleSubmit(event){
    event.preventDefault();
    const response = await createProduct(title, 
        brand,
        price,
        inventory,
        category,
        description, 
        image_1,
        image_2,
        image_3,
        image_4,
        )
    return response
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

        </form>
    )
}