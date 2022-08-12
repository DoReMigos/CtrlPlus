import axios from 'axios';

export const URL = 'https://ctrlplus.herokuapp.com/api/'

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
  export async function RegisterUser ({email, password}){
    try {
    console.log(`${URL}/users/register`)
    const response = await fetch(`${URL}/users/register`,{
    method:"POST",
    headers: {
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
            email: email,
            password: password,
    })
  })
  
  const result = await response.json()
  console.log(result)
  return result
  }catch(error){
  throw error;
  }
  }

export async function getAPIHealth() {
  try {
    const { data } = await axios.get('/api/health');
    return data;
  } catch (err) {
    console.error(err);
    return { healthy: false };
  }
}

