import {
  RECEIVE_POSTS,
  UPDATE_POST,
  DELETE_POST,
  CREATE_POST,
  REFRESH_POSTS,
} from "../actions/types";

const initialState = {
  posts: [],
  isFetching: true,
  shouldFetchdata: true,
};

const posts = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        posts: action.posts,
        isFetching: false,
        shouldFetchdata: false,
      };
    case REFRESH_POSTS:
      return { ...state, shouldFetchdata: true };
    default:
      return state;
  }
};

export default posts;
