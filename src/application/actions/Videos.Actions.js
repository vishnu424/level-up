import { videosServices } from "../../infrastructure/services/Videos.services";
import {
  VIDEOS_BY_TOPIC_ID,
  VIDEOS_BY_TOPIC_ID_LOADING,
  VIDEO_DETAILS_BY_ID,
  VIDEO_DETAILS_BY_ID_LOADING,
} from "../types";

const getVideoDetailsByTopic = (topicId, SyncTime) => {
  return async (dispatch) => {
    try {
      dispatch({ type: VIDEOS_BY_TOPIC_ID_LOADING, payload: true });
      const res = await videosServices.getVideoDetailsByTopicData(
        topicId,
        SyncTime
      );

      dispatch({
        type: VIDEOS_BY_TOPIC_ID,
        payload: {
          data: res,
          lastSyncTime: Date.now(),
          SyncTime,
        },
      });
      dispatch({ type: VIDEOS_BY_TOPIC_ID_LOADING, payload: false });
    } catch (error) {
      dispatch({ type: VIDEOS_BY_TOPIC_ID_LOADING, payload: false });
    }
  };
};

const getDetailsByVideoId = (topicId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: VIDEO_DETAILS_BY_ID_LOADING, payload: true });
      const res = await videosServices.getDetailsByVideoIdData(topicId);

      dispatch({
        type: VIDEO_DETAILS_BY_ID,
        payload: {
          data: res,
        },
      });
      dispatch({ type: VIDEO_DETAILS_BY_ID_LOADING, payload: false });
    } catch (error) {
      dispatch({ type: VIDEO_DETAILS_BY_ID_LOADING, payload: false });
    }
  };
};

export const videosActions = {
  getVideoDetailsByTopic,
  getDetailsByVideoId,
};
