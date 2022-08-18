const express = require("express");
const apiRouter = express.Router();
const { requireUser } = require("./utils");
const {Order} = require("../db/models");

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

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