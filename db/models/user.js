// grab our db client connection to use with our adapters
const client = require('../client');


module.exports = {
  // add your database adapter fns here
   getAllUsers, createUser

};
async function createUser({ email, password, isAdmin=false }) {
  // const SALT_COUNT = 10;
  // const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users(email, password, "isAdmin") 
        VALUES($1, $2, $3) 
        ON CONFLICT (email) DO NOTHING 
        RETURNING id, email, "isAdmin";
      `,
      [email, password, isAdmin]
    );

    return user;
  } catch (error) {
    console.error(error);
  }
}

async function getAllUsers() {
  try {
    const { rows } = await client.query(`
      SELECT *
      FROM users;
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}


