import React, { useEffect, useRef, useState } from "react";
import PrimaryLayout from "../Layout/PrimaryLayout";
import FormField from "../components/FormField";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../redux/slice";
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
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (!profileDetails?.name) {
        return toast.error("Please Enter a name");
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
      <div className="flex gap-10 max-lg:flex-col bg-white max-md:pb-28">
        <div className="w-full h-full">
          <div className="bg-base-100 card card-body  shadow-xl rounded-md grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="col-span-full">
              <FormField
                title="Name"
                required={true}
                name={"name"}
                value={profileDetails?.name}
                inputHandler={inputHandler}
              />
            </div>
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
