import React from "react";

const FallbackText = ({ IconRef, message, size = 150 }) => {
  return (
    <div className="flex flex-col justify-center items-center mx-auto text-lg ">
      <IconRef size={size} className="text-neutral" />
      {message}
    </div>
  );
};

export default FallbackText;
