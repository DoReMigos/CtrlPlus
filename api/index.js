const express = require('express');
const apiRouter = express.Router();

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const User = require("../db/models/users")
// const {getUserById} = require("../db/models");

apiRouter.get('/', (req, res, next) => {
  res.send({
    message: 'API is under construction!',
  });
});

apiRouter.get('/health', (req, res, next) => {
  res.send({
    healthy: true,
  });
});

apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await User.getUserById(id);
        console.log(JWT_SECRET, "MORTY MORTY MORTY MORTY")
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

apiRouter.use((req, res, next) => {
  if (req.user) {
    console.log("User is set:", req.user);
  }
  next();
});
// place your routers here

// ROUTER: /api/user
const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

// ROUTER: /api/products
const productsRouter = require('./products');
apiRouter.use('/products', productsRouter);
// const cartsRouter = require('./carts')
// apiRouter.use('./carts', cartsRouter)

apiRouter.use((error, req, res, next) => {
  res.send({
    name: error.name,
    message: error.message,
    error: error.message,
  });
});
module.exports = apiRouter;
