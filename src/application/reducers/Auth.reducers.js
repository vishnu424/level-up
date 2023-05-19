import {
  AUTHENTICATED,
  UNAUTHENTICATED,
  TOGGLE_ALERT,
  AUTH_LOADING,
} from "../types";

const initialState = {
  authenticated: false,
  loading: false,
  access_token: "",
  refresh_token: "",
  userInfo: {},
  subscription_data: false,
  colleges_data: [],
  concepts: [],
  show_alert: false,
  alert_text: "",
  alert_type: "",
  trial_details: "",
};

const authReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case AUTHENTICATED:
      if (action.payload.data) {
        return {
          ...state,
          authenticated:
            action.payload.data && action.payload.data.accessToken
              ? true
              : false,
          access_token:
            action.payload &&
            action.payload.data &&
            action.payload.data.accessToken,
          refresh_token:
            action.payload &&
            action.payload.data &&
            action.payload.data.refreshToken,
          userInfo: action.payload.userInfo,
        };
      } else {
        return {
          ...state,
          authenticated: true,
          userInfo: action.payload.userInfo,
        };
      }
    case UNAUTHENTICATED:
      return {
        ...state,
        authenticated: false,
        access_token: "",
        refresh_token: "",
        userInfo: {},
      };
    case AUTH_LOADING:
      return { ...state, loading: action.payload };
    case TOGGLE_ALERT:
      return {
        ...state,
        show_alert: action.payload.isShow,
        alert_text: action.payload.data,
        alert_type: action.payload.type,
      };
    default:
      return state;
  }
};

export default authReducer;
