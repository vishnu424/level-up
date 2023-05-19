import React from "react";
import WebsiteButton from "../../Button/WebsiteButton";

function LoginIntro() {
  return (
    <div className="h-full">
      <div>
        <p className="font-bold text-5xl text-gray-3">
          Congratulations!
          <br /> You’re in.
        </p>
        <p className="mt-14 text-2xl text-gray-3">
          Congratulations! You’re in in. lorem
          <br /> ipsoum and all the other weird roman I know
        </p>
        <div className="flex gap-2 mt-16">
          <div className="flex-1 flex flex-col items-center">
            <img src="/login-1.svg" style={{ minHeight: 95 }} />
            <p className="text-white font-medium text-sm text-center">
              {" "}
              Coursebook with extensive information
            </p>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <img src="/login-2.svg" style={{ minHeight: 95 }} />
            <p className="text-white font-medium text-sm text-center">
              {" "}
              Exclusive workshops and events
            </p>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <img src="/login-2.svg" style={{ minHeight: 95 }} />
            <p className="text-white font-medium text-sm text-center">
              {" "}
              4+ hours of course content
            </p>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <img src="/login-4.svg" style={{ minHeight: 95 }} />
            <p className="text-white font-medium text-sm text-center">
              {" "}
              Signed Certificate from Instructor
            </p>
          </div>
        </div>
      </div>

      <div className=" flex justify-center mt-36">
        <WebsiteButton>CONTINUE ON WEB</WebsiteButton>
      </div>
    </div>
  );
}

export default LoginIntro;
