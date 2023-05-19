import CustomButton from "../../CustomButton";
import CustomInput from "../../CustomInput";

const LoginForm = ({
  identifier,
  setIdentifier,
  password,
  setPassword,
  handleBack,
  handleLogin,
  callSendOtp,
  setCurrentStep,
}) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin("login");
    }
  };

  return (
    <div className="inner-auth rounded-lg py-7 py:2 px-8 h-full">
      <p className="font-medium flex mb-8 text-white">
        <img
          src="/back-arrow.svg"
          alt="leftArrow"
          width="25"
          height="15"
          className="mr-5 cursor-pointer"
          onClick={handleBack}
        />{" "}
        <span className="text-white text-base">
          Log in to your LevelUp Learning account
        </span>
      </p>
      <CustomInput
        id="Email Id"
        name="identifier"
        label="Email Id / Phone Number"
        type="text"
        // disabled
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        style={{
          pointerEvents: "none",
          background: "transparent",
          marginTop: "5px",
        }}
      />
      <CustomInput
        id="Password"
        name="password"
        label="Password"
        type="password"
        onKeyPress={handleKeyPress}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          background: "transparent",
          marginTop: "10px",
        }}
        autoComplete="new-password"
      />
      <p className="my-4 text-white text-sm ">
        Forgot Password?{" "}
        <span
          className="font-semibold uppercase pl-4 cursor-pointer"
          onClick={() => {
            callSendOtp();
            setCurrentStep((prevState) => prevState + 1);
          }}
        >
          log in using otp
        </span>
      </p>
      <div
        className="text-center md:mt-28 mt-7"
        onClick={() => handleLogin("login")}
      >
        <CustomButton type="primary" title="Verify" />
      </div>
    </div>
  );
};

export default LoginForm;
