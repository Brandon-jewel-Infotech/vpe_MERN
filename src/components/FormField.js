import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const FormField = ({
  type,
  required,
  title,
  placeholder,
  inputHandler,
  errorMsg,
  value,
  name,
  disabled,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <label className="form-control w-full min-w-20">
      <div className="label">
        <span className="label-text font-semibold">
          {title} {required && <span style={{ color: "red" }}>*</span>}
        </span>
        <span className="label-text-alt text-error">{errorMsg}</span>
      </div>
      <div className="relative">
        <input
          required={required ? true : false}
          type={!isOpen || type !== "password" ? type : "text"}
          disabled={disabled}
          name={name}
          value={value}
          placeholder={placeholder}
          className={
            "input input-bordered w-full disabled:bg-gray-200 bg-white " +
            (className || "")
          }
          onChange={inputHandler}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="absolute right-4 top-4"
          >
            {isOpen ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>
      <div className="label"></div>
    </label>
  );
};

export default FormField;
