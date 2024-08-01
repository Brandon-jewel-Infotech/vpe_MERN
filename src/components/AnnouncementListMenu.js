import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../redux/slice";
import { BsThreeDots } from "react-icons/bs";

const AnnouncementListMenu = ({
  announcementId,
  announcements,
  setAnnouncements,
  setSelectedAnnouncement,
}) => {
  const { tok } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleDelete = async () => {
    try {
      const res = await toast.promise(
        axios.delete(
          `${process.env.REACT_APP_BACKEND_URL}/seller/announcements/${announcementId}`,
          {
            headers: {
              Authorization: tok,
            },
          }
        ),
        {
          pending: "Deleting Announcement...",
          success: "Announcement deleted Successfully!",
          error: {
            render({ data }) {
              if (data?.response?.status === 401) {
                dispatch(logout());
                return "Session Expired";
              } else {
                return (
                  data?.response?.data?.error ||
                  "Failed to delete Announcement."
                );
              }
            },
          },
        }
      );
      if (res?.status === 200) {
        setAnnouncements((currAnnouncements) => {
          return currAnnouncements.filter(
            (announcement) => announcement.id !== announcementId
          );
        });
      }
    } catch (e) {}
  };

  return (
    <div className="dropdown dropdown-left">
      <div
        tabIndex={0}
        role="button"
        onClick={() => {
          setShow((prev) => !prev);
        }}
        className="menu-button btn btn-sm"
      >
        <BsThreeDots size={20} />
      </div>
      <ul
        tabIndex={0}
        className={`menu-list dropdown-content z-[1] menu p-2 shadow bg-neutral rounded-box w-52 text-white ${
          !show ? "hidden" : ""
        }`}
      >
        <li
          onClick={() => {
            setSelectedAnnouncement(
              announcements.find(
                (announcement) => announcement.id === announcementId
              )
            );
            document.getElementById("update_announcement").showModal();
          }}
        >
          <button>Edit</button>
        </li>
        <li onClick={handleDelete}>
          <button>Delete</button>
        </li>
      </ul>
    </div>
  );
};

export default AnnouncementListMenu;
