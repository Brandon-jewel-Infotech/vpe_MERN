import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import BottomNav from "../components/BottomNav";
import { useSelector } from "react-redux";
import { TiDocumentText } from "react-icons/ti";
import { IoBagHandleOutline, IoCartOutline } from "react-icons/io5";
import { RiMedalLine } from "react-icons/ri";
import { CiBullhorn } from "react-icons/ci";

const PrimaryLayout = ({ children }) => {
  const { role } = useSelector((state) => state.user);

  const navItems =
    (role === "moderator" && [
      { Icon: TiDocumentText, title: "Requests", url: "/" },
    ]) ||
    (role === "employee" && [
      { Icon: IoBagHandleOutline, title: "Marketplace", url: "/" },
      { Icon: TiDocumentText, title: "My Order", url: "/my-order-requests" },
      { Icon: IoCartOutline, title: "Cart", url: "/cart" },
      { Icon: CiBullhorn, title: "Announcements", url: "/announcements" },
    ]);

  return (
    <div className="relative">
      <Navbar />
      <div className="flex justify-between">
        <Sidebar sidebarItems={navItems} />
        <div
          className={`flex-1 text-center flex flex-col p-5 sm:px-14 sm:py-6 bg-white overflow-x-auto `}
        >
          {children}
        </div>
      </div>
      <BottomNav navItems={navItems} />
    </div>
  );
};

export default PrimaryLayout;
