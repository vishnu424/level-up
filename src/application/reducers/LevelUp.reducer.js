import {
  CONTINUE_READING,
  CONTINUE_READING_LOADING,
  GET_RECOMENDATIONS,
  GET_RECOMENDATIONS_LOADING,
  SET_SCREEN_WIDTH,
} from "../types";

const initialState = {
  continue_reading_data: [],
  continue_reading_loading: false,
  get_recomendations_data: [],
  get_recomendations_loading: false,
  is_mobile: false,
};
const levelUpReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case CONTINUE_READING_LOADING:
      return { ...state, continue_reading_loading: action.payload };
    case CONTINUE_READING:
      return { ...state, continue_reading_data: action.payload.data };
    case GET_RECOMENDATIONS:
      return { ...state, get_recomendations_data: action.payload.data };
    case GET_RECOMENDATIONS_LOADING:
      return { ...state, get_recomendations_loading: action.payload };
    case SET_SCREEN_WIDTH:
      return { ...state, is_mobile: action.payload };
    default:
      return state;
  }
};

export default levelUpReducer;
