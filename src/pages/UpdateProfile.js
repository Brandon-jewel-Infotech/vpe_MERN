import React, { useEffect, useRef, useState } from "react";
import PrimaryLayout from "../Layout/PrimaryLayout";
import FormField from "../components/FormField";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../redux/slice";
import FileUploader from "../components/FileUploader";
// import RequestNewCompanyModal from "../modals/RequestNewCompanyModal";
// import RequestNewSubCategoryModal from "../modals/RequestNewSubCategoryModal";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tok } = useSelector((state) => state.user);

  const [profileDetails, setProfileDetails] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
    gstin: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    zip: "",
    gmap_link: "",
    holder_name: "",
    account_number: "",
    ifsc_code: "",
    bank_name: "",
    bank_address: "",
    upi: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (
        !profileDetails?.name ||
        !profileDetails?.gstin ||
        !profileDetails?.address_line_1 ||
        !profileDetails?.city ||
        !profileDetails?.zip ||
        !profileDetails?.gmap_link ||
        !profileDetails?.holder_name ||
        !profileDetails?.account_number ||
        !profileDetails?.ifsc_code ||
        !profileDetails?.bank_name ||
        !profileDetails?.ifsc_code ||
        !profileDetails?.upi
      ) {
        return toast.error("Please fill all required details");
      }

      if (profileDetails?.password && profileDetails?.password?.length < 8) {
        return toast.error("Password must be at least 8 characters");
      }
      if (profileDetails?.password !== profileDetails?.confirmPassword) {
        return toast.error("Password and Confirm Password must be the same");
      }

      const res = await toast.promise(
        axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/users/profile`,
          profileDetails,
          {
            headers: {
              Authorization: tok,
            },
          }
        ),
        {
          pending: "Updating Profile...",
          success: "Profile Updated Successfully!",
          error: {
            render({ data }) {
              if (data?.response?.status === 401) {
                dispatch(logout());
                return "Session Expired";
              } else {
                return (
                  data?.response?.data?.error || "Failed to update Profile."
                );
              }
            },
          },
        }
      );
      if (res?.status === 201) {
        navigate("/profiles");
      }
    } catch (e) {}
  };
  const inputHandler = (e) => {
    setProfileDetails((currDetails) => {
      return { ...currDetails, [e.target.name]: e.target.value };
    });
  };

  const getProfileData = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/users/profile`,
        {
          headers: {
            Authorization: tok,
          },
        }
      );

      setProfileDetails(data);
    } catch (error) {
      if (error?.response?.status === 401) {
        toast.dismiss();
        toast.error("Session Expired");
        dispatch(logout());
      }
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <PrimaryLayout>
      <div className="flex flex-col mb-6 text-start">
        <h2 className="text-xl font-bold ">Update Profile Details</h2>
        {/* <h4 className="text-md ">Profiles &gt; Profile Details</h4> */}
      </div>
      <div className="flex gap-10 max-lg:flex-col bg-white">
        <div className="w-full h-full">
          <div className="bg-base-100 card card-body  shadow-xl rounded-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <FormField
              title="Name"
              required={true}
              name={"name"}
              value={profileDetails?.name}
              inputHandler={inputHandler}
            />
            <FormField
              title="GSTIN"
              required={true}
              name={"gstin"}
              value={profileDetails?.gstin}
              inputHandler={inputHandler}
            />
            <FormField
              title="Email"
              required={true}
              disabled={true}
              name={"email"}
              value={profileDetails?.email}
              inputHandler={inputHandler}
            />
            <FormField
              title="Contact"
              required={true}
              type={"number"}
              disabled={true}
              name={"contact"}
              value={profileDetails?.contact}
              inputHandler={inputHandler}
            />

            <FormField
              title="Address Line 1"
              required={true}
              value={profileDetails?.address_line_1}
              name={"address_line_1"}
              inputHandler={inputHandler}
            />
            <FormField
              title="Address Line 2"
              value={profileDetails?.address_line_2}
              name={"address_line_2"}
              inputHandler={inputHandler}
            />
            <FormField
              title="City"
              required={true}
              value={profileDetails?.city}
              name={"city"}
              inputHandler={inputHandler}
            />
            <FormField
              title="State"
              required={true}
              value={profileDetails?.state}
              name={"state"}
              inputHandler={inputHandler}
            />
            <FormField
              title="Pin Code"
              required={true}
              type={"number"}
              value={profileDetails?.zip}
              name={"zip"}
              inputHandler={inputHandler}
            />
            <FormField
              title="Google Map Link"
              required={true}
              value={profileDetails?.gmap_link}
              name={"gmap_link"}
              inputHandler={inputHandler}
            />
            <FormField
              title="Account Holder"
              required={true}
              value={profileDetails?.holder_name}
              name={"holder_name"}
              inputHandler={inputHandler}
            />
            <FormField
              title="Account Number"
              required={true}
              value={profileDetails?.account_number}
              name={"account_number"}
              inputHandler={inputHandler}
            />
            <FormField
              title="IFSC Code"
              required={true}
              value={profileDetails?.ifsc_code}
              name={"ifsc_code"}
              inputHandler={inputHandler}
            />
            <FormField
              title="Bank Name"
              required={true}
              value={profileDetails?.bank_name}
              name={"bank_name"}
              inputHandler={inputHandler}
            />
            <FormField
              title="Bank Address"
              required={true}
              value={profileDetails?.bank_address}
              name={"bank_address"}
              inputHandler={inputHandler}
            />
            <FormField
              title="UPI"
              required={true}
              value={profileDetails?.upi}
              name={"upi"}
              inputHandler={inputHandler}
            />
            <FormField
              title="New Password"
              type={"password"}
              name={"password"}
              value={profileDetails?.password}
              inputHandler={inputHandler}
            />
            <FormField
              title="Confirm Password"
              type={"password"}
              name={"confirmPassword"}
              value={profileDetails?.confirmPassword}
              inputHandler={inputHandler}
            />
            <button
              className="primary-btn self-end col-span-full"
              onClick={submitHandler}
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </PrimaryLayout>
  );
};

export default UpdateProfile;
