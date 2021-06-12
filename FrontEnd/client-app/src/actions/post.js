import * as types from "./types";
import post from "../api/post";

const receivePosts = (posts) => ({
  type: types.RECEIVE_POSTS,
  posts,
});

export const getPosts = () => (dispatch) => {
  post.getPosts().then((response) => {
    if (response.status == 200) {
      dispatch(receivePosts(response.data));
    }
  });
};

export const createPost = (data) => (dispatch) => {
  var user = sessionStorage.getItem("token")
    ? JSON.parse(sessionStorage.getItem("token"))
    : [];
  post.createPost(user.id, data).then((response) => {
    console.log(response);
    dispatch({
      type: types.REFRESH_POSTS,
    });
  });
};

export const updatePost = (data) => (dispatch) => {
  post.updatePost(data).then((response) => {
    console.log(response);
    dispatch({
      type: types.REFRESH_POSTS,
    });
  });
};

export const deletePost = (id) => (dispatch) => {
  post.deletePost(id).then((response) => {
    console.log(response);
    dispatch({
      type: types.REFRESH_POSTS,
    });
  });
};

export async function uploadImage(upload) {
  post.uploadImage(upload).then((response) => {
    console.log(response);
    return response;
  });
}
