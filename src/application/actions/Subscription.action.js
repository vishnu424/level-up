import { subscriptionServices } from "../../infrastructure/services/Subcription.services";
import {
  GET_COUPONS,
  GET_SUBSCRIPTION_PLANS,
  SUBSCRIPTION_LOADING,
} from "../types";

const getSubscriptionPlans = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: SUBSCRIPTION_LOADING, payload: true });
      const res = await subscriptionServices.SubcriptionPlansData();
      dispatch({
        type: GET_SUBSCRIPTION_PLANS,
        payload: {
          data: res,
        },
      });
      dispatch({ type: SUBSCRIPTION_LOADING, payload: false });
    } catch (error) {
      dispatch({ type: SUBSCRIPTION_LOADING, payload: false });
    }
  };
};

const getorderId = (data) => {
  return async (dispatch) => {
    try {
      return await subscriptionServices.getOrderIdData(data);
    } catch (error) {
      return error;
    }
  };
};

const getTranscation = (transactionId) => {
  return async (dispatch) => {
    try {
      return await subscriptionServices.getTranscationData(transactionId);
    } catch (error) {
      return error;
    }
  };
};
const getCoupons = (subScriptionId, couponInput) => {
  return async (dispatch) => {
    try {
      const res = await subscriptionServices.getCouponsData(
        subScriptionId,
        couponInput
      );

      dispatch({
        type: GET_COUPONS,
        payload: {
          data: res,
        },
      });
      return res;
    } catch (error) {}
  };
};

export const subscriptionActions = {
  getSubscriptionPlans,
  getorderId,
  getTranscation,
  getCoupons,
};
