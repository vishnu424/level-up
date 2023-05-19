import { topicsServices } from "../../infrastructure/services/Topics.services";
import {
  GET_TOPICS,
  GET_TOPICS_LOADING,
  LOAD_SEARCH_DATA,
  LOAD_SELECTED_VIDEO,
  SEARCH_DATA_LOADING,
} from "../types";

const getTopics = (topicId, token) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_TOPICS_LOADING, payload: true });
      const res = await topicsServices.getTopicsData(topicId, token);
      dispatch({
        type: GET_TOPICS,
        payload: {
          data: res.results,
        },
      });

      dispatch({ type: GET_TOPICS_LOADING, payload: false });
    } catch (error) {
      dispatch({ type: GET_TOPICS_LOADING, payload: false });
    }
  };
};

const searchContent = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SEARCH_DATA_LOADING, payload: true });
      const res = await topicsServices.searchContentData(data);
      dispatch({
        type: LOAD_SEARCH_DATA,
        payload: {
          data: res.searchResult,
        },
      });
      dispatch({ type: SEARCH_DATA_LOADING, payload: false });
      return res;
    } catch (error) {
      dispatch({ type: SEARCH_DATA_LOADING, payload: false });
      return error;
    }
  };
};
const selectVideo = (videoId) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOAD_SELECTED_VIDEO,
        payload: {
          data: videoId,
        },
      });
    } catch (error) {
      return error;
    }
  };
};

export const topicsActions = {
  getTopics,
  searchContent,
  selectVideo,
};
