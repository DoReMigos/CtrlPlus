import axios from "axios";


export const URL = "http://localhost:4000/api";

// this file holds your frontend network request adapters
// think about each function as a service that provides data
// to your React UI through AJAX calls

// for example, if we need to display a list of users
// we'd probably want to define a getUsers service like this:

/* 
  export async function getUsers() {
    try {
      const { data: users } = await axios.get('/api/users')
      return users;
    } catch(err) {
      console.error(err)
    }
  }
  */

//EVERYTHING BELOW HERE IS USER API
export async function RegisterUser(email, password) {
  try {
    const response = await fetch(`${URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
}

export async function userLogin(email, password) {
  try {
    const response = await fetch(`${URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const result = await response.json();
    console.log(result);
    const token = result.token;
    return token;
  } catch (error) {
    throw error;
  }
}

export async function getUserProfile(token) {
  const response = await fetch(`${URL}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(
    token,
    "THIS TOKEN IS CURRENTLY DISPLAYING, does not make it into response"
  );
  const result = await response.json();
  console.log(result, "Response FROM JSON response");
  return result;
}

export async function getUserCarts(token, id) {
  try {
    const response = await fetch(`${URL}/carts/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = response.json();
    console.log(result, 'getusercarts log')
    return result;
  } catch (error) {
    console.log(error);
  }
}

  export async function createCart (token,userId){
    try{
      const response = await fetch(`${URL}/cart/${userId}/orders`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body:JSON.stringify({
          userId: userId
        }),
      });
      console.log(response.body)
      console.log(response)
      const result = await response.json()
      console.log(result,'createcart log')
      return result
    }catch(error){
      console.log(error);
    }
  } 


//END OF USER API

//START OF PRODUCTS

export async function getAllProducts() {
  const response = await fetch(`${URL}/products`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  console.log(result);
  return result;
}

export async function createProduct(
  title,
  brand,
  description,
  price,
  inventory,
  token
) {
  try {
    const response = await fetch(`${URL}/products`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify({
        title: title,
        brand: brand,
        description: description,
        price: price,
        inventory: inventory,
      }),
    });
    const result = response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function updateProduct(
  productId,
  price,
  inventory,
  category,
  token
) {
  try {
    const response = await fetch(`${URL}/products/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        price: price,
        inventory: inventory,
        category: category,
      }),
    });
    console.log(response, "THIS IS RESPONSE FOMR UDPATE PRODUCT");
    const result = response.json();
    return result;
  } catch (error) {
    console.log("error");
  }
}

export async function deleteProduct(token, productId){
  try{
    const response = await fetch (`${URL}/products/${productId}`,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = response.json();
    return result;
  }catch(error){
    console.log(error);
  }
}
//END OF PRODUCT

export async function deleteCartProd(id, token){
  try{
    const response = await fetch (`${URL}/carts/${id}`,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    })
    const result = await response.json()
    return result
  }catch(error){
    console.log(error)
  }
}

export async function updateCartProdQuantity(id, quantity, token){
  console.log(id, quantity, token, "THIS IS ID QUANTITY TOKEN FROM FRONTEND API")
  try{
    const response = await fetch (`${URL}/carts/${id}`,{
      method: "PATCH",
      headers:{
        'Content-Type' : 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        quantity: quantity
      })
    })
    const result = response.json()
    console.log(result, "THIS IS RESULT FROM FRONT END API CART PRODDDD")
    return result
  }catch(error){
    console.log(error)
  }
}

export async function getAPIHealth() {
  try {
    const { data } = await axios.get("/api/health");
    return data;
  } catch (err) {
    console.error(err);
    return { healthy: false };
  }
}

export async function addProductToCart(productId, price, order_id,quantity,token){
  console.log(productId, order_id, price)

  try{
    const response = await fetch(`${URL}/orders/${order_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId: productId,
        price: price,
        quantity: quantity,
      }),
    });
    console.log(response)
    const result = response.json();
    return result;
  }catch(error){
    console.log(error);
  }
}