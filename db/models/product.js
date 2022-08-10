const { products } = require('./products')
const { client } = require('../client')

module.exports = {
  // add your database adapter fns here
   getAllProducts, createProducts

};
//database function
async function createProducts({ title, description, price, inventory, category, image }) {
    // return the new activity
    try {
      const { rows:[product] } = await client.query(
        `
          INSERT INTO products(title, description, price, inventory, category, image) 
          VALUES($1, $2, $3, $4, $5, $6) 
          ON CONFLICT (title) DO NOTHING 
          RETURNING *;
        `,
        [title, description, price, inventory, category, image]
      );
      return product;
    } catch (error) {
      console.error(error);
    }
  }
  async function getAllProducts() {
    try {
      const { rows } = await client.query(`
        SELECT *
        FROM products;
      `);
  
      return rows;
    } catch (error) {
      throw error;
    }
  }

export default products;