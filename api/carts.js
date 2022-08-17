const express = require("express");
const apiRouter = express.Router();
const { requireUser } = require("./utils");
const { User, Cart, Order } = require("../db/models");

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

//getAllCarts across website hehe
apiRouter.get("/", async (req, res, next) => {
  try {
    const getAllCarts = await Cart.getAllCarts();
    console.log(getAllCarts);
    res.send(getAllCarts);
  } catch (error) {
    next(error);
  }
});

//grabbing current cart
apiRouter.get("/:id", requireUser, async (req, res, next) => {
  const { id } = req.user; //if trouble params
  try {
    const cart = await Cart.getCartById({ id });
    res.send(cart);
  } catch (error) {
    next(error);
  }
});

apiRouter.post("/");
apiRouter.patch("/");

module.exports = apiRouter