import React, { useEffect, useState } from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toggleSidebar } from "../redux/slice";

const Navbar = () => {
  const { tok } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // console.log(id);
  const [notifications, setNotifications] = useState([]);
  // const [notifications, setNotifications] = useState([
  //   "This is first notification",
  //   "It's second",
  // ]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    notify();
  }, []);

  const notify = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/notification`,
        {
          headers: {
            Authorization: tok,
          },
        }
      );
      setLoading(true);
      setNotifications(res.data);
    } catch (error) {}
  };

  const removeNotification = async (notificationId) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/notification/${notificationId}`,
        {
          headers: {
            Authorization: tok,
          },
        }
      );

      if (res?.status === 200) {
        setNotifications((currNotifications) => {
          console.log(
            currNotifications.filter(
              (notification) => notification.id !== notificationId
            )
          );
          return currNotifications.filter(
            (notification) => notification.id !== notificationId
          );
        });
      }
    } catch (e) {}
  };

  return (
    <div className="w-full h-[12vh] navbar bg-base-200 shadow-sm sticky top-0 z-50 ">
      <div
        className="flex-none hidden md:block"
        onClick={() => {
          dispatch(toggleSidebar());
        }}
      >
        <label className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            color="#1BCFB4"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>

      <h2 className="flex-1 text-center font-semibold px-2 text-2xl text-secondary tracking-wide">
        VPE
      </h2>

      <div className="flex-none hidden lg:block">
        <ul className="menu menu-horizontal">
          <li className="dropdown dropdown-hover dropdown-end ">
            <div tabIndex={0} role="button" className="indicator">
              <span className="indicator-item badge badge-neutral top-2 right-4">
                {notifications?.length <= 99 ? notifications?.length : "99+"}
              </span>
              <FaBell size={30} />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-80 h-96 overflow-y-scroll  list-item"
            >
              {notifications?.length ? (
                notifications?.map((notification) => (
                  <li
                    key={notification.id}
                    className="flex flex-row flex-nowrap whitespace-normal justify-between w-full"
                  >
                    <p className="flex-1 ">
                      {notification.content}
                      <button
                        onClick={() => {
                          removeNotification(notification.id);
                        }}
                        className="flex justify-center items-center flex-none"
                      >
                        <AiOutlineClose size={17} />
                      </button>
                    </p>
                  </li>
                ))
              ) : (
                <li>
                  <p>No Notification</p>
                </li>
              )}
            </ul>
          </li>
          <li className="dropdown dropdown-hover dropdown-end">
            <div tabIndex={0} role="button" className="">
              <FaUserCircle size={30} />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
