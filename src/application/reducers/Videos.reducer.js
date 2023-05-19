import {
  VIDEOS_BY_TOPIC_ID,
  VIDEOS_BY_TOPIC_ID_LOADING,
  SELECTED_VIDEO,
} from "../types";

const initialState = {
  videos_by_topic_id: [],
  videos_by_topic_id_loading: false,
  plan_details: [],

  videos_last_sync_time: 0,
};
const videosReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case VIDEOS_BY_TOPIC_ID:
      const res = state.videos_by_topic_id.filter(({ uuidIdentifier }) =>
        action.payload.data.results.some(
          (x) => x.uuidIdentifier !== uuidIdentifier
        )
      );

      const videosList =
        action.payload.data.results?.length && action.payload.SyncTime !== 0
          ? [...res, ...action.payload.data.results]
          : action.payload.SyncTime === 0
          ? action.payload.data.results
          : state.videos_by_topic_id;

      return {
        ...state,
        videos_by_topic_id: videosList.sort(
          (a, b) => a.sortNumber - b.sortNumber
        ),
        videos_last_sync_time: action.payload.lastSyncTime,
        plan_details: action.payload.data.plans,
      };
    case VIDEOS_BY_TOPIC_ID_LOADING:
      return { ...state, videos_by_topic_id_loading: action.payload };

    default:
      return state;
  }
};

export default videosReducer;
