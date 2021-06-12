import { combineReducers } from "redux";
import { RECEIVE_NOTIFICATIONS, MARK_NOTIFICATION } from "../actions/types";

const initialState = {
  notifications: [],
  isFetching: true,
  shouldFetch: true,
  unread: 0,
};

const notifications = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.notifications,
        unread:
          action.notifications.filter((x) => x.isRead === false).length || 0,
        isFetching: false,
        shouldFetch: false,
      };
    case MARK_NOTIFICATION:
      return {
        ...state,
        shouldFetch: true,
      };
    default:
      return state;
  }
};

export default notifications;

// export const getVisibleNotification = (state, id) =>
