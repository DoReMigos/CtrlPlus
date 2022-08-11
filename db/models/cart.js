const { client } = require('../client')
const { attachProductsToCarts } = require("./products");


async function createCart({ id, userId, createdAt }) {
    try {
      const {
        rows: [cart],
      } = await client.query(
        `
          INSERT INTO carts("id", "user_id", createdAt) 
          VALUES($1, $2, $3) 
          ON CONFLICT (name) DO NOTHING 
          RETURNING *;
        `,
        [id, userId, createdAt]
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
      const { rows } = await client.query(
        `SELECT carts.*, users.id AS "user_id"
      FROM carts
      JOIN users ON users.id=carts."user_id";
      `
      );
      const carts = await attachActivitiesToCarts(rows);
      return carts;
    } catch (error) {
      console.error(error);
    }
  }
  
//   async function getAllPublicRoutines() {
//     try {
//       const { rows } = await client.query(
//         `SELECT routines.*, users.username AS "creatorName"
//         FROM routines
//         JOIN users ON users.id=routines."creatorId"
//         WHERE "isPublic"=true;
//         `
//       );
//       const routines = await attachActivitiesToRoutines(rows);
//       return routines;
//     } catch (error) {
//       console.error(error);
//     }
//   }
  
//   async function getAllRoutinesByUser({ username }) {
//     try {
//       const { rows } = await client.query(
//         `SELECT routines.*, users.username AS "creatorName"
//         FROM routines
//         JOIN users ON users.id=routines."creatorId"
//         WHERE users.username=$1;
//         `,
//         [username]
//       );
//       const routines = await attachActivitiesToRoutines(rows);
  
//       return routines;
//     } catch (error) {
//       console.error(error);
//     }
//   }
  
//   async function getPublicRoutinesByUser({ username }) {
//     try {
//       const { rows } = await client.query(
//         `SELECT routines.*, users.username AS "creatorName"
//         FROM routines
//         JOIN users ON users.id=routines."creatorId"
//         WHERE users.username=$1 AND "isPublic"=true;
//         `,
//         [username]
//       );
//       const routines = await attachActivitiesToRoutines(rows);
  
//       return routines;
//     } catch (error) {
//       console.error(error);
//     }
//   }
  
//   async function getPublicRoutinesByActivity({ id }) {
//     try {
//       const { rows } = await client.query(
//         `SELECT routines.*, users.username AS "creatorName", activities.id AS "thisisyourid"
//         FROM routines
//         JOIN users ON users.id=routines."creatorId"
//         JOIN activities ON activities.id=activities.id
//         WHERE activities.id=$1 AND "isPublic"=true;
//         `,
//         [id]
//       );
//       const routines = await attachActivitiesToRoutines(rows);
  
//       const newRoutine = routines.filter((routine) => {
//         return routine.activities.length > 1;
//       });
  
//       return newRoutine;
//     } catch (error) {
//       console.error(error);
//     }
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
  
//   async function destroyRoutine(id) {
//     await client.query(
//       `
//       DELETE FROM RoutineActivities
//       WHERE "routineId"=$1
//     `,
//       [id]
//     );
//     const {
//       rows: [routine],
//     } = await client.query(
//       `
//       DELETE FROM routines
//       WHERE id=$1
//       RETURNING *;
//     `,
//       [id]
//     );
//     return routine;
//   }
module.exports = {
    // add your database adapter fns here
    getCartById, createCart, getAllCarts
}

//haha

