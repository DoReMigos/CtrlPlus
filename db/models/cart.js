const { createRoutesFromChildren } = require("react-router-dom");
const client = require("../client");

async function createCart({ id, user_id, createdAt }) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
          INSERT INTO carts( "user_id", "created_at") 
          VALUES($1, DEFAULT) 
          
          RETURNING *
          ;
        `,
      [user_id]
    );
    return cart;
  } catch (error) {
    console.error(error);
  }
}

async function getCartById(id) {
  try {
    const {
      rows: [cart],
    } = await client.query(`
      SELECT *    
      FROM carts
      WHERE id=${id};
      `);
    return cart;
  } catch (error) {
    console.error(error);
  }
}

//   async function getRoutinesWithoutActivities() {
//     try {
//       const {
//         rows: [routine],
//       } = await client.query(`
//       SELECT *
//       FROM routines
//       WHERE NOT EXISTS (
//         SELECT RoutineActivities.id
//         FROM   RoutineActivities
//         WHERE  routines.id = RoutineActivities.id
//         );
//       `);
//       //maybe run, double check for sure
//       return routine;
//     } catch (error) {
//       console.error(error);
//     }
//   }

async function getAllCarts() {
  try {
    const { rows: carts } = await client.query(
      `SELECT carts.*, users.id AS "user_id"
      FROM carts
      JOIN users ON users.id=carts."user_id";
      `
    );
    const cart = await attachProductsToCarts(carts);
    return carts;
  } catch (error) {
    console.error(error);
  }
}

async function getAllCartsByUser({ email }) {
  try {
    const { rows } = await client.query(
      `SELECT carts.*, users.email AS "userName"
        FROM carts
        JOIN users ON users.id=carts."user_id"
        WHERE users.email=$1;
        `,
      [email]
    );
    const routines = await attachProductsToCarts(rows);

    return routines;
  } catch (error) {
    console.error(error);
  }
}
async function getCartsByUser({ email }) {
  try {
    const { rows } = await client.query(
      `SELECT carts.*, users.email AS "userName"
        FROM carts
        JOIN users ON users.id=carts."user_id"
        WHERE users.email=$1 AND "isPurchased"=false;
        `,
      [email]
    );
    const routines = await attachProductsToCarts(rows);

    return routines;
  } catch (error) {
    console.error(error);
  }
}

async function getCartByUserId({ id }) {
  try {
    const {
      rows
    } = await client.query(`
      SELECT carts.*, users.email AS "userName"  
      FROM carts
      JOIN users ON users.id=carts."user_id"
      WHERE carts."user_id"=$1 AND "isPurchased"=false;
      `, [id]);
    const routines = await attachProductsToCarts(rows);
    return routines;
  } catch (error) {
    console.error(error);
  }
}

async function attachProductsToCarts(carts) {
  // no side effects
  const cartsToReturn = [...carts];
  const binds = carts.map((_, index) => `$${index + 1}`).join(", ");
  const cartIds = carts.map((cart) => cart.id);
  if (!cartIds.length) return [];

  try {
    console.log(
      cartsToReturn,
      "cartsToReturn",
      binds,
      "binds",
      cartIds,
      "cartids"
    );
    const { rows: products } = await client.query(
      `
      SELECT products.*, cart_products.quantity, cart_products."purchased_price", cart_products.id, cart_products."order_id"
      FROM products 
      LEFT JOIN cart_products ON cart_products."product_id" = products.id
      WHERE cart_products."order_id" IN (${binds});
    `,
      cartIds
    );
  

    // loop over the routines
    for (const carts of cartsToReturn) {
      // filter the products to only include those that have this routineId
      console.log(
        products.forEach((element) => {
          console.log(element);
        })
      );
      const productsToAdd = products.filter(
        (product) => product.order_id === carts.id
      );
      console.log(productsToAdd),
        // attach the products to each single routine
        (carts.products = productsToAdd);
    }
    console.log(cartsToReturn, "cartsToReturn");
    return cartsToReturn;
  } catch (error) {
    console.error("Error during attachActivitiesToRoutines");
    throw error;
  }
}

async function getAllPurchasedCarts({id}) {
  try {
    const { rows } = await client.query(
      `SELECT carts.*, users.email AS "customerName"
      FROM carts
      JOIN users ON users.id=carts."user_id"
      JOIN cart_products ON cart_products."order_id"=carts.id
      WHERE cart_products."product_id"=$1 AND "isPurchased"=true;
      `,
      [id]
    );
    const carts = await attachProductsToCarts(rows);

    const newCart = carts.filter((cart) => {
      return cart.products.length > 1;
    });

    return newCart;
  } catch (error) {
    console.error(error);
  }
}
  async function updateCart({id, fields}) {
    const setString = Object.keys(fields)
      .map((key, index) => `"${key}"=$${index + 1}`)
      .join(", ");

    if (setString.length === 0) {
      return;
    }

    try {
      const {
        rows: [cart],
      } = await client.query(
        `
          UPDATE carts
          SET ${setString}
          WHERE id=${id}
          RETURNING *;
        `,
        Object.values(fields)
      );

      return cart;
    } catch (error) {
      console.error(error);
    }
  }

async function destroyCart(id) {
  try {
    await client.query(
      `
      DELETE FROM cart_products
      WHERE "order_id"=$1
    `,
      [id]
    );
    const {
      rows: [cart],
    } = await client.query(
      `
      DELETE FROM routines
      WHERE id=$1
      RETURNING *;
    `,
      [id]
    );
    return cart;
  } catch {
    throw error;
  }
}
module.exports = {
  // add your database adapter fns here
  getCartById,
  createCart,
  getAllCarts,
  getCartsByUser,
  attachProductsToCarts,
  destroyCart,
  getCartByUserId,
  getAllPurchasedCarts,
  updateCart,
};