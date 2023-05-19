import {
  AUTHENTICATED,
  AUTH_LOADING,
  TOGGLE_ALERT,
  UNAUTHENTICATED,
} from "../types";
import { authService } from "../../infrastructure/services/Auth.services";
import router from "next/router";

// check user
const checkUser = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: AUTH_LOADING, payload: true });
      const res = await authService.checkUserData(data);
      dispatch({ type: AUTH_LOADING, payload: false });

      return res;
    } catch (error) {
      dispatch({ type: AUTH_LOADING, payload: false });
      return error;
    }
  };
};

const showAlert = (alertText, alertType) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: TOGGLE_ALERT,
        payload: {
          data: alertText,
          type: alertType,
          isShow: true,
        },
      });
      setTimeout(() => {
        dispatch({
          type: TOGGLE_ALERT,
          payload: {
            data: "",
            type: alertType,
            isShow: false,
          },
        });
      }, 3000);
    } catch (error) {
      return error;
    }
  };
};

// send otp
const sendOtp = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: AUTH_LOADING, payload: true });
      const res = await authService.sendOtpData(data);

      dispatch({ type: AUTH_LOADING, payload: false });
      return res;
    } catch (error) {
      dispatch({ type: AUTH_LOADING, payload: false });
      return error;
    }
  };
};

// signin
const signIn = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: AUTH_LOADING, payload: true });
      const res = await authService.signInData(data);

      dispatch({
        type: AUTHENTICATED,
        payload: {
          data: res.token,
          userInfo: res.userInfo,
        },
      });
      dispatch({ type: AUTH_LOADING, payload: false });
      return res;
    } catch (error) {
      dispatch({ type: AUTH_LOADING, payload: false });
      return error;
    }
  };
};

// call consent
const callConsent = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: AUTH_LOADING, payload: true });
      const res = await authService.callConsentData();

      dispatch({ type: AUTH_LOADING, payload: false });
      return res;
    } catch (error) {
      dispatch({ type: AUTH_LOADING, payload: false });
      return error;
    }
  };
};

// verify otp
const verifyOtp = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: AUTH_LOADING, payload: true });
      const res = await authService.verifyOtpData(data);

      dispatch({
        type: AUTHENTICATED,
        payload: {
          data: res,
        },
      });

      dispatch({ type: AUTH_LOADING, payload: false });
      return res;
    } catch (error) {
      dispatch({ type: AUTH_LOADING, payload: false });
      return error;
    }
  };
};

// signOut
const signOut = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: AUTH_LOADING, payload: true });
      dispatch({
        type: UNAUTHENTICATED,
      });
      localStorage.clear();
      await router.push("/");
      window.location.reload();
      dispatch({ type: AUTH_LOADING, payload: false });
    } catch (error) {
      dispatch({ type: AUTH_LOADING, payload: false });
      return error;
    }
  };
};

const changeProfile = (userId, data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: AUTH_LOADING, payload: true });
      const res = await authService.changeProfileData(userId, data);
      dispatch({
        type: AUTHENTICATED,
        payload: {
          userInfo: res.userInfo,
        },
      });

      dispatch({ type: AUTH_LOADING, payload: false });
      return res;
    } catch (error) {
      dispatch({ type: AUTH_LOADING, payload: false });
      return error;
    }
  };
};

export const authActions = {
  checkUser,
  showAlert,
  sendOtp,
  signIn,
  callConsent,
  verifyOtp,
  signOut,
  changeProfile,
};
