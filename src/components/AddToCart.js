import React, { useState } from "react";
import { addProductToCart, getUserCarts } from "../databaseAdapter";

export default function AddToCart({ products, userInfo }) {
  const authorizationToken = localStorage.getItem("token") ? true : false;
  const [quantity, setQuantity] = useState(1);
  const price = products.price;
  const productId = products.id;
  const description = products.description;
  const title = products.title;
  const image = products.image_1;

  async function addProduct() {
    let products = [];
    if (localStorage.getItem("products")) {
      products = JSON.parse(localStorage.getItem("products"));
    }
    products.push({
      productId: productId,
      title: title,
      price: price,
      description: description,
      image: image,
    });
    localStorage.setItem("products", JSON.stringify(products));
  }
  async function handleAdd() {
    const token = localStorage.getItem("token");
    const pdata = await getUserCarts(token, userInfo.id);

    console.log(pdata, "dapafs");

    let order_id = pdata[0].id;
    console.log(order_id);
    const response = await addProductToCart(
      productId,
      price,
      order_id,
      quantity,
      token
    );

    return response;
  }
  return (
    <div>
      {authorizationToken === true ? (
        <button
          onClick={() => {
            handleAdd(productId);
          }}
          onChange={(event) => {
            setQuantity(event.target.value);
          }}
          className="btn btn-dark"
          style={{ height: "35px", width: "110px" }}
        >
          Add to Cart
        </button>
      ) : (
        <button
          onClick={() => {
            addProduct();
          }}
          className="btn"
          style={{ height: "35px", width: "110px", backgroundColor:"black"}}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}
