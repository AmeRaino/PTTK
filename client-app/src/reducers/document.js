import {
  RECEIVE_DOCUMENTS,
  DOCUMENT_INSERT,
  DOCUMENT_REMOVE,
} from "../actions/types";

const initialState = {
  documents: [],
  isFetching: true,
  shouldFetch: true,
};

const documents = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_DOCUMENTS:
      return {
        ...state,
        documents: action.documents,
        shouldFetch: false,
        isFetching: false,
      };
    case DOCUMENT_INSERT:
      return {
        ...state,
        shouldFetch: true,
      };
    case DOCUMENT_REMOVE:
      return {
        ...state,
        shouldFetch: true,
      };
    default:
      return state;
  }
};

export default documents;
