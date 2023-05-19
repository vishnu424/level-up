import axios from "axios";
import { URL } from "../../../config/config";

const token = process.browser && window.localStorage.getItem("access_token");
const classId = "1dcb6ad9-32a4-4d51-99ec-e5bbc2f91bfa";

const getSubjectsData = () => {
  let requestOptions = {
    method: "GET",
    headers: {
      "x-class-id": classId,
      "x-app-name": "levelup",
      "x-access-token": token,
    },
  };

  return axios(
    `${URL}/app/subject?syncStartTime=${Date.now()}&limit=200&offset=0`,
    requestOptions
  )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const subjectsServices = {
  getSubjectsData,
};
