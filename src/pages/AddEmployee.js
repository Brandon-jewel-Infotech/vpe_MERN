import React, { useState } from "react";
import PrimaryLayout from "../Layout/PrimaryLayout";
import FormField from "../components/FormField";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { logout } from "../redux/slice";
import validateEmail from "../utils/validateEmail";

const AddEmployee = ({ role }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tok } = useSelector((state) => state.user);
  const { id } = useParams();

  const [employeeDetails, setEmployeeDetails] = useState({
    name: "",
    email: "",
    contact: null,
    password: null,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (
        !employeeDetails?.name?.length ||
        !validateEmail(employeeDetails?.email) ||
        employeeDetails?.contact?.length !== 10 ||
        employeeDetails?.password?.length < 8
      ) {
        return toast.error("Please fill all required details");
      }

      const res = await toast.promise(
        axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/employees/create`,
          employeeDetails,
          {
            headers: {
              Authorization: tok,
            },
          }
        ),
        {
          pending: `Adding ${role === "admin" ? "Moderator" : "Employee"}...`,
          success: `${
            role === "admin" ? "Moderator" : "Employee"
          } added Successfully!`,
          error: {
            render({ data }) {
              if (data?.response?.status === 401) {
                dispatch(logout());
                return "Session Expired";
              } else {
                return (
                  data?.response?.data?.error ||
                  `Failed to add ${
                    role === "admin" ? "Moderator" : "Employee"
                  }.`
                );
              }
            },
          },
        }
      );

      if (res?.status === 201) {
        navigate(role === "admin" ? "/users" : "/employee-list");
      }
    } catch (e) {}
  };

  const inputHandler = (e) => {
    setEmployeeDetails((currDetails) => {
      return { ...currDetails, [e.target.name]: e.target.value };
    });
  };

  return (
    <PrimaryLayout>
      <div className="flex flex-col mb-6 text-start">
        <h2 className="text-xl font-bold">
          Add {role === "admin" ? "Moderator" : "Employee"}
        </h2>
        <h4 className="text-md text-start">
          {role === "admin" ? "Users" : "Employees"} &gt; Add{" "}
          {role === "admin" ? "Moderator" : "Employee"}
        </h4>
      </div>
      <div className="flex gap-10 max-lg:flex-col items-center bg-white max-md:pb-28">
        <div className="bg-base-100 card w-[98%] lg:w-[50%] rounded-md shadow-xl mx-auto">
          <div className="bg-base-100 card card-body rounded-md shadow-xl">
            <FormField
              title="Name"
              required={true}
              name={"name"}
              value={employeeDetails?.name}
              inputHandler={inputHandler}
            />
            <div className="flex max-sm:flex-col sm:gap-4">
              <FormField
                title="Contact"
                required={true}
                name={"contact"}
                value={employeeDetails?.contact}
                inputHandler={inputHandler}
                type={"number"}
              />
              <FormField
                title="Email"
                required={true}
                name={"email"}
                value={employeeDetails?.email}
                inputHandler={inputHandler}
              />
            </div>
            <FormField
              title="Password"
              required={true}
              name={"password"}
              value={employeeDetails?.password}
              inputHandler={inputHandler}
              type={"password"}
            />
            <button className="primary-btn mt-5" onClick={submitHandler}>
              Add {role === "admin" ? "Moderator" : "Employee"}
            </button>
          </div>
        </div>
      </div>
    </PrimaryLayout>
  );
};

export default AddEmployee;
