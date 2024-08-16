import React from "react";

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
  return (
    <label className="form-control w-full min-w-20">
      <div className="label">
        <span className="label-text font-semibold">
          {title} {required && <span style={{ color: "red" }}>*</span>}
        </span>
        <span className="label-text-alt text-error">{errorMsg}</span>
      </div>
      <input
        required={required ? true : false}
        type={type}
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
      <div className="label"></div>
    </label>
  );
};

export default FormField;
