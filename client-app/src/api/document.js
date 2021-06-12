var Constants = require("./constants");
const axios = require("axios");

async function getDocuments() {
  try {
    const response = await axios.get(`${Constants.DOCUMENTS_API_URL}`, {});
    return response;
  } catch (error) {
    console.log(error);
  }
  return [];
}

async function insert(id, doc, title) {
  try {
    let form = new FormData();
    form.append("files", doc);
    form.append("created", Date.now());
    form.append("modified", Date.now());
    form.append("title", title);
    const response = await axios.post({
      method: "post",
      url: `${Constants.DOCUMENTS_API_URL}/${id}`,
      data: form,
      header: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.log(error);
  }
  return null;
}

export default {
  getDocuments,
  insert,
};
