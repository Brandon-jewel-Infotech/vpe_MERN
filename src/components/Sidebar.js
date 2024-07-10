import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { logout, toggleSidebar } from "../redux/slice";
import { IoMdCart } from "react-icons/io";
import { IoBagCheckOutline } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import { RxDashboard } from "react-icons/rx";
import { PiUsersThree } from "react-icons/pi";
import { MdOutlineRequestPage } from "react-icons/md";
import { IoBagAdd } from "react-icons/io5";

const Sidebar = () => {
  const { auth, role, id, sidebarExpanded } = useSelector(
    (state) => state.user
  );

  const sidebarItems =
    (role === "admin" && [
      { icon: RxDashboard, title: "Dashboard", url: "/" },
      { icon: IoMdCart, title: "Requests", url: "/requests" },
      { icon: IoMdCart, title: "Categories", url: "/categories" },
      { icon: IoMdCart, title: "Users", url: "/users" },
      { icon: IoMdCart, title: "Companies", url: "/companies" },
      { icon: IoMdCart, title: "Connections", url: "/connections" },
      { icon: CiLogin, title: "Login", url: "/login" },
    ]) ||
    (role === "business" && [
      {
        icon: FaUserCircle,
        title: "Product Management",
        links: [
          {
            icon: MdSpaceDashboard,
            title: "Add Product",
            url: "/add-product",
          },
          {
            icon: MdSpaceDashboard,
            title: "Product List",
            url: "/products",
          },
        ],
      },
      {
        icon: PiUsersThree,
        title: "Employee Management",
        links: [
          {
            icon: MdSpaceDashboard,
            title: "Add Employee",
            url: "/add-employee",
          },
          {
            icon: MdSpaceDashboard,
            title: "Employee List",
            url: "/employee-list",
          },
        ],
      },
      {
        icon: MdOutlineRequestPage,
        title: "Order Management",
        links: [
          {
            icon: MdOutlineRequestPage,
            title: "My Order Requests",
            url: "/my-order-requests",
          },
          {
            icon: MdOutlineRequestPage,
            title: "Order Requests",
            url: "/order-requests",
          },
        ],
      },
      { icon: IoBagAdd, title: "Marketplace", url: "/seller/shop" },
      { icon: IoMdCart, title: "Cart", url: "/cart" },
    ]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <ul
      className={`hidden md:flex menu h-[88vh] self-start bg-base-200 sticky top-[12vh] z-50 shadow-xl`}
    >
      {sidebarItems.map((item, i) => {
        if (item.title === "Login" && auth) return;
        return (
          <SidebarItem
            key={i}
            dataObj={item}
            sidebarExpanded={sidebarExpanded}
          />
        );
      })}
      <button
        className="secondary-btn w-full self-end mt-auto"
        onClick={() => {
          dispatch(logout());
          navigate("/login");
        }}
      >
        <FiLogOut /> {sidebarExpanded && "Logout"}
      </button>
    </ul>
  );
};

const SidebarItem = ({ dataObj, sidebarExpanded }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  return (
    <li>
      {sidebarExpanded ? (
        dataObj?.links?.length ? (
          <details
            open={
              dataObj?.links?.findIndex((link) => {
                return location.pathname == link.url;
              }) !== -1
            }
            className="transition-all duration-300"
          >
            <summary>
              <dataObj.icon size={20} />
              {dataObj.title}
            </summary>
            <ul>
              {dataObj.links.map((obj, i) => (
                <SidebarItem
                  key={i}
                  dataObj={obj}
                  sidebarExpanded={sidebarExpanded}
                />
              ))}
            </ul>
          </details>
        ) : (
          <Link
            to={dataObj.url}
            className={` ${location.pathname == dataObj.url && "active"}`}
            onClick={() => {
              if (location.pathname === dataObj.url) dispatch(toggleSidebar());
            }}
          >
            <dataObj.icon size={20} />
            {dataObj?.title}
          </Link>
        )
      ) : (
        <Link
          className={`tooltip tooltip-right ${
            location.pathname == dataObj.url && "active"
          }`}
          to={dataObj?.url}
          onClick={() => {
            if (location.pathname === dataObj.url) dispatch(toggleSidebar());
            else dataObj.links?.length && dispatch(toggleSidebar());
          }}
          data-tip={dataObj.title}
        >
          <dataObj.icon size={20} />
        </Link>
      )}
    </li>
  );
};
export default Sidebar;
