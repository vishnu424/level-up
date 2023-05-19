import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import { authActions } from "../../../application/actions/Auth.actions";
// import { classActions } from "../../../application/actions/Class.actions";
import axios from "axios";
import { levelUpActions } from "../../../application/actions/LevelUp.actions";

const AuthBase = dynamic(() => import("./AuthBase/AuthBase"));
const AuthFirst = dynamic(() => import("./AuthBase/AuthFirst"));
const LoginForm = dynamic(() => import("./Login/LoginForm"));
const LoginIdentifier = dynamic(() => import("./Login/LoginIdentifier"));
const Otp = dynamic(() => import("./AuthBase/Otp"));
const SignupForm = dynamic(() => import("./SignUp/SignupForm"));
//const SignupClass = dynamic(() => import("./SignUp/SignupClass"));
// const CustomAlert = dynamic(() => import("../CustomAlert/CustomAlert"));

const Auth = ({ showSignup, setShowSignup, type }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  // const classSelected = useSelector((state) => state.classes.selected_class);

  // const { access_token: accessToken } = useSelector((state) => state.auth);
  // const classId = useSelector((state) => state.classes.selected_classId);

  const [currentShowingType, setCurrentShowingType] = useState("login");

  const [currentStep, setCurrentStep] = useState(0);

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const [seconds, setSeconds] = useState(30);
  const [firstField, setFirstField] = useState("");
  const [secondField, setSecondField] = useState("");
  const [thirdField, setThirdField] = useState("");
  const [fourthField, setFourthField] = useState("");

  // const [selectedClassId, setSelectedClassId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const [consentAccepted, setConsentAccepted] = useState(true);

  const callSendOtp = async () => {
    let data = "";
    if (currentShowingType === "signup") {
      data = mobileNumber ? mobileNumber : email;
      if (mobileNumber.length < 1 || email.length < 1) {
        return;
      }
    } else {
      data = identifier;
    }
    let res = await dispatch(
      authActions.sendOtp({
        identifier: data,
      })
    );

    if (res.status) {
      setSeconds(30);
      // dispatch(authActions.showAlert('otp send successfully')
    }

    res.message === "celebrate request validation failed"
      ? dispatch(authActions.showAlert(res.validation.body.message, "danger"))
      : dispatch(authActions.showAlert("OTP sent  successfully", "success"));
  };

  const handleSignUp = async (showingType, classId = "") => {
    setCurrentShowingType(showingType);
    if (currentStep === 0) {
    }

    //  else if (currentStep === 1) {
    //   setSelectedClassId("ae476eae-cb0e-45b9-8492-80ac54910742");
    // }
    else if (currentStep === 1) {
      if (firstName.length <= 0) {
        return dispatch(
          authActions.showAlert("First Name is required", "danger")
        );
      }
      if (lastName.length <= 0) {
        return dispatch(
          authActions.showAlert("Last Name is required", "danger")
        );
      }
      if (email.length <= 0) {
        return dispatch(authActions.showAlert("Email is required", "danger"));
      }
      if (mobileNumber.length <= 0) {
        return dispatch(
          authActions.showAlert("Phone number is required", "danger")
        );
      }
      if (password.length <= 0) {
        return dispatch(
          authActions.showAlert("Password is required", "danger")
        );
      }
      if (!consentAccepted) {
        return dispatch(
          authActions.showAlert("Please agree Terms and condition", "danger")
        );
      }
      let resEmail = await dispatch(
        authActions.checkUser({
          identifier: email,
        })
      );
      let resMobile = await dispatch(
        authActions.checkUser({
          identifier: mobileNumber,
        })
      );
      if (resEmail.exists) {
        return dispatch(
          authActions.showAlert("Email already exists", "danger")
        );
      }
      if (resMobile.exists) {
        return dispatch(
          authActions.showAlert("Mobile No. already exists", "danger")
        );
      }
      if (consentAccepted) {
        dispatch(authActions.callConsent());
      }
      callSendOtp();
    } else if (currentStep === 2) {
      let res = await dispatch(
        authActions.verifyOtp({
          identifier: mobileNumber,
          otp: firstField + secondField + thirdField + fourthField,
          userInfo: {
            firstName,
            lastName,
            classId: "1dcb6ad9-32a4-4d51-99ec-e5bbc2f91bfa",
            email,
            mobileNo: mobileNumber,
            password,
            country: "India",
            countryPhoneCode: "+91",
          },
        })
      );

      if (!res.status) {
        return dispatch(authActions.showAlert(res.message, "danger"));
      } else {
        return dispatch(
          authActions.showAlert("Successfully Registered", "success")
        );
      }
    }
    if (currentStep < 2) {
      setCurrentStep((prevState) => prevState + 1);
    }
  };

  const handleBack = () => {
    if (currentStep >= 0) {
      setCurrentStep((prevState) => prevState - 1);
    }
  };

  const handleLogin = async (showingType) => {
    setCurrentShowingType(showingType);
    if (currentStep === 0) {
    } else if (currentStep === 1) {
      if (!identifier) {
        return dispatch(
          authActions.showAlert("Enter the email/phone", "danger")
        );
      }
      let res = await dispatch(
        authActions?.checkUser({
          identifier: identifier,
        })
      );

      if (!res.exists) {
        return dispatch(authActions.showAlert("User doesnot exists", "danger"));
      }
    } else if (currentStep === 2) {
      setSeconds(30);
      if (!password) {
        return dispatch(authActions.showAlert("Enter the password", "danger"));
      }
      let res = await dispatch(
        authActions.signIn({
          type: "password",
          payload: {
            identifier: identifier,
            password,
          },
        })
      );

      if (res.status) {
        await localStorage.setItem("access_token", res.token.accessToken);
        await localStorage.setItem("refresh_token", res.token.refreshToken);
        await localStorage.setItem("userInfo", JSON.stringify(res.userInfo));
        axios.defaults.headers.common["x-access-token"] = res.token.accessToken;
        let resp = await dispatch(
          levelUpActions.isUserSubscribed(res?.userInfo?.uuidIdentifier)
        );

        showSignup
          ? setShowSignup(false)
          : resp && resp[0]?.subscriptionStatus
          ? router.push("/explore")
          : router.asPath.includes("subscription")
          ? ""
          : router.push("/subscription");
        //   window.location.reload();
      } else {
        dispatch(authActions.showAlert("Invalid Credentials", "danger"));
      }
    } else if (currentStep === 3) {
      let res = await dispatch(
        authActions.signIn({
          type: "otp",
          payload: {
            identifier: identifier,
            otp: firstField + secondField + thirdField + fourthField,
          },
        })
      );

      if (res.status) {
        await localStorage.setItem("access_token", res.token.accessToken);
        await localStorage.setItem("refresh_token", res.token.refreshToken);
        await localStorage.setItem("userInfo", JSON.stringify(res.userInfo));
        let resp = await dispatch(
          levelUpActions.isUserSubscribed(res?.userInfo?.uuidIdentifier)
        );

        showSignup
          ? setShowSignup(false)
          : resp && resp[0]?.subscriptionStatus
          ? router.push("/explore")
          : router.asPath.includes("subscription")
          ? ""
          : router.push("/subscription");
        //   window.location.reload();
      } else {
        return dispatch(authActions.showAlert("Invalid Credentials", "danger"));
      }
    }
    if (currentStep < 2) {
      setCurrentStep((prevState) => prevState + 1);
    }
  };

  let signupContent = "";
  if (currentShowingType === "signup") {
    if (currentStep === 0) {
      signupContent = (
        <AuthFirst handleLogin={handleLogin} handleSignUp={handleSignUp} />
      );
    }
    //  else if (currentStep === 1) {
    //   signupContent = (
    //     <SignupClass handleBack={handleBack} handleSignUp={handleSignUp} />
    //   );
    // }
    else if (currentStep === 1) {
      signupContent = (
        <SignupForm
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          mobileNumber={mobileNumber}
          setMobileNumber={setMobileNumber}
          consentAccepted={consentAccepted}
          setConsentAccepted={setConsentAccepted}
          handleBack={handleBack}
          handleSignUp={handleSignUp}
        />
      );
    } else if (currentStep === 2) {
      signupContent = (
        <Otp
          firstField={firstField}
          setFirstField={setFirstField}
          secondField={secondField}
          setSecondField={setSecondField}
          thirdField={thirdField}
          setThirdField={setThirdField}
          fourthField={fourthField}
          setFourthField={setFourthField}
          currentStep={currentStep + 1}
          seconds={seconds}
          setSeconds={setSeconds}
          handleBack={handleBack}
          callSendOtp={callSendOtp}
          handleSignUp={handleSignUp}
          currentShowingType={currentShowingType}
        />
      );
    }
  }

  // login

  let loginContent = "";
  if (currentShowingType === "login") {
    if (currentStep === 0) {
      loginContent = (
        <AuthFirst handleLogin={handleLogin} handleSignUp={handleSignUp} />
      );
    } else if (currentStep === 1) {
      loginContent = (
        <LoginIdentifier
          identifier={identifier}
          setIdentifier={setIdentifier}
          handleBack={handleBack}
          handleLogin={handleLogin}
        />
      );
    } else if (currentStep === 2) {
      loginContent = (
        <LoginForm
          identifier={identifier}
          setIdentifier={setIdentifier}
          password={password}
          setPassword={setPassword}
          setCurrentStep={setCurrentStep}
          handleBack={handleBack}
          handleLogin={handleLogin}
          //  handleBack={handleBack}
          callSendOtp={callSendOtp}
        />
      );
    } else if (currentStep === 3) {
      loginContent = signupContent = (
        <Otp
          firstField={firstField}
          setFirstField={setFirstField}
          secondField={secondField}
          setSecondField={setSecondField}
          thirdField={thirdField}
          setThirdField={setThirdField}
          fourthField={fourthField}
          setFourthField={setFourthField}
          currentStep={currentStep}
          seconds={seconds}
          setSeconds={setSeconds}
          handleBack={handleBack}
          callSendOtp={callSendOtp}
          handleLogin={handleLogin}
          currentShowingType={currentShowingType}
        />
      );
    }
  }

  return (
    <AuthBase currentStep={currentStep} currentShowingType={currentShowingType}>
      {currentShowingType === "signup" ? signupContent : loginContent}
    </AuthBase>
  );
};

export default Auth;
