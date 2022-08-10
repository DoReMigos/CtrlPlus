const { client } = require('../client')


//database function
async function createProducts({ title, brand, description, price, inventory, category, image }) {
    // return the new activity
    try {
      const { 
        rows:[product]
      } = await client.query(
        `
          INSERT INTO products(title, brand, description, price, inventory, category, image) 
          VALUES($1, $2, $3, $4, $5, $6, $7) 
          ON CONFLICT (title) DO NOTHING 
          RETURNING *;
        `,
        [title, brand, description, price, inventory, category, image]
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
  
async function getProductById(){
  try {


  } catch (error) {
    throw error;
  }
}

async function getProductByCategory(){
  try {


  } catch (error) {
    throw error;
  }
}

async function updateProduct(){
  try {


  } catch (error) {
    throw error;
  }
}

async function deleteProduct(){
  try {


  } catch (error) {
    throw error;
  }
}

  module.exports = {
  // add your database adapter fns here
   getAllProducts, createProducts, getProductByCategory, getProductById, updateProduct, deleteProduct
};