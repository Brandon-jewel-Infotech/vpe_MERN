import React, { useState } from "react";
import PrimaryLayout from "../../../Layout/PrimaryLayout";
import FormField from "../../../components/FormField";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { logout } from "../../../redux/slice";
import FileUploader from "../../../components/FileUploader";

const AddVariant = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { tok } = useSelector((state) => state.user);
  const { id } = useParams();

  const [variantDetails, setVariantDetails] = useState({
    name: "",
    description: "",
    price_b2b: null,
    price_b2c: null,
    quantity: null,
  });
  const [variantImages, setVariantImages] = useState([]);

  const handleImageUpload = (newImages, name) => {
    setVariantImages((prevImages) => {
      return newImages;
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (
        !variantDetails?.name?.length ||
        !variantDetails?.description?.length ||
        !variantDetails?.price_b2b ||
        !variantDetails?.price_b2c ||
        !variantDetails?.quantity
      ) {
        return toast.error("Please fill all required details");
      }

      if (!variantImages.length) {
        return toast.error("Please add atleast one image to your variant.");
      }

      const formData = new FormData();
      for (let image of variantImages) {
        formData.append("images", image);
      }

      for (let key in variantDetails) {
        formData.append(key, variantDetails[key]);
      }

      const res = await toast.promise(
        axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/seller/products/${id}/variants`,
          formData,
          {
            headers: {
              Authorization: tok,
              "Content-Type": "multipart/form-data",
            },
          }
        ),
        {
          pending: "Adding Variant...",
          success: "Variant added Successfully!",
          error: {
            render({ data }) {
              if (data?.response?.status === 401) {
                dispatch(logout());
                return "Session Expired";
              } else {
                return data?.response?.data?.error || "Failed to add Variant.";
              }
            },
          },
        }
      );
      if (res?.status === 201) {
        navigate(location.state.previousPage);
      }
    } catch (e) {}
  };

  const inputHandler = (e) => {
    setVariantDetails((currDetails) => {
      return { ...currDetails, [e.target.name]: e.target.value };
    });
  };

  return (
    <PrimaryLayout>
      <div className="text-start flex flex-col mb-6">
        <h2 className="text-xl font-bold text-start">Add Variant Details</h2>
        {/* <p className="text-md">Products &gt; Add Variant</p> */}
      </div>
      <div className="bg-base-100 card w-[98%] lg:w-[50%] rounded-md shadow-xl mx-auto max-md:mb-28 ">
        <div className="card-body">
          <div className="flex max-sm:flex-col sm:gap-4">
            <FormField
              title="Name"
              name={"name"}
              value={variantDetails?.name}
              inputHandler={inputHandler}
              required
            />
            <FormField
              title="Price for Business"
              name={"price_b2b"}
              value={variantDetails?.price_b2b}
              inputHandler={inputHandler}
              required
              type={"number"}
            />
          </div>
          <div className="flex max-sm:flex-col sm:gap-4">
            <FormField
              title="Price for Customers"
              name={"price_b2c"}
              value={variantDetails?.price_b2c}
              inputHandler={inputHandler}
              required
              type={"number"}
            />
            <FormField
              title="Quantity"
              name={"quantity"}
              value={variantDetails?.quantity}
              inputHandler={inputHandler}
              required
              type={"number"}
            />
          </div>
          <div className="flex max-sm:flex-col sm:gap-4">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-semibold">
                  Product Images <span className="text-red-500">*</span>
                </span>
              </div>
              <FileUploader
                onFileUpload={handleImageUpload}
                acceptedFileStr={".png, .jpg, .jpeg, .gif"}
                isMultipleFile
              />
            </label>
            <FormField
              title="Description"
              name={"description"}
              value={variantDetails?.description}
              inputHandler={inputHandler}
              required
              className={"h-14"}
            />
          </div>

          <button className="primary-btn mt-5" onClick={submitHandler}>
            Add Variant
          </button>
        </div>
      </div>
    </PrimaryLayout>
  );
};

export default AddVariant;
