const express = require("express");
const apiRouter = express.Router();
const { requireUser } = require("./utils");
const User = require("../db/models/users")

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
console.log(JWT_SECRET, "USER FILE JWT SECRET")
const {
  // createUser,
  // getUser,
  // getUserById,
  // getUserByEmail,
  // getCartsByUser
} = require("../db/models");


// POST /api/user/register
apiRouter.post("/register", async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const _user = await User.getUserByEmail(email);
      if (_user) {
        next({
          name: "UserExistsError",
          message: `User ${email} is already taken.`,
        });
      }
      if (password.length < 8) {
        next({
          name: `Password needs adjustment`,
          message: "Password Too Short!",
        });
      }
      const user = await User.createUser({ email, password });
      const token = jwt.sign({ id: user.id, email }, JWT_SECRET);
      res.send({ message: "Thank you for signing up!", token, user });
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

//POST /api/user/login
apiRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  //request must have either or.
  if (!email || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both an Email and a Password",
    });
  }
  try {
    const user = await User.getUser({ email, password });
    if (!user) {
      next({
        name: "IncorrectCredentialsError",
        message: "Email or Password is Incorrect",
      });
    } else {
      const token = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET
      );
      res.send({ message: "you're logged in!", token, user });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// GET /api/users/me
apiRouter.get("/me", requireUser,  async (req, res, next) => {
    try{
      console.log(req.user, "User in USERjs")
      res.send(req.user);
    }catch(error){
      next(error)
    }
    })

//cannot finsih this because we need carts and cart products.
// GET /api/users/:email/carts
apiRouter.get("/:email/cart", requireUser, async (req, res, next) => {
    try{
      const {email} = req.params;
      const user = await User.getUserByEmail(email);
      if (!user){
        next({
          name: "NO USER FOUND",
          message: "USER IS NOT FOUND!"
        });
      }
      if(req.user && user.id == req.user.id ){
        const carts = await User.getCartsByUser({email:email});
        res.send(carts)
      }
    } catch(error){
      next(error)
    }
  })


  //still in progress!!!!
  // GET /api/users/:user_idl/orders
  apiRouter.get("/:email/order", requireUser, async (req, res, next) => {
    try{
      const {email} = req.params;
      const user = await User.getUserByEmail(email);
      if (!user){
        next({
          name: "NO USER FOUND",
          message: "USER IS NOT FOUND!"
        });
      }
      if(req.user && user.id == req.user.id ){
        const order = await User.getOrderById({email});
        res.send(order)
      }
    } catch(error){
      next(error)
    }
  })

  module.exports = apiRouter;
  
  