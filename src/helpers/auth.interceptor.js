import axios from "axios";
import { URL } from "../../config/config";
import { makeStore } from "../application/store";
import { AUTHENTICATED } from "../application/types";
// import store from "./redux/store";

// //console.log(makeStore().getState())

axios.interceptors.response.use(
  (response) => {
    // //console.log(response);
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    // //console.log(originalRequest, "error-config", error)
    if (error && error?.response?.status === 403) {
      // localStorage.removeItem('refresh_token')
      // localStorage.removeItem('access_token')
      return;
    }
    if (error?.response?.status === 401 && !originalRequest._retry) {
      // //console.log(error)
      originalRequest._retry = true;

      return axios({
        method: "post",
        url: `${URL}/auth/signin`,
        data: {
          type: "refreshToken",
          payload: {
            refreshToken: localStorage.getItem("refresh_token"),
          },
        },
      }).then((res) => {
        // console.log(res);
        originalRequest.headers["x-access-token"] =
          res?.data?.token.accessToken;
        // axios.defaults.headers.common["x-access-token"] =
        //   res.data.token.accessToken;

        if (res.status === 200) {
          makeStore().dispatch({
            type: AUTHENTICATED,
            payload: {
              data: {
                access_token: res?.data?.token.accessToken,
                refresh_token: res?.data?.token.refreshToken,
              },
            },
          });
          // 1) put token to LocalStorage
          localStorage.setItem("access_token", res.data.token.accessToken);
          // if (decoded.roleId) {
          //   localStorage.setItem("roleId", decoded.role);
          // }

          // 2) Change Authorization header
          axios.defaults.headers.common["x-access-token"] =
            res.data.token.accessToken;

          // 3) return originalRequest object with Axios.
          return axios(originalRequest);
        }
      });
    }

    // return Error object with Promise
    return Promise.reject(error);
  }
);
