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

async function deleteCartProd(id){
  console.log(id, "THIS IS ID")
  try{
    const {rows}= await client.query(`
    DELETE FROM cart_products
    where id = $1
    RETURNING *`
    ,[id])
    const deleted = rows[0]
    console.log(deleted, "THIS IS ROWS!!!!")
    return deleted
  }catch(error){
    console.log(error)
  }
  }

module.exports={
  addProducttoCart,
  deleteCartProd
  
}