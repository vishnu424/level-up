import { subjectsServices } from "../../infrastructure/services/Subjects.services";
import {
  GET_SUBJECTS,
  GET_SUBJECTS_LOADING,
  LOAD_SELECTED_SUBJECT,
  SUBJECT_LOADING,
} from "../types";

const getSubjects = (classId, topicId, token) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_SUBJECTS_LOADING, payload: true });
      const res = await subjectsServices.getSubjectsData(
        classId,
        topicId,
        token
      );
      dispatch({
        type: GET_SUBJECTS,
        payload: {
          data: res.results,
        },
      });

      dispatch({ type: GET_SUBJECTS_LOADING, payload: false });
    } catch (error) {
      dispatch({ type: GET_SUBJECTS_LOADING, payload: false });
    }
  };
};

const selectSubject = (subjectId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SUBJECT_LOADING, payload: true });
      dispatch({
        type: LOAD_SELECTED_SUBJECT,
        payload: {
          subjectId,
        },
      });
      dispatch({ type: SUBJECT_LOADING, payload: false });
    } catch (error) {
      dispatch({ type: SUBJECT_LOADING, payload: false });
      return error;
    }
  };
};

export const subjectsActions = {
  getSubjects,
  selectSubject,
};
