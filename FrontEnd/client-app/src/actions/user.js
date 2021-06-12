import * as types from "./types";
import user from "../api/user";

const receiveUsers = (users) => ({
  type: types.RECEIVE_USERS,
  users,
});

export const storeCurrentUser = (user) => (dispatch) => {
  dispatch({
    type: types.STORE_CURRENT_USER,
    currentUser: user,
  });
};

export const getAllUsers = () => (dispatch) => {
  user.getUsers().then((response) => {
    dispatch(receiveUsers(response.data));
  });
};

export const setShouldFetchData = (should) => (dispatch) => {
  dispatch({
    type: types.USERS_DATA_SHOULD_FETCH,
  });
};

export const removeUser = (id) => (dispatch) => {
  user.deleteUser(id);
  dispatch({
    type: types.REMOVE_USER,
    id: id,
  });
};

export const updateCurrentUser = (id, data) => (dispatch) => {
  user.updateUser(id, data).then((response) => {
    if (response.status === 200) {
      dispatch({
        type: types.CURRENT_USER_UPDATE,
        currentUser: response.data,
      });
    }
  });
};

export const updateAvatarUser = (id, data) => (dispatch) => {
  user.updateAvatarUser(id, data).then((response) => {
    if (response.status === 200) {
      dispatch({
        type: types.CURRENT_USER_UPDATE_AVATAR,
        avatar: response.data,
      });
      var currentUser = JSON.parse(sessionStorage.getItem("token"));
      currentUser.avatar = response.data;
      sessionStorage.setItem("token", JSON.stringify(currentUser));
    }
    console.log(response);
  });
};

export const registerUser = (data) => {
  user.insert(data).then((response) => {
    return response;
  });
};

export const getUserRoles = async () => {
  user.getUserRoles().then((response) => {
    console.log(response);
    return response;
  });
};
