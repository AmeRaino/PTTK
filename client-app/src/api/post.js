var Constants = require("./constants");
const axios = require("axios");

async function uploadImage(upload) {
  try {
    let form = new FormData();
    form.append("upload", upload);
    const response = await axios({
      method: "post",
      url: `${Constants.POST_API_URL}/UploadImage`,
      data: form,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

async function getPosts() {
  try {
    const response = await axios.get(`${Constants.POST_API_URL}`, {});
    return response;
  } catch (error) {
    console.log(error);
  }
  return [];
}

async function createPost(authorId, post) {
  try {
    const response = await axios.post(`${Constants.POST_API_URL}`, {
      title: post.title,
      imageCoverUrl: post.imageCoverUrl,
      content: post.content,
      description: post.description,
      created: post.created,
      published: post.published,
      authorId: authorId,
    });
    return response;
  } catch (error) {
    return error;
  }
}

async function updatePost(post) {
  try {
    const response = await axios.put(`${Constants.POST_API_URL}/${post.id}`, {
      title: post.title,
      imageCoverUrl: post.imageCoverUrl,
      content: post.content,
      description: post.description,
      modified: post.modified,
      published: post.published,
    });
    return response;
  } catch (error) {
    return error;
  }
  return null;
}

async function deletePost(id) {
  const response = await axios.delete(`${Constants.POST_API_URL}/${id}`, {});
  return response;
}
export default {
  updatePost,
  createPost,
  getPosts,
  uploadImage,
  deletePost,
};
