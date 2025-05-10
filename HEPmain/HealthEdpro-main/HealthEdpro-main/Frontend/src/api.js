import axios from "axios";

const URL = 'http://localhost:3000'


export async function getPosts() {
  const response = await axios.get(`${URL}/posts`);

  if (response.status === 200) {
    return response.data;
  }
  else {
    return null;
  }
}

export async function getPost(id) {
  
  const response = await axios.get(`${URL}/posts/${id}`);

 if (response.status === 200) {
  return response.data;
 } else {
  return null;
 }
}

export async function createPost(post) {
  const response = await axios.post(`${URL}/posts`, post);

  if (response.status === 200) {
   return response.data;
  } else {
   return null;
  }
}

export async function updatePost(id, post) {
  const response = await axios.put(`${URL}/posts/${id}`, post);

  if (response.status === 200) {
   return response.data;
  } else {
   return null;
  }
}

 export async function deletePost(id) {
  const response = await axios.delete(`${URL}/posts/${id}`);

  if (response.status === 200) {
   return response.data;
  } else {
   return null;
  }
}


//this is for users


export async function getUsers() {
  const response = await axios.get(`${URL}/users`);

  if (response.status === 200) {
    return response.data;
  }
  else {
    return null;
  }
}

export async function getUser(id) {
  
  const response = await axios.get(`${URL}/users/${id}`);

 if (response.status === 200) {
  return response.data;
 } else {
  return null;
 }
}

export async function createUser(user) {
  const response = await axios.post(`${URL}/users`, user);

  if (response.status === 200) {
   return response.data;
  } else {
   return null;
  }
}

export async function updateUser(id, user) {
  const response = await axios.put(`${URL}/users/${id}`, user);

  if (response.status === 200) {
   return response.data;
  } else {
   return null;
  }
}



export async function verifyUser(user) {
  try {
    const response = await axios.post(`${URL}/users/login`, user);
    if (response.data.success) {
      return response.data.token;
    } else {
      throw new Error(response.data.message || 'Login failed');
    }
  } catch (error) {
    throw new Error(error.message || 'Failed to verify user');
  }
}
