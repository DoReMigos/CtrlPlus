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

module.exports={
    addProducttoCart,

}