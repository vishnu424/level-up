import { levelUpServices } from "../../infrastructure/services/LevelUp.services";
import {
  CONTINUE_READING,
  CONTINUE_READING_LOADING,
  GET_RECOMENDATIONS,
  GET_RECOMENDATIONS_LOADING,
  SET_SCREEN_WIDTH,
} from "../types";

const recomendedData = (classId, topicId, token) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_RECOMENDATIONS_LOADING, payload: true });
      const res = await levelUpServices.getRecomendedData(
        classId,
        topicId,
        token
      );
      dispatch({
        type: GET_RECOMENDATIONS,
        payload: {
          data: res.recomendedVideos,
        },
      });

      dispatch({ type: GET_RECOMENDATIONS_LOADING, payload: false });
    } catch (error) {
      dispatch({ type: GET_RECOMENDATIONS_LOADING, payload: false });
    }
  };
};

const getScreenSize = (width) => {
  return async (dispatch) => {
    dispatch({ type: SET_SCREEN_WIDTH, payload: width });
  };
};

const continueLearningData = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: CONTINUE_READING_LOADING, payload: true });
      const res = await levelUpServices.getContinueLearningData();

      dispatch({
        type: CONTINUE_READING,
        payload: {
          data: res.videoDetails,
        },
      });

      dispatch({ type: CONTINUE_READING_LOADING, payload: false });
    } catch (error) {
      dispatch({ type: CONTINUE_READING_LOADING, payload: false });
    }
  };
};

const isUserSubscribed = (id) => {
  return async (dispatch) => {
    try {
      // dispatch({ type: AUTH_LOADING, payload: true });
      const res = await levelUpServices.checkIsUserSubscribed(id);

      // dispatch({
      //   type: GET_USER_SUBSCRIPTION,
      //   payload: {
      //     data: res,
      //   },
      // });
      // dispatch({ type: AUTH_LOADING, payload: false });

      return res;
    } catch (error) {
      // dispatch({ type: AUTH_LOADING, payload: false });
      return error;
    }
  };
};

export const levelUpActions = {
  recomendedData,
  continueLearningData,
  getScreenSize,
  isUserSubscribed,
};
