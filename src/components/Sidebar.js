import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { logout, toggleSidebar } from "../redux/slice";
import { CiLogin } from "react-icons/ci";
import { RxDashboard } from "react-icons/rx";
import { PiPlugsConnected, PiUsersThree } from "react-icons/pi";
import { IoBagHandleOutline, IoCartOutline } from "react-icons/io5";
import { TiDocumentText } from "react-icons/ti";
import { BiCategoryAlt } from "react-icons/bi";
import { LuUsers } from "react-icons/lu";
import { FaPeopleRoof } from "react-icons/fa6";
import { GiCardboardBox } from "react-icons/gi";
import { AiOutlineUserAdd } from "react-icons/ai";
import { RiMedalLine } from "react-icons/ri";

const Sidebar = () => {
  const { auth, role, id, sidebarExpanded } = useSelector(
    (state) => state.user
  );

  const sidebarItems =
    (role === "admin" && [
      { icon: RxDashboard, title: "Dashboard", url: "/" },
      { icon: TiDocumentText, title: "Requests", url: "/requests" },
      { icon: BiCategoryAlt, title: "Categories", url: "/categories" },
      { icon: LuUsers, title: "Users", url: "/users" },
      { icon: FaPeopleRoof, title: "Companies", url: "/companies" },
      { icon: PiPlugsConnected, title: "Connections", url: "/connections" },
      { icon: CiLogin, title: "Login", url: "/login" },
    ]) ||
    (role === "business" && [
      { icon: RxDashboard, title: "Dashboard", url: "/" },
      {
        icon: GiCardboardBox,
        title: "Products",
        links: [
          {
            icon: GiCardboardBox,
            title: "Add Product",
            url: "/add-product",
          },
          {
            icon: GiCardboardBox,
            title: "Product List",
            url: "/products",
          },
        ],
      },
      {
        icon: PiUsersThree,
        title: "Employees",
        links: [
          {
            icon: AiOutlineUserAdd,
            title: "Add Employee",
            url: "/add-employee",
          },
          {
            icon: PiUsersThree,
            title: "Employee List",
            url: "/employee-list",
          },
        ],
      },
      {
        icon: TiDocumentText,
        title: "Requests",
        links: [
          {
            icon: TiDocumentText,
            title: "Admin",
            url: "/admin-requests",
          },
          {
            icon: TiDocumentText,
            title: "Order",
            url: "/order-requests",
          },
          {
            icon: TiDocumentText,
            title: "My Order",
            url: "/my-order-requests",
          },
        ],
      },
      {
        icon: RiMedalLine,
        title: "Rewards Scheme",
        url: "/reward-list",
      },
      { icon: IoBagHandleOutline, title: "Marketplace", url: "/seller/shop" },
      { icon: IoCartOutline, title: "Cart", url: "/cart" },
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
