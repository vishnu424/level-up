import axios from "axios";
import { URL } from "../../../config/config";

const token = process.browser && window.localStorage.getItem("access_token");
const classId = "1dcb6ad9-32a4-4d51-99ec-e5bbc2f91bfa";

const getVideoDetailsByTopicData = (topicId, SyncTime) => {
  let requestOptions = {
    method: "GET",
    headers: {
      "x-class-id": classId,
      "x-app-name": "levelup",
      "x-access-token": token,
      // "x-app-type": "app",
      // "x-device-platform": "web",
      // "x-device-type": "desktop",
    },
  };
  return axios(
    `${URL}/app/get-video-details-by-topic?syncStartTime=${Date.now()}&lastSyncTime=${SyncTime}&topicId=${topicId}`,
    requestOptions
  )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};

const getDetailsByVideoIdData = (videoId) => {
  let requestOptions = {
    method: "GET",
    headers: {
      "x-class-id": classId,
      "x-app-name": "levelup",
      "x-access-token": token,
    },
  };
  return axios(`${URL}/app/video/${videoId}`, requestOptions)
    .then((res) => {
      return res.data.results;
    })
    .catch((error) => {
      throw error;
    });
};

const videoEventListenerData = (data, contentType) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "x-class-id": classId,
      "x-app-name": "levelup",
      "x-access-token": token,
    },
  };
  let requestData = {
    contentType,
    data: data,
  };
  return axios(`${URL}/userevents/`, {
    ...requestOptions,
    data: { ...requestData },
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const videosServices = {
  getVideoDetailsByTopicData,
  getDetailsByVideoIdData,
  videoEventListenerData,
};
