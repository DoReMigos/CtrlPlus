const client = require('../client')


async function addProducttoCart({
  orderId,
  productId,
  quantity,
  price,
}) {
  try {
    const { rows: [cart_products]} = await client.query(`
    INSERT INTO cart_products ("order_id", "product_id", quantity, "purchased_price")
    VALUES ($1, $2, $3, $4)
    ON CONFLICT ("order_id", "product_id") DO NOTHING
    RETURNING "order_id", "product_id", quantity, "purchased_price", id;
    `, [orderId, productId, quantity, price])
    // console.log(routine_activity[4],'eeeee')
    return cart_products
  } catch (error){
    console.error("error with addProducttoCart")
    throw error
  }
}

async function getOrderById(id){
 try {
    const { rows: [order] } = await client.query(`
    SELECT * 
    FROM cart_products
    WHERE id = $1
    ;
    `,[id]);
    // console.log(routine_activity,'ddddddd')
    return order
  } catch (error) {
    console.error("error getting all routines");
    throw error;
  }
}
async function getOrderbyOrderId({ id }) {
  try {
    const { rows: cart_products } = await client.query(
      `
    SELECT * 
    FROM cart_products
    WHERE "order_id" = $1
    ;
    `,
      [id]
    );

    return cart_products
  } catch (error) {
    console.error("error getting all routines");
    throw error;
  }
}
async function updateOrder({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(",");

  if (setString === 0) {
    return;
  }

  try {
    const {
      rows: [cart_product],
    } = await client.query(
      `
    UPDATE cart_products
    SET ${setString}
    WHERE id = ${id}
    RETURNING *
    `,
      Object.values(fields)
    );

    return cart_product;
  } catch (error) {
    console.error("Error updating the routineActivity");
    throw error;
  }
}
async function destroyCartProduct(id) {
  try {
    const { rows: cart_products } = await client.query(
      `
    DELETE 
    FROM cart_products
    WHERE id = $1
    RETURNING *;
    `,
      [id]
    );

    console.log(cart_products, id, "Deleting cartProducts with this id");
    return cart_products[0];
  } catch (error) {
    console.error("error destroying routineActivity");
    throw error;
  }
}

async function canEditOrder(cart_products_id, userId) {
  try {
    const {
      rows: [cart_product],
    } = await client.query(`
    SELECT *
    FROM cart_products 
    JOIN carts ON cart_products."order_id" = carts.id
    WHERE "user_id = ${userId}
    AND cart_products.id = ${cart_products_id}
    ;
    `);
    console.log(cart_product, "edit function");
    // if(routine_activity.id === userId){
    //   return true
    // }
    // else{
    return cart_product;
  } catch (error) {
    console.error("Error with canEditRoutineActivity");
    throw error;
  }
}

module.exports={
    addProducttoCart,
    getOrderById,
    getOrderbyOrderId,
    updateOrder,
    destroyCartProduct,
    canEditOrder,
    

}