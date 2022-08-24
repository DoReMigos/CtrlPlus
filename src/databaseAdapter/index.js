import axios from "axios";

export const URL = "https://ctrlplus.herokuapp.com/api/";

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
  const result = await response.json();
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
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function createCart(token, userId) {
  try {
    const response = await fetch(`${URL}/cart/${userId}/orders`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify({
        userId: userId,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
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
  return result;
}

export async function createProduct({
  title,
  brand,
  description,
  price,
  inventory,
  image_1,
  image_2,
  image_3,
  image_4,
  token,
}) {
  try {
    const response = await fetch(`${URL}/products`, {
      method: "POST",
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
        image_1: image_1,
        image_2: image_2,
        image_3: image_3,
        image_4: image_4,
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
  description,
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
       description:description
      }),
    });
    const result = response.json();
    return result;
  } catch (error) {
    console.log("error");
  }
}

export async function deleteProduct(token, productId) {
  try {
    const response = await fetch(`${URL}/products/${productId}`, {
      method: "DELETE",
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

export async function getProductByCategory() {
  try {
    const response = await fetch(`${URL}/products/categories`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

//END OF PRODUCT

export async function deleteCartProd(id, token) {
  try {
    const response = await fetch(`${URL}/carts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function updateCartProdQuantity(id, quantity, token) {
  try {
    const response = await fetch(`${URL}/carts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        quantity: quantity,
      }),
    });
    const result = response.json();
    return result;
  } catch (error) {
    console.log(error);
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

export async function addProductToCart(
  productId,
  price,
  order_id,
  quantity,
  token
) {
  try {
    const response = await fetch(`${URL}/orders/${order_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId: productId,
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
