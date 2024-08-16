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
    <label className="form-control w-full ">
      <div className="label">
        <span className="label-text font-semibold">
          {title} {required && <span style={{ color: "red" }}>*</span>}
        </span>
        <span className="label-text-alt text-error">{errorMsg}</span>
      </div>
      <input
        required={required ? true : false}
        type={type}
        name={name}
        value={value}
        disabled={disabled}
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
