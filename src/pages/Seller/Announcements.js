import React, { useEffect, useState } from "react";
import PrimaryLayout from "../../Layout/PrimaryLayout";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slice";
import { toast } from "react-toastify";
import FallbackText from "../../components/FallbackText";
import Loading from "../../components/Loading";
import formatDate from "../../utils/FormatDate";
import { GoPlus } from "react-icons/go";
import AddAnnouncementModal from "../../modals/AddAnnouncement";
import AnnouncementListMenu from "../../components/AnnouncementListMenu";
import UpdateAnnouncementModal from "../../modals/UpdateAnnouncemnt";
import { CiBullhorn } from "react-icons/ci";

const Announcements = () => {
  const dispatch = useDispatch();
  const { tok } = useSelector((state) => state.user);

  const [announcements, setAnnouncements] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState({});

  const getAnnouncements = async () => {
    setLoadingData(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/seller/announcements`,

        {
          headers: {
            Authorization: tok,
          },
        }
      );

      setAnnouncements(data);
    } catch (error) {
      if (error?.response?.status === 401) {
        toast.dismiss();
        toast.error("Session Expired");
        dispatch(logout());
      }
    }
    setLoadingData(false);
  };

  useEffect(() => {
    getAnnouncements();
  }, []);

  return (
    <>
      <AddAnnouncementModal fetchAnnouncements={getAnnouncements} />
      <UpdateAnnouncementModal
        announcement={selectedAnnouncement}
        setAnnouncements={setAnnouncements}
      />
      <PrimaryLayout>
        <div className="card bg-white max-w-full">
          <div className="card-body p-0 2xl:mx-auto">
            <div className="flex max-sm:flex-col justify-between items-center max-sm:items-start gap-3">
              <div>
                <h2 className="text-xl font-bold text-start">Announcements</h2>
              </div>
              <button
                className="primary-btn font-semibold"
                onClick={() =>
                  document.getElementById("add_announcement_modal").showModal()
                }
              >
                <GoPlus size={20} /> Add New
              </button>
            </div>
            {loadingData && (
              <div className="w-40 h-40 m-auto">
                <Loading />
              </div>
            )}
            {!loadingData &&
              (announcements?.length ? (
                <div className="mt-3 overflow-x-auto min-h-96 flex flex-col gap-5">
                  {announcements?.map((announcement) => (
                    <div className="card bg-base-200 text-primary-content shadow-md rounded-tl-none">
                      <div className="card-body">
                        <div className="flex max-sm:flex-col justify-between items-center w-full">
                          <h2 className="card-title capitalize ">
                            {announcement?.title}
                          </h2>
                          <span>{formatDate(announcement?.updatedAt)}</span>
                        </div>
                        <pre
                          className="text-start overflow-auto"
                          style={{
                            fontFamily:
                              '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
                          }}
                        >
                          {announcement?.content}
                        </pre>
                        <div className="card-actions justify-end">
                          <AnnouncementListMenu
                            announcementId={announcement?.id}
                            announcements={announcements}
                            setAnnouncements={setAnnouncements}
                            setSelectedAnnouncement={setSelectedAnnouncement}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <FallbackText
                  IconRef={CiBullhorn}
                  message={"No Announcements found"}
                />
              ))}
          </div>
        </div>
      </PrimaryLayout>
    </>
  );
};

export default Announcements;
