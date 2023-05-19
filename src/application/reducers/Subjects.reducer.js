import {
  GET_SUBJECTS_LOADING,
  GET_SUBJECTS,
  SUBJECT_LOADING,
  LOAD_SELECTED_SUBJECT,
} from "../types";

const initialState = {
  subjects_data_loading: false,
  subjects_data: [],
  subject_loading: false,
  selected_subject_id: "",
};
const subjectsReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case SUBJECT_LOADING:
      return { ...state, subject_loading: action.payload };
    case LOAD_SELECTED_SUBJECT:
      return { ...state, selected_subject_id: action.payload.data };

    case GET_SUBJECTS_LOADING:
      return { ...state, subjects_data_loading: action.payload };
    case GET_SUBJECTS:
      return { ...state, subjects_data: action.payload.data };

    default:
      return state;
  }
};

export default subjectsReducer;
