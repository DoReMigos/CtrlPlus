const client = require('../client')


//database function
async function createProducts({ title, brand, description, price, inventory, category, image_1, image_2, image_3, image_4 }) {
  try {
    const { rows } = await client.query(
      `
          INSERT INTO products(title, brand, description, price, inventory, category, image_1, image_2, image_3, image_4) 
          VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
          RETURNING *;
        `,
      [title, brand, description, price, inventory, category, image_1, image_2, image_3, image_4]
    );
    return rows;
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
    console.log(rows, "this is rows from products")
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getProductById(id) {
  try {
    const {
      rows: [product], 
    } = await client.query(`
    SELECT *   
    FROM products
    WHERE id=${id};
    `);
    return product;
  } catch (error) {
    throw error;
  }
}
//mimicked Fitness Trackr. Is there a reason for the comma on line 38? Don't think so but should check?

async function getProductByCategory(category) {
  try {
    const {
      rows: [product],
    } = await client.query(`
    SELECT *   
    FROM products
    WHERE category=$1
    `,[category]);
    return product;

  } catch (error) {
    throw error;
  }
}

async function updateProduct(id, ...fields) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [product],
    } = await client.query(
      `
      UPDATE products
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
    `,
      Object.values(fields)
    );
    return product;
  } catch (error) {
    throw error;
  }
}

async function deleteProduct(id) {
  try {
    const { rows: [product] } = await client.query(
      `
      DELETE FROM products
      WHERE id=$1
      RETURNING *;
    `,
      [id]
    );
    return product
  } catch (error) {
    throw error;
  }
}

module.exports = {
  // add your database adapter fns here
  getAllProducts, createProducts, getProductByCategory, getProductById, updateProduct, deleteProduct
};