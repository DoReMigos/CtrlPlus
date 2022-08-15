const {
  client, User, Products, Cart,
  // declare your model imports here
  // for example, User
} = require('./');
const { createCart, getAllCarts, attachProductsToCarts } = require('./models/cart');
const { addProducttoCart } = require('./models/cartProducts');
const { getAllProducts } = require('./models/product');
const fs = require("fs");
const { parse } = require("csv-parse");


fs.createReadStream("./models/Products.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    
    console.log(row);
  })
  .on("error", function (error) {
    console.log(error.message);
  })
  .on("end", function () {
    console.log("finished");
  });


async function buildTables() {

    await client.connect()} 
    // drop tables in correct order
async function dropTables(){
      console.log("dropping Tables")    
      await client.query(`
        DROP TABLE IF EXISTS reviews;
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
          title VARCHAR(255),
          brand VARCHAR(255),
          description TEXT,
          price MONEY,
          inventory INTEGER,
          category VARCHAR(255),
          image TEXT
        );
        CREATE TABLE carts (
          id SERIAL PRIMARY KEY, 
          "user_id" INTEGER REFERENCES users(id), 
          "created_at" TIME DEFAULT CURRENT_TIME,
          "isPurchased" BOOLEAN DEFAULT false
        );
        CREATE TABLE cart_products (
          id SERIAL PRIMARY KEY, 
          "order_id" INTEGER REFERENCES carts(id),
          "product_id" INTEGER REFERENCES products(id),
          quantity INTEGER default 1,
          "purchased_price" MONEY,
          UNIQUE ("product_id" ,"order_id")
        );
        CREATE TABLE reviews(
          id SERIAL PRIMARY KEY,
          "user_id" INTEGER REFERENCES users(id),
          "product_id" INTEGER REFERENCES products(id),
          message TEXT NOT NULL,
          UNIQUE ("product_id" ,"user_id")
        );
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
      {email:'albert@gmail.com', password: 'bertie99'},
      {email:'sandra@gmail.com', password: 'sandra123'},
      {email:'glamgal@gmail.com', password: 'glamgal123'},
      {email:'georgie@gmail.com', password: 'georgie1234'},
      {email:'productsgalore@ctrlplus.com', password: 'products1234', isAdmin: true},
    ]
   const users = await Promise.all(usersToCreate.map(User.createUser))

    console.log("Users Created!")
    console.log(users)
    console.log("Finished Creating Users!")
  } catch (error) {
    console.error("Error creating Users!");
    throw error;
  }
}

async function createInitialProducts() {
  console.log("Starting to create products...")
  try { 
    const productsToCreate = [
      { title: "Razer Basilisk Ultimate", brand:"Razer", description: "Wireless Gaming Mouse", price: '$169.99', inventory: 20, category: "mouse", image: "text" },
      { title: "Logitech G915", brand: "Logitech", description: "Wireless RGB Mechanical Gaming Keyboard", price: '$249.99', inventory: 20, category: "keyboard", image: "text" },
      { title: "SteelSeries Arctis 7+", brand: "SteelSeries", description: "Multi-Platform USB-C Gaming Headset", price: '$169.99', inventory: 20, category: "headset", image: "text" },
      { title: "SteelSeries Arctis 9", brand: "SteelSeries", description: "Wireless Gaming Headset", price: '$209.99', inventory: 10, category: "headset", image: "text" },
      { title: "Razer Naga", brand:"Razer", description: "Wireless Gaming Mouse", price: '$87.99', inventory: 24, category: "mouse", image: "text" },
      { title: "Logitech G630", brand: "Logitech", description: "Mechanical Gaming Keyboard", price: '$149.99', inventory: 20, category: "keyboard", image: "text" },
      { title: "Corsair K65", brand: "Corsair", description: "Mechanical Keyboard for Gaming", price: '$69.69', inventory: 20, category: "keyboard", image: "text" },
      { title: "Turtle Beach TalkieListenie", brand: "TortleBeach", description: "Wireless Gaming Headset", price: '$39.99', inventory: 10, category: "headset", image: "text" },
    ];
    console.log(productsToCreate)

    const products = await Promise.all(productsToCreate.map(Products.createProducts));
    console.log(products, "THIS IS PRODUCTS")

    console.log("Products created:");
    console.log(products);
    console.log("Finished creating products!");
  } catch (error) {
    console.error("Error creating products!");
    throw error;
  }
}
async function createInitialCarts() {
  console.log("starting to create routines...")

  const cartsToCreate = [
    {
      id: 1,
      user_id: 2,
      created_at: "CURRENT_TIME",
      isPurchased: false
    },
    {
      id: 2,
      user_id: 1,
      created_at: "TIMESTAMP now()",
      isPurchased: false
    },
    {
      id: 3,
      user_id: 3,
      created_at: "TIMESTAMP now()",
      isPurchased: false
    },
    {
      id: 4,
      user_id: 4,
      created_at: "TIMESTAMP now()",
      isPurchased: false
    }
  ]
  const carts = await Promise.all(
    cartsToCreate.map((cart) => Cart.createCart(cart))
  )
  console.log("Carts Created: ", carts)
  console.log("Finished creating carts.")
}
async function creationInitalCartProducts(){
  const [cart1, cart2, cart3, cart4] =
    await getAllCarts()
    console.log(cart1, cart2, cart3, cart4, 'carts')
  const [bicep1, bicep2, chest1, chest2, leg1, leg2, leg3, leg4] =
    await getAllProducts()

  const cartProductsToCreate = [
    {
      orderId: cart1.id,
      productId: bicep1.id,
      quantity: 10,
      price: 5,
    },
    {
      orderId: cart1.id,
      productId: bicep2.id,
      quantity: 10,
      price: 5,
    },
    {
      orderId: cart2.id,
      productId: chest1.id,
      quantity: 10,
      price: 5,
    },
    {
      orderId: cart2.id,
      productId: chest2.id,
      quantity: 10,
      price: '5',
    },
    {
      orderId: cart3.id,
      productId: leg1.id,
      quantity: 10,
      price: '5',
    },
    {
      orderId: cart3.id,
      productId: leg2.id,
      quantity: 10,
      price: '5',
    },
    {
      orderId: cart3.id,
      productId: leg3.id,
      quantity: 10,
      price: '5',
    },
    {
      orderId: cart4.id,
      productId: leg2.id,
      quantity: 10,
      price: '5',
    },
    {
      orderId: cart4.id,
      productId: leg4.id,
      quantity: 10,
      price: "5"
    },
  ]
  
  // console.log(cart1, cart2, bicep1, leg3,'ddddd')
  const cartProducts = await Promise.all(
    cartProductsToCreate.map(addProducttoCart)
    )
    console.log("cart Products created: ", cartProducts)
    console.log("Finished creating cart_products!")
  }
  async function getcbyus(id){
  let cartsss =  await Cart.getCartsByUser({email: `albert@gmail.com`})
  // let all =  attachProductsToCarts(cartsss)
  console.log(cartsss[0].products,'all')}
  buildTables()
  .then(dropTables)
  .then(createTables)
  .then(populateInitialData)
  .then(createInitialProducts)
  .then(createInitialCarts)
  .then(creationInitalCartProducts)
  .then(getcbyus)
  .catch(console.error)
  .finally(() => client.end());
