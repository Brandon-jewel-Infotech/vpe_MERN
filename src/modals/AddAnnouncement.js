import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../redux/slice";
import FormField from "../components/FormField";

export const AddAnnouncementModal = ({ fetchAnnouncements }) => {
  const dispatch = useDispatch();
  const { tok } = useSelector((state) => state.user);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const addAnnouncement = async () => {
    try {
      const { status } = await toast.promise(
        axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/seller/announcements`,
          { title, content },
          {
            headers: {
              Authorization: tok,
            },
          }
        ),
        {
          pending: "Creating Announcement...",
          success: "Announcement created Successfully!",
          error: {
            render({ data }) {
              if (data?.response?.status === 401) {
                dispatch(logout());
                return "Session Expired";
              } else {
                return (
                  data?.response?.data?.error ||
                  "Failed to create Announcement."
                );
              }
            },
          },
        }
      );

      if (status === 201) {
        fetchAnnouncements();
        document.getElementById("add_announcement_modal").close();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <dialog id="add_announcement_modal" className="modal">
      <div className="modal-box">
        <h2 className="font-semibold text-xl my-2">Add Announcement</h2>
        <FormField
          name={"title"}
          placeholder={"Title"}
          title={"Title"}
          value={title}
          inputHandler={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label className="form-control">
          <div className="label">
            <span className="label-text font-semibold">Content</span>
          </div>
          <textarea
            className="textarea textarea-bordered h-18 bg-white"
            value={content}
            placeholder={"Content"}
            name="content"
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <div className="label"></div>
        </label>

        <div className="flex w-full justify-between gap-4">
          <form method="dialog">
            <button className=" btn secondary-btn">Cancel</button>
          </form>
          <button className=" btn primary-btn" onClick={addAnnouncement}>
            Create
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default AddAnnouncementModal;
