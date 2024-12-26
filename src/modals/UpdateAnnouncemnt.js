import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../redux/slice";
import FormField from "../components/FormField";

const UpdateAnnouncementModal = ({ announcement, setAnnouncements }) => {
  const dispatch = useDispatch();
  const { tok } = useSelector((state) => state.user);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    setTitle(announcement.title);
    setContent(announcement.content);
  }, [announcement]);

  const updateAnnouncementHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await toast.promise(
        axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/seller/announcements/${announcement.id}`,
          { title, content },
          { headers: { Authorization: tok } }
        ),
        {
          pending: "Updating Announcement...",
          success: "Announcement updated Successfully!",
          error: {
            render({ data }) {
              if (data?.response?.status === 401) {
                dispatch(logout());
                return "Session Expired";
              } else {
                return (
                  data?.response?.data?.error ||
                  "Failed to update Announcement."
                );
              }
            },
          },
        }
      );
      if (res?.status === 200) {
        document.getElementById("update_announcement").close();
        setAnnouncements((currAnnouncements) => {
          return currAnnouncements.map((comp) => {
            if (comp.id === announcement.id)
              return { ...comp, title, content, updatedAt: new Date() };
            return comp;
          });
        });
        setTitle("");
        setContent("");
      }
    } catch (e) {}
  };

  return (
    <dialog
      id="update_announcement"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <h2 className="font-semibold text-xl my-2">Update Announcement</h2>
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
          <button
            className=" btn primary-btn"
            onClick={updateAnnouncementHandler}
          >
            Update
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default UpdateAnnouncementModal;
