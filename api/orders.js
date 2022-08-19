const express = require("express");
const apiRouter = express.Router();
const { requireUser } = require("./utils");
const {Order,Products, Cart} = require("../db/models");

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;


apiRouter.post('/:order_id', requireUser, async (req,res,next)=>{
  console.log("adding product order")
  const { productId, quantity,price } = req.body;
  const daatat = Cart.getCartByUserId(req.user.id)
  console.log(daatat,'getcartbyid')
  const cartId = daatat.id
  const data = {};
  const orderId = req.params.id 
  try {
    const product = await Products.getProductById(productId)
    console.log(product)
    const neworder = await Order.addProducttoCart({orderId, productId, quantity, price })
    console.log(neworder,'neworder')
    res.send(neworder)
    
  } catch (error) {
    console.log(error)
  }
})
//DELETE/api/cart/order_id
apiRouter.delete("/:order_id", requireUser, async (req, res, next) => {
  console.log("HELLO DELETE")
    const id = req.params.id
  try {
    const order = await Order.deleteCartProd(id);
    res.send(order);
  } catch (error) {
    console.log(error);
  }
});

module.exports = apiRouter