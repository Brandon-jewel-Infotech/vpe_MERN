import React, { useCallback, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import BottomNav from "../components/BottomNav";

const PrimaryLayout = ({ children }) => {
  return (
    <div className="relative">
      <Navbar />
      <div className="flex justify-between">
        <Sidebar />
        <div
          className={`flex-1 text-center flex flex-col p-5 sm:px-14 sm:py-6 bg-white overflow-x-auto `}
        >
          {children}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default PrimaryLayout;
