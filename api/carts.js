const express = require("express");
const apiRouter = express.Router();
const { requireUser } = require("./utils");
const [User, Cart, Order] = require("../db/models");

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

//getAllCarts across website hehe
apiRouter.get("/", async (req, res, next ) => {
    try {
        const getAllCarts = await Cart.getAllCarts()
        console.log(getAllCarts)
        res.send(getAllCarts)
    } catch (error) {
       next(error) 
    }
})

//grabbing current cart
apiRouter.get("/cart", requireUser, async (req, res, next) => {
    const {id} = req.user
    try {
        const Cart = await Cart.getCartById ({ id })
        res.send(Cart);
    } catch (error) {
        next(error)
    }
}
)
apiRouter.get("./cart")