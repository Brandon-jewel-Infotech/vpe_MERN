import React, { useState } from "react";
import PrimaryLayout from "../../Layout/PrimaryLayout";
import FormField from "../../components/FormField";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const AddEmployee = () => {
  const [name, setName] = useState();
  const [contact, setContact] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  return (
    <PrimaryLayout>
      <div className="flex flex-col mb-6">
        <h2 className="text-xl font-bold text-start mb-3">Add Employee</h2>
        <h4 className="text-md text-start mb-3 lg:mb-0">
          Employee &gt; Add Employee
        </h4>
      </div>
      <div className="flex gap-10 max-lg:flex-col items-center bg-white">
        <div className="w-[98%] lg:w-[50%] h-full">
          <div className="bg-base-100 card card-body rounded-sm shadow-xl">
            <FormField
              title="Name"
              required={true}
              inputHandler={(e) => {
                setName(e.target.value);
              }}
            />
            <FormField
              title="Contact"
              required={true}
              inputHandler={(e) => {
                setContact(e.target.value);
              }}
            />
            <FormField
              title="Email"
              required={true}
              inputHandler={(e) => {
                setEmail(e.target.value);
              }}
            />
            <FormField
              title="Password"
              required={true}
              inputHandler={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button className="primary-btn mt-5">Add Product</button>
          </div>
        </div>
      </div>
    </PrimaryLayout>
  );
};

export default AddEmployee;
