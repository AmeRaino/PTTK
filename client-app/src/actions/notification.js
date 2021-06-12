import * as types from "./types";
import notification from "../api/notification";

const receiveNotifications = (notifications) => ({
  type: types.RECEIVE_NOTIFICATIONS,
  notifications,
});

export const getAllNotifications = () => (dispatch) => {
  var user = sessionStorage.getItem("token")
    ? JSON.parse(sessionStorage.getItem("token"))
    : [];
  notification.getNotifications(user.id).then((response) => {
    dispatch(receiveNotifications(response.data));
  });
};

export const markNotification = (idNotification, status) => (dispatch) => {
  var user = sessionStorage.getItem("token")
    ? JSON.parse(sessionStorage.getItem("token"))
    : [];
  notification.mark(user.id, idNotification, status).then(() => {
    dispatch({
      type: types.MARK_NOTIFICATION,
      idNotification: idNotification,
      status: status,
    });
  });
};

export const publicNotification = (title, body) => {
  var user = sessionStorage.getItem("token")
    ? JSON.parse(sessionStorage.getItem("token"))
    : [];
  var idAuthor = user.id;
  var date = Date.now();
  notification
    .insert(idAuthor, title, body, date)
    .then((response) => console.log(response));
};
