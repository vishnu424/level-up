import axios from "axios";
import { URL } from "../../../config/config";

const token = process.browser && window.localStorage.getItem("access_token");
const classId = "1dcb6ad9-32a4-4d51-99ec-e5bbc2f91bfa";
// const classId = "ae476eae-cb0e-45b9-8492-80ac54910742";
const SubcriptionPlansData = () => {
  return axios
    .get(`${URL}/app/subscription`, {
      headers: {
        "x-class-id": classId,
        "x-app-name": "levelup",
        "x-access-token": token,
      },
    })
    .then((res) => {
      return res.data.results.filter((subs, index) => {
        return subs.uuidIdentifier === classId;
      });
    })
    .catch((error) => {
      throw error;
    });
};

const getOrderIdData = (data) => {
  // const classId = "ae476eae-cb0e-45b9-8492-80ac54910742";
  const requestOptions = {
    method: "POST",
    headers: {
      "x-class-id": classId,
      "x-app-name": "levelup",
      "x-access-token": token,
    },
  };
  // let classId = req.headers["x-class-id"];

  return axios(`${URL}/payment/order/level-up`, {
    ...requestOptions,
    data: { ...data },
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};

const getTranscationData = (transactionId) => {
  //  const classId = "ae476eae-cb0e-45b9-8492-80ac54910742";
  const requestOptions = {
    headers: {
      "x-class-id": classId,
      "x-app-name": "levelup",
      "x-access-token": token,
    },
  };
  // let classId = req.headers["x-class-id"];

  return axios(`${URL}/payment/transaction/${transactionId}`, {
    ...requestOptions,
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};

const getCouponsData = async (subScriptionId, couponInput) => {
  // const classId = "ae476eae-cb0e-45b9-8492-80ac54910742";
  return axios
    .get(
      `${URL}/app/coupon?coupon=${couponInput}&subscriptionId=${subScriptionId}`,
      {
        headers: {
          "x-class-id": classId,
          "x-app-name": "levelup",
          "x-access-token": token,
        },
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const subscriptionServices = {
  SubcriptionPlansData,
  getOrderIdData,
  getTranscationData,
  getCouponsData,
};
