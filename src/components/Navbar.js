import React, { useEffect, useState } from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import axios from "axios";

const Navbar = ({ toggleExpanded }) => {
  const { id, tok } = useSelector((state) => state.user);
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
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}notification`,
        { reciever: id },
        {
          headers: {
            Authorization: `${tok}`,
          },
        }
      );
      setLoading(true);
      setNotifications(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeNotification = (indexToRemove) => {
    setNotifications((prevNotifications) => {
      const updatedNotifications = [...prevNotifications];
      updatedNotifications.splice(indexToRemove, 1);
      return updatedNotifications;
    });
  };

  return (
    <div className="w-full navbar bg-base-200 shadow-sm sticky top-0 z-50 ">
      <div className="flex-none hidden md:block" onClick={toggleExpanded}>
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
            <div tabIndex={0} role="button" className="">
              <FaBell size={30} />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-80 h-96 overflow-y-scroll  list-item"
            >
              {notifications?.length ? (
                notifications?.map((notification, i) => (
                  <li
                    key={i}
                    className="flex flex-row flex-nowrap whitespace-normal justify-between w-full"
                  >
                    <p className="flex-1">
                      {notification.content}
                      <button
                        onClick={() => {
                          removeNotification(i);
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
