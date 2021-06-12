import { combineReducers } from "redux";
import {
  RECEIVE_USERS,
  REMOVE_USER,
  USERS_DATA_SHOULD_FETCH,
  STORE_CURRENT_USER,
  CURRENT_USER_UPDATE,
  CURRENT_USER_UPDATE_AVATAR,
} from "../actions/types";

const initialState = {
  users: [],
  isFetching: true,
  currentUser: null,
  shouldFetchdata: false,
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        users: action.users,
        isFetching: false,
        shouldFetchdata: false,
      };
    case STORE_CURRENT_USER:
      return {
        ...state,
        currentUser: action.currentUser,
      };
    case CURRENT_USER_UPDATE_AVATAR:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          avatar: action.avatar,
        },
      };
    case CURRENT_USER_UPDATE:
      return {
        ...state,
        currentUser: action.currentUser,
      };
    case REMOVE_USER:
      return {
        ...state,
        shouldFetchdata: true,
      };
    case USERS_DATA_SHOULD_FETCH:
      return {
        ...state,
        shouldFetchdata: true,
      };
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users.reduce((obj, user) => {
          obj[user.id] = user;
          return obj;
        }),
      };
    default:
      const { userId } = action;
      if (userId) {
        return { ...state, [userId]: users(state[userId], action) };
      }
      return state;
  }
};

const visibleIds = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return action.users.map((user) => user.id);
    default:
      return state;
  }
};

export default users;

export const getUser = (state, id) => state.byId[id];

export const getVisibleUsers = (state) =>
  state.visibleIds.map((id) => getUser(state, id));
