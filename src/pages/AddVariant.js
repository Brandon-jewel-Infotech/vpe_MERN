import React, { useRef } from "react";
import PrimaryLayout from "../Layout/PrimaryLayout";
import FormField from "../components/FormField";

const AddVariant = () => {
  const imgRef = useRef();
  return (
    <PrimaryLayout>
      <div className="flex flex-col mb-6">
        <h2 className="text-xl font-bold text-start mb-3">
          Add Variant Details
        </h2>
        <h4 className="text-md text-start mb-3 lg:mb-0">
          Add Variant &gt; Variant Details
        </h4>
      </div>
      <div className="bg-base-100 card w-[98%] lg:w-[50%] rounded-none shadow-xl">
        <div className="card-body">
          <div className="flex gap-4">
            <FormField title="Name" />
            <FormField title="Price for Business" />
          </div>
          <div className="flex gap-4">
            <FormField title="Price for Customers" />
            <FormField title="Description" />
          </div>
          <label className="form-control">
            <div className="label">
              <span className="label-text font-semibold">Product Images</span>
              {/* <span className="label-text-alt text-error">Alt label</span> */}
            </div>
            <div
              className="textarea textarea-bordered flex items-center justify-center h-20 bg-white"
              onClick={() => {
                imgRef?.current?.click();
              }}
              onDragOver={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files[0]) {
                  // const imgArray = Array.from(e.dataTransfer.files);
                  // setImages((currImages) => {
                  //   let newImagesArr = [...currImages, ...imgArray];
                  //   const urlArr = newImagesArr.map((image) =>
                  //     URL.createObjectURL(image)
                  //   );
                  //   setUploadedImageUrls(urlArr);
                  //   return newImagesArr;
                  // });
                }
              }}
            >
              Drop your files here or browse
              <input
                type="file"
                accept=".jpg, .png, .jpeg, .gif"
                multiple
                hidden
                ref={imgRef}
                onChange={(e) => {
                  if (e.currentTarget.files[0]) {
                    const imgArray = Array.from(e.currentTarget.files);
                    // setImages((currImages) => {
                    // let newImagesArr = [...currImages, ...imgArray];
                    // const urlArr = newImagesArr.map((image) =>
                    //   URL.createObjectURL(image)
                    // );
                    // setUploadedImageUrls(urlArr);
                    // return newImagesArr;
                    // });
                  }
                }}
              />
            </div>
          </label>

          <button className="primary-btn mt-5">Add Product</button>
        </div>
      </div>
    </PrimaryLayout>
  );
};

export default AddVariant;
