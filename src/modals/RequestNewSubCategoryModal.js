import React, { useState } from "react";
import FormField from "../components/FormField";
import { logout } from "../redux/slice";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

export const RequestNewSubCategoryModal = ({ category }) => {
  const dispatch = useDispatch();
  const [subCategoryName, setSubCategoryName] = useState();
  const { tok } = useSelector((state) => state.user);

  const requestNewCategory = async () => {
    try {
      let message = `I want to request a new sub category (${subCategoryName}) under category id (${category?.id}) named (${category?.name}) `;

      const { data } = await toast.promise(
        axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/seller/requests/create`,
          {
            description: message,
            receiver: 0,
            role: 2,
          },
          {
            headers: {
              Authorization: tok,
            },
          }
        ),
        {
          pending: "Adding Sub Category request...",
          success: "Sub Category request added Successfully!",
          error: {
            render({ data }) {
              if (data?.response?.status === 401) {
                dispatch(logout());
                return "Session Expired";
              } else {
                return (
                  data?.response?.data?.error ||
                  "Failed to add Sub Category request."
                );
              }
            },
          },
        }
      );
      document.getElementById("sub_category_modal").close();
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <>
      <button
        className="text-start ml-2 mt-1 text-neutral hover:text-[#bc8ffc] w-fit"
        onClick={() =>
          document.getElementById("sub_category_modal").showModal()
        }
      >
        Request a new sub-category?
      </button>
      <dialog id="sub_category_modal" className="modal">
        <div className="modal-box">
          <h2 className="font-semibold text-xl my-2">
            Request new sub category in {category?.name}
          </h2>
          <FormField
            title="Enter new Sub Category name"
            value={subCategoryName}
            inputHandler={(e) => {
              setSubCategoryName(e.target.value);
            }}
          />
          <div className="flex w-full justify-center gap-4">
            {/* if there is a button in form, it will close the modal */}
            <form method="dialog">
              <button className=" btn secondary-btn">Cancel</button>
            </form>
            <button
              className=" btn primary-btn"
              onClick={() => {
                requestNewCategory();
              }}
            >
              Make request
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default RequestNewSubCategoryModal;
