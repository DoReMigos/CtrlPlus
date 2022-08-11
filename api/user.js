const express = require("express");
const router = express.Router();
const { requireUser } = require("./utils");

const jwt = require("jsonwebtoken");

const {
  createUser,
  getUser,
  getUserById,
  getUserByEmail,
  getCartById
} = require("../db/models");


// POST /api/user/register
router.post("/register", async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const _user = await getUserByEmail(email);
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
      const user = await createUser({ email, password });
      const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET);
      res.send({ message: "Thank you for signing up!", token, user });
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

//POST /api/user/login
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both an Email and a Password",
    });
  }
  try {
    const user = await getUser({ email, password });
    if (!user) {
      next({
        name: "IncorrectCredentialsError",
        message: "Email or Password is Incorrect",
      });
    } else {
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET
      );
      res.send({ message: "you're logged in!", token, user });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// GET /api/users/me
router.get("/me", requireUser,  async (req, res, next) => {
    try{
      res.send(req.user);
    }catch(error){
      next(error)
    }
    })

//cannot finsih this because we need carts and cart products.
// GET /api/users/:email/carts
router.get("/:user_id/cart", requireUser, async (req, res, next) => {
    try{
      const {user_id} = req.params;
      const user = await getUserById(user_id);
      if (!user){
        next({
          name: "NO USER FOUND",
          message: "USER IS NOT FOUND!"
        });
      }
      if(req.user && user.id == req.user.id ){
        const carts = await getCartById({user_id});
        res.send(carts)
      }
    } catch(error){
      next(error)
    }
  })

  // GET /api/users/:user_idl/orders
  router.get("/:user_id/order", requireUser, async (req, res, next) => {
    try{
      const {user_id} = req.params;
      const user = await getUserById(user_id);
      if (!user){
        next({
          name: "NO USER FOUND",
          message: "USER IS NOT FOUND!"
        });
      }
      if(req.user && user.id == req.user.id ){
        const order = await getOrderById({user_id});
        res.send(order)
      }
    } catch(error){
      next(error)
    }
  })

  
  