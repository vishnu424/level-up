import { useState, useEffect } from "react";

const CustomButton = ({ type, title, ...otherProps }) => {
  const [btnType, setBtnType] = useState("");

  useEffect(() => {
    if (type === "primary") {
      setBtnType("text-white bg-primary");
    } else if (type === "third") {
      setBtnType("text-white bg-custom-orange-1 ");
    } else if (type === "reportBtn") {
      setBtnType("text-white bg-blue-500");
    } else {
      setBtnType("text-primary bg-white");
    }
  }, [type]);

  const reportBtn = type === "reportBtn";
  // hover:bg-gray-200
  return (
    <button
      type="button"
      style={{ backgroundColor: "#E8631C", borderRadius: "40px" }}
      className={`uppercase  font-semibold text-white  w-36  h-12 text-md text-center md:mb-10 mb-5 ${
        reportBtn ? "rounded-md px-16" : "rounded-full px-8"
      } focus:outline-none ${btnType}`}
      {...otherProps}
    >
      {title}
    </button>
  );
};

export default CustomButton;
