import React from "react";

const TextField = ({ type, title, placeholder, inputHandler, errorMsg ,name }) => {
  return (
    <label className="form-control w-full ">
      <div className="label">
        <span className="label-text font-semibold">{title}</span>
        <span className="label-text-alt text-error">{errorMsg}</span>
      </div>
      <textarea 
        type={type}
        name={name}
        placeholder={placeholder}
        className="input  w-full textarea textarea-bordered mb-3 h-24"
        onChange={inputHandler}
      />
      <div className="label">
        {/* <span className="label-text-alt ">{errorMsg}</span> */}
        {/* <span className="label-text-alt">Bottom Right label</span> */}
      </div>
    </label>
  );
};

export default TextField;
