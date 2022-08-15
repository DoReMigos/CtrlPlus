const client = require("../client");

async function createCart({ id, user_id, createdAt }) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
          INSERT INTO carts( "user_id", "created_at") 
          VALUES($1, $2) 
          RETURNING *;
        `,
      [user_id, createdAt]
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
    console.log(cart, "getallcarts attachProductsToCarts");
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

async function getCartsByUserId({ id }) {
  try {
    const { rows } = await client.query(
      `SELECT *
        FROM carts
        LEFT JOIN cart_products ON cart_products."order_id" = carts.id
        LEFT JOIN products ON products.id = cart_products."product_id"
        WHERE carts.user_id=$1 AND "isPurchased"=false;
        `,
      [id]
    );
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
    // get the activities, JOIN with routine_activities (so we can get a routineId), and only those that have those routine ids on the routine_activities join
    const { rows: products } = await client.query(
      `
      SELECT products.*, cart_products.quantity, cart_products."purchased_price", cart_products.id, cart_products."order_id"
      FROM products 
      LEFT JOIN cart_products ON cart_products."product_id" = products.id
      WHERE cart_products."order_id" IN (${binds});
    `,
      cartIds
    );
    // console.log( products, 'products')

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

// async function getPublicRoutinesByActivity({ id }) {
//   try {
//     const { rows } = await client.query(
//       `SELECT routines.*, users.username AS "creatorName", activities.id AS "thisisyourid"
//       FROM routines
//       JOIN users ON users.id=routines."creatorId"
//       JOIN activities ON activities.id=activities.id
//       WHERE activities.id=$1 AND "isPublic"=true;
//       `,
//       [id]
//     );
//     const routines = await attachActivitiesToRoutines(rows);

//     const newRoutine = routines.filter((routine) => {
//       return routine.activities.length > 1;
//     });

//     return newRoutine;
//   } catch (error) {
//     console.error(error);
//   }

//   async function updateRoutine({ id, ...fields }) {
//     const setString = Object.keys(fields)
//       .map((key, index) => `"${key}"=$${index + 1}`)
//       .join(", ");

//     if (setString.length === 0) {
//       return;
//     }

//     try {
//       const {
//         rows: [routine],
//       } = await client.query(
//         `
//           UPDATE routines
//           SET ${setString}
//           WHERE id=${id}
//           RETURNING *;
//         `,
//         Object.values(fields)
//       );

//       return routine;
//     } catch (error) {
//       console.error(error);
//     }
//   }

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
    return routine;
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
  getCartsByUserId,
};

//haha
