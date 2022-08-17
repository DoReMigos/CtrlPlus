const client = require("../client");
const bcrypt = require("bcrypt");

async function createUser({ email, password, isAdmin = false }) {
  const SALT_COUNT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
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
      [email, hashedPassword, isAdmin]
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

async function getUser({ email, password }) {
  const user = await getUserByEmail(email);
  const hashedPassword = user.password;
  const passwordsMatch = await bcrypt.compare(password, hashedPassword);
  if (passwordsMatch) {
    delete user.password;
    return user;
  } else if (!passwordsMatch) {
    return;
  } else {
    throw console.log("Thers an error in GetUser");
  }
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT id, email, "isAdmin"
      FROM users
      WHERE id=$1
    `,
      [userId]
    );
    if (!user) return null
    return user
  } catch (error) {
    throw error;
  }
}

async function getUserByEmail(email) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT *
      FROM users
      WHERE email=$1;
    `,
      [email]
    );
    return user;
  } catch (error) {
    console.error("Error getUserByEmail");
    throw error;
  }
}

module.exports = {
  // add your database adapter fns here
  getAllUsers,
  createUser,
  getUserByEmail,
  getUserById,
  getUser,
};