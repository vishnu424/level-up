import React from "react";

const CustomAlert = ({ isVisible, title, type = "primary" }) => {
  const [bgColor, setBgColor] = React.useState("");

  React.useEffect(() => {
    if (type === "success") {
      setBgColor("bg-success-1");
    } else if (type === "danger") {
      setBgColor("bg-danger");
    } else if (type === "blue") {
      setBgColor("bg-custom-blue-1");
    } else if (type === "gray") {
      setBgColor("bg-gray-600");
    } else {
      setBgColor("bg-primary ");
    }
  }, [type]);

  return isVisible ? (
    <div
      className="p-0.5 secondary-shadow mx-auto text-center outline-none"
      style={{ borderRadius: "8px" }}
    >
      <p
        className={`py-2 px-8 uppercase font-medium text-white ${bgColor}`}
        style={{ borderRadius: "7px" }}
      >
        {title}
      </p>
    </div>
  ) : null;
};

export default CustomAlert;
