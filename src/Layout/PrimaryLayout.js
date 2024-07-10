import React, { useCallback, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import BottomNav from "../components/BottomNav";
import { useSelector } from "react-redux";

const PrimaryLayout = ({ children }) => {
  const { pathname } = window.location;

  return (
    <div className="relative">
      <Navbar />
      <div className="flex justify-between">
        <Sidebar />
        <div
          className={`flex-1 text-center flex flex-col p-5 sm:px-14 sm:py-6 bg-white overflow-x-auto ${
            pathname === "/checkout" ? "bg-[#8ad3c84d]" : ""
          }`}
        >
          {children}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default PrimaryLayout;
