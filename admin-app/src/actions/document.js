import * as types from "./types";
import document from "../api/document";

const receiveDocuments = (documents) => ({
  type: types.RECEIVE_DOCUMENTS,
  documents,
});

export const getAllDocuments = () => (dispatch) => {
  document.getDocuments().then((response) => {
    console.log(response);
    if (response.status === 200) {
      dispatch(receiveDocuments(response.data));
    }
  });
};

export const insertDocument = (title, doc) => (dispatch) => {
  var user = sessionStorage.getItem("token")
    ? JSON.parse(sessionStorage.getItem("token"))
    : [];
  var idAuthor = user.id;
  document
    .insert(idAuthor, doc, title)
    .then((response) => console.log(response));
};
