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
  console.log(response, "Response FROM JSON response");
  return result;
}

export async function getUserCarts(token, email) {
  try {
    const response = await fetch(`${URL}/users/${email}/cart`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}
/*
  export async function getUserOrders (token,email){
    try{
      const response = await fetch(`${URL}/users/${email}/order`,{
        headers:{
          'Content-Type' : 'application/json',
          'Authorization': `Bearer ${token}`
        }
    }
      )
      const result = response.json()
      return result
    }catch(error){
      console.log(error);
    }
  } 
  */

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
  quantity,
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
        quantity: quantity,
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
  token,
  title,
  brand,
  description,
  price,
  inventory,
  category,
  image_1,
  image_2,
  image_3,
  image_4
) {
  try {
    const response = await fetch(`${URL}/products/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title,
        brand: brand,
        description: description,
        price: price,
        inventory: inventory,
        category: category,
        image_1: image_1,
        image_2: image_2,
        image_3: image_3,
        image_4: image_4
      })
    })
    const result = response.json();
    return result
  } catch (error) {
    console.log("error");
  }
}

export async function deleteProduct(productId, token){
  try{
    const response = await fetch (`${URL}/products/${productId}`,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    })
    const result = response.json()
    return result
  }catch(error){
    console.log(error)
  }
}
//END OF PRODUCT


export async function getAPIHealth() {
  try {
    const { data } = await axios.get("/api/health");
    return data;
  } catch (err) {
    console.error(err);
    return { healthy: false };
  }
}
