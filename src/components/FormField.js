import React from "react";

const FormField = ({
  type,
  required,
  title,
  placeholder,
  inputHandler,
  errorMsg,
  name,
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
        placeholder={placeholder}
        className="input input-bordered w-full bg-white"
        onChange={inputHandler}
      />
      <div className="label"></div>
    </label>
  );
};

export default FormField;
