import { useSelector } from "react-redux";
import CustomButton from "../../CustomButton";

const AuthFirst = ({ handleLogin, handleSignUp }) => {
  const { is_mobile: isMobile } = useSelector((state) => state.levelUp);

  return (
    <div className=" flex flex-col items-center justify-center md:py-12  px-12  ">
      {!isMobile && (
        <img
          className="w-72 h-36 "
          src="/logo.svg"
          alt="logo"
          style={{ margin: "0 auto" }}
        />
      )}
      <p
        style={{
          color: "#F5F6FA",
        }}
        className="font-semibold text-lg leading-8 text-center  "
      >
        Welcome to the levelup learning experience!
      </p>

      <div className="md:mt-6 mt-4" onClick={() => handleSignUp("signup")}>
        <CustomButton type="secondary" title="Sign up" />
      </div>
      <div
        style={{ color: "#F5F6FA" }}
        className="flex justify-between px-5 font-semibold text-base  w-full items-center"
      >
        <p className=" ">Already a member?</p>
        <span
          onClick={() => handleLogin("login")}
          className=" uppercase  hover-border-white  font-black cursor-pointer"
        >
          Login
        </span>
      </div>
    </div>
  );
};

export default AuthFirst;
