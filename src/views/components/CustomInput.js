import { useState } from "react";

const CustomInput = ({ id, name, label, type, onChange, ...otherProps }) => {
  const [passwordType, setPasswordType] = useState(type);

  const handlePasswordType = () => {
    passwordType === "password"
      ? setPasswordType("text")
      : setPasswordType("password");
  };
  let inputType;
  inputType = (
    <div className="md-input-box flex text-white">
      <div className="w-full">
        <input
          id={id}
          name={name}
          type={passwordType}
          className="md-input bg-transparent text-white"
          placeholder=" "
          onChange={onChange}
          autoComplete="new-password"
          {...otherProps}
        />
        <label htmlFor={name} className="md-label ">
          {label}
        </label>
        <div className="md-input-underline mr-5" />
      </div>
      {type === "password" &&
        (passwordType === "password" ? (
          <img
            src="/eye-close.svg"
            className="cursor-pointer absolute right-5 bottom-2"
            alt="/eye-close"
            onClick={handlePasswordType}
          />
        ) : (
          <img
            src="/eye.svg"
            className="cursor-pointer absolute right-5 bottom-1"
            alt="eye"
            onClick={handlePasswordType}
          />
        ))}
    </div>
  );

  return <div className="md-input-main my-5">{inputType}</div>;
};

export default CustomInput;
