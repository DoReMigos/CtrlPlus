const apiRouter = require('express').Router();

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const {getUserById} = require("../db/module");

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

router.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await getUserById(id);
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

router.use((req, res, next) => {
  if (req.user) {
    console.log("User is set:", req.user);
  }

  next();
});
// place your routers here

// ROUTER: /api/user
const usersRouter = require('./user');
apiRouter.use('/user', usersRouter);

// ROUTER: /api/products
const productsRouter = require('./products');
apiRouter.use('/products', productsRouter);

apiRouter.use((error, req, res, next) => {
  res.send({
    name: error.name,
    message: error.message,
    error: error.message,
  });
});
module.exports = apiRouter;
