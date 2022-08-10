const {
  client,
  // declare your model imports here
  // for example, User
} = require('./');

async function buildTables() {

    await client.connect()} 
    // drop tables in correct order
async function dropTables(){
      console.log("dropping Tables")    
      await client.query(`
        DROP TABLE IF EXISTS cart_products;
        DROP TABLE IF EXISTS carts;
        DROP TABLE IF EXISTS products;
        DROP TABLE IF EXISTS users;
        `);
      }
async function createTables(){
try{
  console.log("building tables")
        await client.query(`
     CREATE TABLE users (
          id SERIAL PRIMARY KEY, 
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          "isAdmin" BOOLEAN DEFAULT false
        );
    CREATE TABLE products (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT,
          price NUMERIC NOT NULL,
          inventory INTEGER NOT NULL,
          category VARCHAR(255) NOT NULL,
          image TEXT
        );
        CREATE TABLE carts (
          id SERIAL PRIMARY KEY, 
          "user_id" INTEGER REFERENCES users(id), 
          "created_at" TIME DEFAULT CURRENT_TIME
        );
        CREATE TABLE cart_products (
          id INTEGER NOT NULL, 
          "product_id" INTEGER REFERENCES products(id),
          "order_id" INTEGER REFERENCES carts(id),
          quantity INTEGER default 1,
          "purchased_price" VARCHAR(255),
          UNIQUE ("product_id" ,"order_id")
        );
        CREATE TABLE reviews(
          id SERIAL PRIMARY KEY,
          "user_id" INTEGER REFERENCES users(id),
          "product_id" INTEGER REFERENCES products(id),
          message TEXT NOT NULL,
          UNIQUE ("product_id" ,"user_id")
        )
       ` )
            // build tables in correct order
          } catch (error) {
            throw error;
          }
        }

async function populateInitialData() {
  console.log("Starting to create users...")
  try { 
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
    const usersToCreate = [
      {email:'albert@cntrlplus.com', password: 'bertie99'},
      {email:'sandra@cntrlplus.com', password: 'sandra123'},
      {email:'glamgal@cntrlplus.com', password: 'glamga123'},
      {email:'georgie@cntrlplus.com', password: 'georgie1234'},
      {email:'productsgalore@cntrlplus.com', password: 'products1234', isAdmin: true},
    ]
    // const users = await Promise.all(usersToCreate.map())

    console.log("Users Created!")
    // console.log(users)
    console.log("Fiinished Creating Users!")
  } catch (error) {
    console.log("Error Creating Users!")
    throw error;
  }
}
const productsToCreate=[
  // {title:, description:, price:, inventory:, category:,}
]

buildTables()
  .then(dropTables)
  .then(createTables)
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
