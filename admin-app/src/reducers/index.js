import { combineReducers } from "redux";

import users, * as fromUsers from "./users";
import layout, * as fromLayout from "./layout";
import notifications, * as fromNotifications from "./notifications";
import documents from "./document";
import posts from "./post";
import products from "./product";
import orders from "./order";
export default combineReducers({
  users,
  layout,
  notifications,
  documents,
  posts,
  products,
  orders,
});
