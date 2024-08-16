import React from "react";
import Drawer from "react-bottom-drawer";
import { FaArrowUp } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slice";

const BottomNav = ({ navItems }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isVisible, setIsVisible] = React.useState(false);

  const onClose = React.useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <>
      <div
        className={`${
          isVisible ? "hidden" : "flex"
        } w-full justify-center py-3 fixed z-50 bottom-0 bg-slate-200 md:hidden `}
      >
        {navItems?.length > 3 && (
          <button
            onClick={() => {
              setIsVisible(true);
            }}
            className="bg-blue-800 p-3 rounded-full text-white absolute bottom-16 "
          >
            <FaArrowUp />
          </button>
        )}
        <div className="w-full flex justify-between">
          {navItems
            ?.filter((navItem) => navItem.url)
            ?.slice(0, 3)
            ?.map(({ title, Icon, url }, index) => (
              <button
                key={index}
                onClick={() => {
                  navigate(url);
                }}
                className="flex flex-col justify-center items-center p-2 w-full hover:bg-gray-300"
              >
                <Icon size={20} />
                <span className="text-md">{title}</span>
              </button>
            ))}
          {navItems?.length < 3 && (
            <button
              onClick={() => {
                navigate("/login");
                dispatch(logout());
              }}
              className="flex flex-col justify-center items-center p-2 w-full hover:bg-gray-300"
            >
              <IoIosLogOut size={20} />
              <span className="text-md">Logout</span>
            </button>
          )}
        </div>
      </div>
      <Drawer
        isVisible={isVisible}
        onClose={onClose}
        className={`md:hidden ${isVisible ? "" : "hidden"}`}
      >
        <div className="grid grid-cols-3 divide-y divide-gray-300">
          {navItems?.map(({ title, Icon, url, links }, index) =>
            links ? (
              links?.map(({ title, Icon, url }, index) => (
                <button
                  key={index}
                  onClick={() => {
                    navigate(url);
                    setIsVisible(false);
                  }}
                  className="flex flex-col justify-center items-center p-2 w-full hover:bg-gray-300"
                >
                  <Icon size={20} />
                  <span className="text-sm">{title}</span>
                </button>
              ))
            ) : (
              <button
                key={index}
                onClick={() => {
                  navigate(url);
                  setIsVisible(false);
                }}
                className="flex flex-col justify-center items-center p-2 w-full hover:bg-gray-300"
              >
                <Icon size={20} />
                <span className="text-sm">{title}</span>
              </button>
            )
          )}
          <button
            onClick={() => {
              navigate("/login");
              dispatch(logout());
            }}
            className="flex flex-col justify-center items-center p-2 w-full hover:bg-gray-300"
          >
            <IoIosLogOut />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </Drawer>
    </>
  );
};

export default BottomNav;
