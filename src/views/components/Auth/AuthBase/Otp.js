import React from "react";
import CustomButton from "../../CustomButton";

const Otp = ({
  firstField,
  setFirstField,
  secondField,
  setSecondField,
  thirdField,
  setThirdField,
  fourthField,
  setFourthField,
  seconds,
  setSeconds,
  currentStep = 3,
  handleBack,
  callSendOtp,
  handleSignUp,
  handleLogin,
  currentShowingType,
}) => {
  const [resendStyle, setResendStyle] = React.useState("text-gray-300");
  const [resendDisabled, setResendDisabled] = React.useState("none");

  const firstFieldRef = React.useRef(null);
  const secondFieldRef = React.useRef(null);
  const thirdFieldRef = React.useRef(null);
  const fourthFieldRef = React.useRef(null);

  React.useEffect(() => {
    firstFieldRef.current.focus();
  }, []);

  React.useEffect(() => {
    // if (currentStep === 2 && seconds === 0) {
    //   setSeconds(30)
    // }
    let timer;
    if (currentStep === 3) {
      if (seconds > 0) {
        timer = setTimeout(() => setSeconds(seconds - 1), 1000);
        setResendStyle("text-gray-300");
        setResendDisabled("none");
      } else {
        setResendStyle("text-primary");
        setResendDisabled("");
      }
    }
    return () => {
      clearTimeout(timer);
    };
  }, [currentStep, seconds]);

  const handleOtp = () => {
    currentShowingType === "login"
      ? handleLogin("login")
      : handleSignUp("signup");
  };

  return (
    <div className="inner-auth rounded-lg py-7 px-8 text-white">
      <p className="font-medium flex mb-6 text-primary">
        <img
          src="/back-arrow.svg"
          alt="leftArrow"
          width="25"
          height="15"
          className="mr-5 cursor-pointer"
          onClick={handleBack}
        />
        <span className="text-white text-base">
          Log in to your LevelUp Learning account
        </span>
      </p>
      <div className="flex">
        <div className="md-input-main my-5 mx-3 ">
          <div className="md-input-box flex">
            <div className="w-full ">
              <input
                ref={firstFieldRef}
                id="otp1"
                className="md-input text-center bg-transparent"
                placeholder=" "
                minLength="1"
                maxLength="1"
                autoComplete="off"
                value={firstField}
                onChange={(e) => {
                  setFirstField(e.target.value);
                  secondFieldRef.current.focus();
                }}
              />
              <label htmlFor="" className="md-label"></label>
              <div className="md-input-underline" />
            </div>
          </div>
        </div>
        <div className="md-input-main my-5 mx-3">
          <div className="md-input-box flex">
            <div className="w-full">
              <input
                ref={secondFieldRef}
                id="otp2"
                className="md-input text-center bg-transparent"
                placeholder=" "
                minLength="1"
                maxLength="1"
                autoComplete="off"
                value={secondField}
                onChange={(e) => {
                  setSecondField(e.target.value);
                  thirdFieldRef.current.focus();
                }}
              />
              <label htmlFor="" className="md-label"></label>
              <div className="md-input-underline" />
            </div>
          </div>
        </div>
        <div className="md-input-main my-5 mx-3">
          <div className="md-input-box flex">
            <div className="w-full">
              <input
                ref={thirdFieldRef}
                id="otp3"
                className="md-input text-center bg-transparent"
                placeholder=" "
                minLength="1"
                maxLength="1"
                autoComplete="off"
                value={thirdField}
                onChange={(e) => {
                  setThirdField(e.target.value);
                  fourthFieldRef.current.focus();
                }}
              />
              <label htmlFor="" className="md-label"></label>
              <div className="md-input-underline" />
            </div>
          </div>
        </div>
        <div className="md-input-main my-5 mx-3">
          <div className="md-input-box flex">
            <div className="w-full">
              <input
                ref={fourthFieldRef}
                id="otp4"
                className="md-input text-center bg-transparent"
                placeholder=" "
                minLength="1"
                maxLength="1"
                autoComplete="off"
                value={fourthField}
                onChange={(e) => {
                  setFourthField(e.target.value);
                }}
              />
              <label htmlFor="" className="md-label"></label>
              <div className="md-input-underline" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <p className="text-primary text-sm my-3">
          Resend Code:{" "}
          <span className="font-semibold text-custom-red">{seconds}</span>
        </p>
        <p
          className={`text-sm my-3 cursor-pointer ${resendStyle}`}
          style={{ pointerEvents: resendDisabled }}
          onClick={callSendOtp}
        >
          Resend OTP
        </p>
      </div>
      <p
        className="text-primary font-semibold text-sm cursor-pointer"
        onClick={handleBack}
      >
        Edit my account details
      </p>
      <div className="text-center mt-8 md:mt-28">
        <CustomButton
          type="primary"
          title="Verify"
          test="test"
          onClick={handleOtp}
        />
      </div>
    </div>
  );
};

export default Otp;
