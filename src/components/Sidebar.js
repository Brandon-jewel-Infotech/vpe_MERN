import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slice";
import { IoMdCart } from "react-icons/io";
import { IoBagCheckOutline } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import { RxDashboard } from "react-icons/rx";
import { PiUsersThree } from "react-icons/pi";
import { GrUserNew } from "react-icons/gr";
import { MdOutlineRequestPage } from "react-icons/md";
import { LiaProductHunt } from "react-icons/lia";
import { IoBagAdd } from "react-icons/io5";

const Sidebar = ({ expanded, setExpanded }) => {
  const { auth, id } = useSelector((state) => state.user);

  const sidebarItems = [
    { icon: RxDashboard, title: "Dashboard", url: "/" },
    {
      icon: FaUserCircle,
      title: "Product Management",
      links: [
        { icon: MdSpaceDashboard, title: "Add Product", url: "/add-product" },
        { icon: MdSpaceDashboard, title: "Product List", url: "/product-list" },
      ],
    },
    {
      icon: PiUsersThree,
      title: "Employee Management",
      links: [
        {
          icon: MdSpaceDashboard,
          title: "Employee List",
          url: "/employee-list",
        },
      ],
    },
    {
      icon: MdOutlineRequestPage,
      title: "Order Requests",
      url: "/order-requests",
    },
    { icon: IoMdCart, title: "Cart", url: "/cart" },
    { icon: IoBagCheckOutline, title: "Checkout", url: "/checkout" },
    { icon: IoBagAdd, title: "Marketplace", url: "/seller/shop" },
    {
      icon: LiaProductHunt,
      title: "Product Details",
      url: "/seller/products/33",
    },
    {
      icon: MdOutlineRequestPage,
      title: "My Order Requests",
      url: "/my-order-requests",
    },
    {
      icon: MdOutlineRequestPage,
      title: "My Orders",
      url: "/my-orders",
    },
    { icon: CiLogin, title: "Login", url: "/login" },
    { icon: GrUserNew, title: "Register", url: "/register" },
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <ul
      className={`hidden md:block menu min-h-[91.4vh] self-start bg-base-200 sticky top-[4.9rem] z-50 shadow-xl `}
    >
      {sidebarItems.map((item) => {
        if (item.title === "Login" && auth) return;
        return (
          <SidebarItem
            dataObj={item}
            sidebarExpanded={expanded}
            setExpanded={setExpanded}
          />
        );
      })}
      <button
        className="secondary-btn mt-2 w-full"
        onClick={() => {
          dispatch(logout());
          navigate("/login");
        }}
      >
        <FiLogOut /> {expanded && "Logout"}
      </button>
    </ul>
  );
};

const SidebarItem = ({ dataObj, sidebarExpanded, setExpanded }) => {
  const location = useLocation();
  return (
    <li>
      {sidebarExpanded ? (
        dataObj?.links?.length ? (
          <details>
            <summary>
              <dataObj.icon size={20} />
              {dataObj.title}
            </summary>
            <ul>
              {dataObj.links.map((obj) => (
                <SidebarItem dataObj={obj} sidebarExpanded={sidebarExpanded} />
              ))}
            </ul>
          </details>
        ) : (
          <Link
            to={dataObj.url}
            className={` ${location.pathname == dataObj.url && "active"}`}
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
            dataObj.links?.length && setExpanded(true);
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
