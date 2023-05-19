import {
  GET_SUBSCRIPTION_PLANS,
  GET_COUPONS,
  SUBSCRIPTION_LOADING,
} from "../types";

const initialState = {
  subscription_plans: [],
  subscription_loading: false,
  coupon_data: [],
};

const SubscriptionReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case GET_SUBSCRIPTION_PLANS:
      return {
        ...state,
        subscription_plans: action.payload.data,
      };
    case GET_COUPONS:
      return {
        ...state,
        coupon_data: action.payload.data,
      };

    case SUBSCRIPTION_LOADING:
      return {
        ...state,
        subscription_loading: action.payload,
      };
    default:
      return state;
  }
};

export default SubscriptionReducer;
