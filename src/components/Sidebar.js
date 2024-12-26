import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { logout, toggleSidebar } from "../redux/slice";

const Sidebar = ({ sidebarItems }) => {
  const { auth, id, sidebarExpanded } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <ul
      className={`hidden md:flex menu h-[88vh] self-start bg-base-200 sticky top-[12vh] z-50 shadow-xl`}
    >
      {sidebarItems?.map((item, i) => {
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
              <dataObj.Icon size={20} />
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
            <dataObj.Icon size={20} />
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
          <dataObj.Icon size={20} />
        </Link>
      )}
    </li>
  );
};
export default Sidebar;
