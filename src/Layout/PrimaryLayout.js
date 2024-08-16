import React, { useCallback, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import BottomNav from "../components/BottomNav";
import { CiBullhorn, CiLogin } from "react-icons/ci";
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
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PrimaryLayout = ({ children }) => {
  const { role } = useSelector((state) => state.user);

  const navItems =
    (role === "admin" && [
      { Icon: RxDashboard, title: "Dashboard", url: "/" },
      { Icon: TiDocumentText, title: "Requests", url: "/requests" },
      { Icon: BiCategoryAlt, title: "Categories", url: "/categories" },
      { Icon: FaPeopleRoof, title: "Companies", url: "/companies" },
      { Icon: PiPlugsConnected, title: "Connections", url: "/connections" },
      {
        Icon: LuUsers,
        title: "Users",
        links: [
          {
            Icon: AiOutlineUserAdd,
            title: "Add Moderator",
            url: "/add-moderator",
          },
          {
            Icon: LuUsers,
            title: "Users List",
            url: "/users",
          },
        ],
      },
    ]) ||
    (role === "business" && [
      { Icon: RxDashboard, title: "Dashboard", url: "/" },
      {
        Icon: GiCardboardBox,
        title: "Products",
        links: [
          {
            Icon: GiCardboardBox,
            title: "Add Product",
            url: "/add-product",
          },
          {
            Icon: GiCardboardBox,
            title: "Product List",
            url: "/products",
          },
        ],
      },
      {
        Icon: PiUsersThree,
        title: "Employees",
        links: [
          {
            Icon: AiOutlineUserAdd,
            title: "Add Employee",
            url: "/add-employee",
          },
          {
            Icon: PiUsersThree,
            title: "Employee List",
            url: "/employee-list",
          },
        ],
      },
      {
        Icon: TiDocumentText,
        title: "Requests",
        links: [
          {
            Icon: TiDocumentText,
            title: "Admin",
            url: "/admin-requests",
          },
          {
            Icon: TiDocumentText,
            title: "Order",
            url: "/order-requests",
          },
          {
            Icon: TiDocumentText,
            title: "My Order",
            url: "/my-order-requests",
          },
        ],
      },
      { Icon: IoCartOutline, title: "Cart", url: "/cart" },
      { Icon: IoBagHandleOutline, title: "Marketplace", url: "/marketplace" },
      {
        Icon: RiMedalLine,
        title: "Rewards Scheme",
        url: "/reward-list",
      },
      { Icon: CiBullhorn, title: "Announcements", url: "/announcements" },
    ]);

  return (
    <div className="relative">
      <Navbar />
      <div className="flex justify-between">
        <Sidebar sidebarItems={navItems} />
        <div
          className={`flex-1 text-center flex flex-col bg-white overflow-x-auto `}
        >
          <div className="p-5 sm:px-14 sm:py-6">
            {children}
            <footer className="footer footer-center p-4 md:hidden mt-5 mb-24">
              <aside>
                <p>
                  Made by{" "}
                  <Link
                    to={"https://brandon.co.in/"}
                    target="_blank"
                    className="underline"
                  >
                    {" "}
                    Brandon Infotech
                  </Link>{" "}
                  © 2018
                </p>
              </aside>
            </footer>
          </div>
          <footer className="footer footer-center bg-neutral text-white p-4 max-md:hidden">
            <aside>
              <p>
                Made by{" "}
                <Link
                  to={"https://brandon.co.in/"}
                  target="_blank"
                  className="underline"
                >
                  {" "}
                  Brandon Infotech
                </Link>{" "}
                © 2018
              </p>
            </aside>
          </footer>
        </div>
      </div>
      <BottomNav navItems={navItems} />
    </div>
  );
};

export default PrimaryLayout;
