import React from "react";
import { useDispatch } from "react-redux";
import { AUTHENTICATED } from "../../../application/types";
import WebsiteButton from "../Button/WebsiteButton";
import LoginIntro from "./LoginComponents/LoginIntro";

function LoginModal({ visible }) {
  const dispatch = useDispatch();
  return (
    <div className="relative flex content-width mx-auto items-center h-full">
      <button
        className="absolute text-white text-lg top-5 -right-10"
        onClick={() => {
          localStorage.setItem("access-token", "a");
          dispatch({ type: AUTHENTICATED, payload: true });
        }}
      >
        x
      </button>
      {/* <div className="flex content-width mx-auto items-center h-[90%]"> */}
      <div className="border-t-0 border-b-0 border-l-0 border-r-2 border-[#E5E5E5] flex-1 flex flex-col items-center">
        <img src="/login-img.svg" />
        <p className="font-bold text-2xl text-gray-3 text-center mt-10">
          Download the App now!
        </p>
        <div className="flex mt-10">
          <img src="/google-play.svg" />
          <img src="/apple-store.svg" />
        </div>
      </div>
      <div className="ml-10 flex-1 flex flex-col justify-between h-full pt-24">
        <LoginIntro />
      </div>
      {/* </div> */}
    </div>
  );
}

export default LoginModal;
