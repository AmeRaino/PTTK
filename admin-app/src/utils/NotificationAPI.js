// var Constants = require("../constants");
// const axios = require("axios");

// async function getNotificationById(id) {
//   try {
//     const response = await axios.get(
//       `${Constants.NOTIFICATIONS_API_URL}/${id}`,
//       {}
//     );
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
//   return null;
// }

// async function getUserNotifications(id) {
//   try {
//     const response = await axios.get(
//       `${Constants.NOTIFICATIONS_API_URL}/getusernotification/${id}`,
//       {}
//     );
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
//   return null;
// }

// async function markNotifications(isRead, idNotification, idUser) {
//   try {
//     const response = await axios.post(
//       `${Constants.NOTIFICATIONS_API_URL}/MarkNotification`,
//       {
//         idUser: idUser,
//         idNotification: idNotification,
//         isRead: isRead,
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
//   return null;
// }
// export { getNotificationById, getUserNotifications, markNotifications };
