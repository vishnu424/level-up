import CustomButton from "../../CustomButton";
import CustomInput from "../../CustomInput";

const LoginIdentifier = ({
  identifier,
  setIdentifier,
  handleBack,
  handleLogin,
}) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin("login");
    }
  };

  return (
    <div className="inner-auth rounded-lg py-7 py:2 px-8">
      <p className="font-medium flex mb-8 text-primary">
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
      <CustomInput
        id="Email Id"
        name="identifier"
        label="Email Id / Phone Number"
        type="text"
        value={identifier}
        onKeyPress={handleKeyPress}
        onChange={(e) => setIdentifier(e.target.value)}
      />
      <div
        className="text-center md:mt-28 mt-12"
        onClick={() => handleLogin("login")}
      >
        <CustomButton type="primary" title="Verify" test="test" />
      </div>
    </div>
  );
};

export default LoginIdentifier;
