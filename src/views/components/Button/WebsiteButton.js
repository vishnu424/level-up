import React from "react";

function WebsiteButton({
  children,
  bg = "bg-orange-1",
  px = "px-8",
  py = "py-3",
  textSize = "text-base",
  style,
}) {
  return (
    <button
      className={`${bg} cursor-pointer text-center flex justify-center items-center ${
        bg === "bg-gray-400" && "cursor-not-allowed"
      } text-white ${textSize} ${px} ${py} `}
      style={{ borderRadius: "81px", ...style }}
    >
      {children}
    </button>
  );
}

export default WebsiteButton;
