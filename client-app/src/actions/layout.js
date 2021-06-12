import * as types from "./types";

export const toggleSidebar = () => (dispatch) => {
  dispatch({
    type: types.TOGGLE_SIDEBAR,
  });
};

