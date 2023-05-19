import { URL } from "../../../config/config";
import "../../helpers/auth-header";
import axios from "axios";

const token = process.browser && window.localStorage.getItem("access_token");
const classId = "1dcb6ad9-32a4-4d51-99ec-e5bbc2f91bfa";

const checkUserData = (data) => {
  const requestOptions = {
    method: "POST",
  };
  return axios(`${URL}/auth/check/user`, {
    ...requestOptions,
    data: { ...data },
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

const sendOtpData = (data) => {
  const requestOptions = {
    method: "POST",
  };
  return axios(`${URL}/auth/send/otp`, { ...requestOptions, data: { ...data } })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};
const signInData = (data) => {
  const requestOptions = {
    method: "POST",
  };
  return axios(`${URL}/auth/signin`, { ...requestOptions, data: { ...data } })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};
const callConsentData = () => {
  const requestOptions = {
    method: "POST",
  };
  return axios(`${URL}/app/consent`, { ...requestOptions })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

const verifyOtpData = (data) => {
  const requestOptions = {
    method: "POST",
  };
  return axios(`${URL}/auth/verify/otp`, {
    ...requestOptions,
    data: { ...data },
  })
    .then((res) => {
      return res.data.results;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

// change profile
const changeProfileData = (userId, data) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "x-class-id": classId,
      "x-app-name": "levelup",
      "x-access-token": token,
    },
  };
  return axios(`${URL}/auth/user/${userId}`, {
    ...requestOptions,
    data: { ...data },
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};
export const authService = {
  checkUserData,
  sendOtpData,
  signInData,
  callConsentData,
  verifyOtpData,
  changeProfileData,
};
