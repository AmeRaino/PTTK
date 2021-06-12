var Constants = require("./constants");
const axios = require("axios");

async function getUsers() {
  try {
    const response = await axios.get(`${Constants.USERS_API_URL}`, {});
    return response;
  } catch (error) {
    console.log(error);
  }
  return [];
}

async function getUserRoles() {
  try {
    const response = await axios.get(`${Constants.USERS_API_URL}/getroles`, {});
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
  return [];
}

function deleteUser(id) {
  try {
    axios.delete(`${Constants.USERS_API_URL}/${id}`, {});
  } catch (error) {
    console.log(error);
  }
}

async function insert(user) {
  try {
    const response = await axios.post(`${Constants.USERS_API_URL}/register`, {
      firstName: user.firstName,
      lastName: user.lastName,
      UserName: user.username,
      password: user.password,
      email: user.email,
      phone: user.phone,
      createdDate: Date.now(),
      idRole: user.idRole,
    });
    return response;
  } catch (error) {
    return error;
  }
  return null;
}

async function updateUser(id, user) {
  try {
    const response = await axios.put(`${Constants.USERS_API_URL}/${id}`, user);
    return response;
  } catch (error) {
    return error;
  }
  return null;
}

async function updateAvatarUser(id, file) {
  console.log(id, file);
  try {
    let form = new FormData();
    form.append("files", file);
    const response = await axios({
      method: "post",
      url: `${Constants.USERS_API_URL}/updateavatar/${id}`,
      data: form,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
  return null;
}

export default {
  getUsers,
  deleteUser,
  insert,
  getUserRoles,
  updateUser,
  updateAvatarUser,
};
