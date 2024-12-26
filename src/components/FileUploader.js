import React, { useEffect, useRef, useState } from "react";
import { FaFile } from "react-icons/fa";

const FileUploader = ({
  onFileUpload,
  acceptedFileStr,
  name,
  isRequired,
  isMultipleFile,
  className,
}) => {
  const fileRef = useRef();
  const [file, setFile] = useState(null);

  const handleFile = (e, type) => {
    const files = type === "drop" ? e.dataTransfer.files : e.target.files;
    if (files && files.length) {
      onFileUpload(Array.from(files), e.target.name);
      setFile(isMultipleFile ? Array.from(files) : Array.from(files)[0]);
    }
  };

  useEffect(() => {
    setFile(null);

    if (fileRef?.current) {
      fileRef.current.value = "";
    }
  }, [name]);

  const renderFilePreview = () => {
    return (
      <div className={"h-full flex gap-2 " + className}>
        {file.map((f) => {
          const fileType = f?.type;
          const isImage = fileType && fileType?.startsWith("image");

          return isImage ? (
            <img className="h-full" src={URL.createObjectURL(f)} alt={f.name} />
          ) : (
            <FaFile size={30} className="text-info" />
          );
        })}
      </div>
    );
  };

  return (
    <div
      className={
        "textarea textarea-bordered flex items-center justify-center h-14 w-full bg-white max-sm:text-xs " +
        className
      }
      //   onClick={() => fileRef.current.click()}
      onDragOver={(e) => e.preventDefault()}
      onDragLeave={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        handleFile(e, "drop");
      }}
    >
      {file ? renderFilePreview() : <>Drop your files here or browse</>}

      <input
        type="file"
        accept={acceptedFileStr}
        multiple
        name={name}
        hidden
        ref={fileRef}
        onChange={(e) => {
          handleFile(e);
        }}
        required={isRequired}
      />
    </div>
  );
};

export default FileUploader;
