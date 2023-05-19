import {
  GET_TOPICS_LOADING,
  GET_TOPICS,
  LOAD_SELECTED_VIDEO,
  SEARCH_DATA_LOADING,
  LOAD_SEARCH_DATA,
} from "../types";

const initialState = {
  topics_loading: false,
  topics_data: [],
  selected_video: "",
  search_data: [],
  search_data_loading: false,
};
const topicsReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case GET_TOPICS_LOADING:
      return { ...state, topics_loading: action.payload };
    case GET_TOPICS:
      return { ...state, topics_data: action.payload.data };
    case LOAD_SELECTED_VIDEO:
      return { ...state, selected_video: action.payload.data };
    case LOAD_SEARCH_DATA:
      return { ...state, search_data: action.payload.data };
    case SEARCH_DATA_LOADING:
      return { ...state, search_data_loading: action.payload };
    default:
      return state;
  }
};

export default topicsReducer;
