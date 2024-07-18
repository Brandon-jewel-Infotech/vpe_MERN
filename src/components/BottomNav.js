import React from "react";
import Drawer from "react-bottom-drawer";
import { FaArrowUp } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { CiSettings } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slice";
import { IoMdCart } from "react-icons/io";

import { PiUsersThree } from "react-icons/pi";
import { GrUserNew } from "react-icons/gr";
import { MdOutlineRequestPage } from "react-icons/md";
import { LiaProductHunt } from "react-icons/lia";

const BottomNav = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const onClose = React.useCallback(() => {
    setIsVisible(false);
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <div
        className={`${
          isVisible ? "hidden" : "flex"
        } w-full justify-center py-3 fixed z-50 bottom-0 bg-slate-200 md:hidden `}
      >
        <button
          onClick={() => {
            setIsVisible(true);
          }}
          className="bg-blue-800 p-3 rounded-lg text-white relative bottom-8"
        >
          <FaArrowUp />
        </button>
      </div>
      <Drawer
        isVisible={isVisible}
        onClose={onClose}
        className={`${isVisible ? "" : "hidden"}`}
      >
        <div className="flex flex-wrap divide-y divide-gray-300">
          <button
            onClick={() => {
              navigate("/");
            }}
            className="flex flex-col justify-center items-center p-2 w-full hover:bg-gray-300"
          >
            <RxDashboard />
            Dashboard
          </button>
          <button
            onClick={() => {
              navigate("");
            }}
            className="flex flex-col justify-center items-center p-2 w-full hover:bg-gray-300"
          >
            <LiaProductHunt />
            Product
          </button>
          <button
            onClick={() => {
              navigate("/cart");
              setIsVisible(false);
            }}
            className="flex flex-col justify-center items-center p-2 w-full hover:bg-gray-300"
          >
            <IoMdCart />
            Cart
          </button>
          <button
            onClick={() => {
              navigate("/register");
              setIsVisible(false);
            }}
            className="flex flex-col justify-center items-center p-2 w-full hover:bg-gray-300"
          >
            <GrUserNew />
            Register
          </button>
          <button
            onClick={() => {
              navigate("/employee-list");
              setIsVisible(false);
            }}
            className="flex flex-col justify-center items-center p-2 w-full hover:bg-gray-300"
          >
            <PiUsersThree />
            Employee List
          </button>
          <button className="flex flex-col justify-center items-center p-2 w-full hover:bg-gray-300">
            <CiSettings />
            Market Place
          </button>
          <button
            onClick={() => {
              navigate("/order-request");
              setIsVisible(false);
            }}
            className="flex flex-col justify-center items-center p-2 w-full hover:bg-gray-300"
          >
            <MdOutlineRequestPage />
            Orders
          </button>

          <button
            onClick={() => {
              dispatch(logout());
              navigate("/login");
            }}
            className="flex flex-col justify-center items-center p-2 w-full hover:bg-gray-300"
          >
            <IoIosLogOut />
            Logout
          </button>
        </div>
      </Drawer>
    </>
  );
};

export default BottomNav;
