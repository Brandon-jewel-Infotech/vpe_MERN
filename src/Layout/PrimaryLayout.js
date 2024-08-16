import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import BottomNav from "../components/BottomNav";
import { useSelector } from "react-redux";
import { TiDocumentText } from "react-icons/ti";
import { IoBagHandleOutline, IoCartOutline } from "react-icons/io5";
import { RiMedalLine } from "react-icons/ri";
import { CiBullhorn } from "react-icons/ci";
import { Link } from "react-router-dom";

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
          className={`flex-1 text-center flex flex-col bg-white overflow-x-auto `}
        >
          <div className="p-5 sm:px-14 sm:py-6">
            {children}
            <footer className="footer footer-center p-4 md:hidden mt-5 mb-20">
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
