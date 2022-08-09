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
          name VARCHAR(255) NOT NULL,
          description TEXT,
          price INTEGER NOT NULL
        );
        CREATE TABLE carts (
          id SERIAL PRIMARY KEY, 
          "user_id" INT REFERENCES users(id), 
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
       ` )
            // build tables in correct order
          } catch (error) {
            throw error;
          }
        }

async function populateInitialData() {
  try { console.log('ppppp')
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(dropTables)
  .then(createTables)
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
