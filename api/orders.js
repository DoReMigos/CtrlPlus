const express = require("express");
const apiRouter = express.Router();
const { requireUser } = require("./utils");
const {Order,Products, Cart} = require("../db/models");

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;


apiRouter.post('/:order_id', requireUser, async (req,res,next)=>{
  const { productId, quantity,price } = req.body;
  const daatat = Cart.getCartByUserId(req.user.id)
  const cartId = daatat.id
  const data = {};
 const orderId = req.params.order_id;
  let  = productId
  try {
    const neworder = await Order.addProducttoCart({orderId, productId, quantity, price})
    res.send(neworder)
    
  } catch (error) {
    console.log(error)
  }
})
//DELETE/api/cart/order_id
apiRouter.delete("/:order_id", requireUser, async (req, res, next) => { 
    const id = req.params.id
  try {
    const order = await Order.deleteCartProd(id);
    res.send(order);
  } catch (error) {
    console.log(error);
  }
});

module.exports = apiRouter