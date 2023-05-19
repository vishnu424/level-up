import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { authActions } from "../../../application/actions/Auth.actions";

import { subscriptionActions } from "../../../application/actions/Subscription.action";
import { useRouter } from "next/router";

const env = process.env.ENV;

const SubscriptionModal = ({
  setShowSubscriptionModal,
  selectedPlanPrice,
  subScriptionId,
  subscriptionPlanDuration,
  subscriptionTitle,
  validityDate,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const userInfo = useSelector((state) => state.auth.userInfo);

  const couponData = useSelector((state) => state.subscription.coupon_data);

  const { is_mobile: isMobile } = useSelector((state) => state.levelUp);

  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [applyCoupon, setApplyCoupon] = useState(false);

  const [couponInput, setCouponInput] = useState("");

  const [gstPrice, setGstPrice] = useState("");

  useEffect(() => {
    const gstCharge = Math.floor((selectedPlanPrice / 100) * 9);
    setGstPrice(gstCharge);
  }, []);

  const onClickApplyCoupon = async () => {
    const res = await dispatch(
      subscriptionActions.getCoupons(subScriptionId, couponInput)
    );
    if (res && res.isValid) {
      setApplyCoupon(true);
      setIsCouponApplied(false);
    } else {
      dispatch(authActions.showAlert("WRONG COUPON CODE", "danger"));
    }
  };

  const removeCoupon = () => {
    setApplyCoupon(false);
    setCouponInput("");
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement(`script`);
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handleProceedToPay = async (amount) => {
    let coupon = couponData && couponData.isValid ? couponInput : "";
    let subscriptionPlanId = subScriptionId;

    let resp = await dispatch(
      subscriptionActions.getorderId({
        subscriptionPlanId,
        subscriptionPlanDuration,
        amount,
        coupon,
      })
    );

    const res = await loadScript(
      `https://checkout.razorpay.com/v1/checkout.js`
    );
    if (!res) {
      alert("you are offline");
      return;
    }
    let orderId = resp?.success?.payload?.id;

    const options = {
      key: `${
        env === "development"
          ? "rzp_test_YRuYF7GyVw0gvO"
          : "rzp_live_61ayEsewCyne0q"
      }`,
      currency: "INR",
      amount: amount * 100,
      name: "Level Up",
      description: "Your order",
      order_id: orderId,

      handler: async function (response) {
        if (response.razorpay_payment_id) {
          await dispatch(
            subscriptionActions.getTranscation(resp.success.payload.id)
          );
          // alert(`Payment id : ${response.razorpay_payment_id}`);

          dispatch(authActions.showAlert("payment successfull", "success"));
          router.push("/");
        }
      },
      prefill: {
        name: `${userInfo.firstName}`,
        Email: `${userInfo.email}`,
        contact: `${userInfo.phone}`,
      },
      // notify: {
      //   sms: true,
      //   email: true,
      // },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const getApplyCouponSection = () => {
    if (isCouponApplied) {
      return (
        <div
          style={{ height: "48px", width: isMobile ? "100%" : "500px" }}
          className="flex justify-around items-center mb-6 mt-4 md:mt-1"
        >
          <div
            className="md:w-52"
            styles={{
              height: "63px",
              border: "2px solid black",
              boxSizing: "border-box",
              borderRadius: "13px",
            }}
          >
            <input
              className="w-28 md:w-52 md:h-14 h-10 text-center text-black font-bold placeholder-black:"
              style={{
                background: "#B2B5B7",
                border: "1.46512px solid rgba(84, 98, 135, 0.3)",
                borderRadius: "13.186px",
              }}
              onChange={(e) => setCouponInput(e.target.value)}
              type="input"
              placeholder="Enter Coupon Code"
            />
          </div>
          <button
            type="button"
            style={{
              backgroundColor: "#96E09E",
              borderRadius: "7px",
            }}
            className="text-white md:w-28 h-10 w-20"
            onClick={onClickApplyCoupon}
          >
            APPLY
          </button>
          <button
            onClick={() => setIsCouponApplied(false)}
            type="button"
            style={{
              color: "#546287",
              height: "42px",
              border: "1.46512px solid rgba(84, 98, 135, 0.3)",
              borderRadius: "7px",
            }}
            className="md:w-28 w-20"
          >
            CANCEL
          </button>
        </div>
      );
    } else {
      return (
        <div
          style={{ height: "48px", width: isMobile ? "100%" : "500px" }}
          className="flex md:justify-between items-center mb-6 pr-4"
        >
          <h1 className=" font-bold text-3xl ">MY ORDER</h1>
          {!applyCoupon ? (
            <div className=" flex  justify-between items-center">
              <img
                className="hidden md:flex"
                src="/percentage-img.svg"
                height={50}
                width={50}
                alt="percentile"
              />
              <button
                type="button"
                onClick={() => setIsCouponApplied(true)}
                className="coupon-bg ml-4 text-black text-lg"
              >
                APPLY COUPON
              </button>
            </div>
          ) : (
            <button
              className="remove-coupon-bg mr-4 text-lg"
              onClick={() => removeCoupon()}
            >
              {couponInput}
            </button>
          )}
        </div>
      );
    }
  };

  const roundSum = (val) => Math.round((val + Number.EPSILON) * 100) / 100;

  return (
    <div className="bg-blur-styling text-white justify-center items-center flex overflow-x-hidden overflow-y-auto scroll-smooth fixed inset-0 z-40 outline-none focus:outline-none py-4 ">
      <div className="m-auto">
        <div
          className="md:p-7 p-3 border-0 md:px-5 mx-3 md:mx-1 rounded-2xl font-open-sans  shadow-lg relative flex  justift-center items-center flex-col w-full bg-black outline-none focus:outline-none"
          style={{
            width: isMobile ? "95%" : "569px",
            height: "100%",
            borderRadius: "30px",
          }}
        >
          <div
            className="flex flex-row-reverse  self-end  pl-12   rounded-t cursor-pointer "
            onClick={() => {
              setShowSubscriptionModal(false);
            }}
          >
            <img src="/close.svg" alt="close" width="18px" height="20px" />
          </div>
          <div className="flex self-center  flex-col  justift-center  md:px-5 ">
            {getApplyCouponSection()}

            <div
              className="px-4 py-6"
              style={{
                backgroundColor: "#191C21",
                borderRadius: "16px",
                width: isMobile ? "100%" : "506px",
                height: "100%",
              }}
            >
              <div className="flex text-white justify-between mb-2 text-xl">
                <h1>
                  {subscriptionTitle} Subscription valid till {validityDate}
                </h1>
                <h1>{roundSum(selectedPlanPrice - 2 * gstPrice)}/-</h1>
              </div>
              <hr className=" mb-3" />
              <div className="flex justify-between items-center mb-2">
                <h1>SGST (9%)-</h1>
                <h1>{roundSum(gstPrice)}/-</h1>
              </div>
              <div className="flex justify-between items-center mt-2">
                <h1>CGST (9%)-</h1>
                <h1>{roundSum(gstPrice)}/-</h1>
              </div>
              {applyCoupon && (
                <div className="flex  justify-between items-center mt-2">
                  <p>Discount(coupon code - {couponInput})</p>
                  <h1>{roundSum(couponData?.offAmount)}/-</h1>
                </div>
              )}
            </div>

            <hr
              style={{ border: "0.7px solid rgba(0, 0, 0, 0.24)" }}
              className="mt-6"
            />
            <div className="flex justify-between items-center ">
              <h1 className=" font-bold text-3xl ">TOTAL</h1>
              <h1 className="text-2xl">
                {applyCoupon
                  ? roundSum(couponData?.finalAmount)
                  : roundSum(selectedPlanPrice)}
                /-
              </h1>
            </div>
            <hr
              style={{ border: "0.7px solid rgba(0, 0, 0, 0.24)" }}
              className=" mb-4"
            />
            <button
              style={{
                boxShadow:
                  "-6.32941px -6.32941px 6.32941px rgba(237, 237, 237, 0.25), 6.32941px 6.32941px 6.32941px rgba(0, 0, 0, 0.04)",

                backgroundColor: "#EA5437",
                borderRadius: "8px",
                height: "60px",
              }}
              type="button"
              onClick={() =>
                handleProceedToPay(
                  applyCoupon ? couponData.finalAmount : selectedPlanPrice
                )
              }
              className={`w-48 text-white mt-2 self-center uppercase primary font-bold py-2 text-[22px] leading-[25px] focus:outline-none flex items-center justify-center cursor-pointer`}
            >
              PROCEED TO PAY
              {applyCoupon ? couponData.finalAmount : selectedPlanPrice}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
