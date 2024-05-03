import React, { useCallback, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import BottomNav from "../components/BottomNav";

const PrimaryLayout = ({ children }) => {
  const { pathname } = window.location;

  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = useCallback(() => {
    setExpanded((expanded) => !expanded);
  }, []);

  return (
    <div className="relative">
      <Navbar toggleExpanded={toggleExpanded} />
      <div className="flex justify-between">
        <Sidebar expanded={expanded} setExpanded={setExpanded} />
        <div
          className={`flex-1 text-center flex flex-col p-5 sm:px-14 sm:py-10 bg-white overflow-x-auto ${
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
