import axios from "axios";
import { URL } from "../../../config/config";

const token = process.browser && window.localStorage.getItem("access_token");
const classId = "1dcb6ad9-32a4-4d51-99ec-e5bbc2f91bfa";

const getContinueLearningData = () => {
  let requestOptions = {
    method: "GET",
    headers: {
      "x-class-id": classId,
      "x-app-name": "levelup",
      "x-access-token": token,
    },
  };

  return axios(`${URL}/app/continue-reading`, requestOptions)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};

const getRecomendedData = () => {
  let requestOptions = {
    method: "GET",
    headers: {
      "x-class-id": classId,
      "x-app-name": "levelup",
      "x-access-token": token,
    },
  };

  return axios(`${URL}/app/get-recommendations`, requestOptions)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};

const checkIsUserSubscribed = (id) => {
  let requestOptions = {
    method: "GET",
    headers: {
      "x-class-id": classId,
      "x-app-name": "levelup",
      "x-access-token": token,
    },
  };

  return axios(`${URL}/user/levelup-subscription`, requestOptions)
    .then((res) => {
      return res.data.result;
    })
    .catch((error) => {
      throw error;
    });
};
export const levelUpServices = {
  getRecomendedData,
  getContinueLearningData,
  checkIsUserSubscribed,
};
