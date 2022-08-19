const express = require("express");
const cartsRouter = express.Router();
const { requireUser } = require("./utils");
const {deleteCartProd, updateCartProdQuantity} = require("../db/models/cartProducts")
const { Order, Cart } = require("../db/models")

const {getAllUsers} = require("../db/models/users")
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

//getAllCarts across website hehe
cartsRouter.get("/", async (req, res, next) => {
  try {
    const getAllCarts = await Cart.getAllCarts();
    console.log(getAllCarts);
    res.send(getAllCarts);
  } catch (error) {
    next(error);
  }
});

//grabbing current cart
cartsRouter.get("/:id", requireUser, async (req, res, next) => {
  const { id } = req.user; //if trouble params
  try {
    const cart = await Cart.getCartByUserId({ id });
    console.log(cart,'cartlog')
    res.send(cart);
  } catch (error) {
    next(error);
  }
});

cartsRouter.delete("/:order_id", requireUser, async (req, res, next) => {
  const id = req.params.order_id
  console.log(req.params,"HELLO DELETE")
  
  try {
    const order = await deleteCartProd(id);
    res.send(order);
  } catch (error) {
    console.log(error);
  }
});

cartsRouter.post("/");

cartsRouter.patch("/:order_id", requireUser, async (req, res, next) =>{
  const id = req.params.order_id
  const quantity = req.body.quantity
try{
  const order = await updateCartProdQuantity(id, quantity)
  res.send(order)
}catch(error){
  next(error)
}
});


module.exports = cartsRouter
