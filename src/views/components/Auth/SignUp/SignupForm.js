import dynamic from "next/dynamic";
import CustomButton from "../../CustomButton";
import CustomInput from "../../CustomInput";

const SignupForm = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  password,
  setPassword,
  consentAccepted,
  setConsentAccepted,
  mobileNumber,
  setMobileNumber,
  handleBack,
  handleSignUp,
}) => {
  return (
    <div className="inner-auth rounded-lg py-7 px-8 text-white">
      <p className="font-medium flex  text-primary mb-2">
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
      <div className="flex" style={{ marginBottom: "-1.3rem" }}>
        <CustomInput
          id="First Name"
          name="firstname"
          label="First Name"
          type="text"
          style={{ marginRight: "0.3rem" }}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <CustomInput
          id="Last Name"
          name="lastname"
          label="Last Name"
          type="text"
          style={{ marginLeft: "0.3rem" }}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <CustomInput
        id="Email Id"
        name="emailid"
        label="Email Id"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginTop: "0.5rem" }}
      />
      <CustomInput
        id="Phone Number"
        name="phoneno"
        label="Phone Number"
        type="number"
        value={mobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
        style={{
          background: "#transparent",
          marginTop: "0.5rem",
        }}
      />
      <CustomInput
        id="Password"
        name="password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          background: "#transparent",
          marginTop: "0.5rem",
        }}
        autoComplete="new-password"
      />

      <div className="flex  cursor-pointer  items-center mt-3 mb-3">
        <input
          style={{
            border: "2px solid #E8631C",
            borderRadius: "5px",
            accentColor: "transparent",
            height: "25px",
            width: "25px",
          }}
          id="terms"
          className="mr-3 w-5 h-5"
          type="checkbox"
          checked={consentAccepted}
          value={consentAccepted}
          onChange={() =>
            setConsentAccepted((consentAccepted) => !consentAccepted)
          }
        />

        <label className="text-sm text-custom-gray-1" htmlFor="terms">
          I agree to the
          <span className="text-custom-blue-1 font-bold mr-2 ml-2">
            Terms and Conditions
          </span>
          and
          <span className="text-custom-blue-1 font-bold"> Privacy Policy</span>
        </label>
      </div>

      <div className="text-center mt-5">
        <CustomButton
          type="primary"
          title="Sign Up"
          onClick={() => handleSignUp("signup")}
        />
      </div>
    </div>
  );
};

export default SignupForm;
