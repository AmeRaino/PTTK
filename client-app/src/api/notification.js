var Constants = require("./constants");
const axios = require("axios");

async function getNotifications(idUser) {
  try {
    const response = axios.get(
      `${Constants.NOTIFICATIONS_API_URL}/${idUser}`,
      {}
    );
    return response;
  } catch (error) {
    console.log(error);
  }
  return [];
}

async function mark(idUser, idNotification, status) {
  try {
    const response = axios.post(
      `${Constants.NOTIFICATIONS_API_URL}/marknotification`,
      {
        idUser: idUser,
        idNotification: idNotification,
        isRead: status,
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
  return null;
}

async function insert(idAuthor, title, body, date) {
  try {
    const response = axios.post(`${Constants.NOTIFICATIONS_API_URL}/insert`, {
      idAuthor: idAuthor,
      title: title,
      body: body,
      date: date,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}
export default { getNotifications, mark, insert };
