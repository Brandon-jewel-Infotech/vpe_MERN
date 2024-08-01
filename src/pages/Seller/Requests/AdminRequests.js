import React, { useEffect, useState } from "react";
import PrimaryLayout from "../../../Layout/PrimaryLayout";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/slice";
import { toast } from "react-toastify";
import FallbackText from "../../../components/FallbackText";
import Loading from "../../../components/Loading";
import { TiDocumentText } from "react-icons/ti";
import formatDate from "../../../utils/FormatDate";

const AdminRequests = () => {
  const dispatch = useDispatch();
  const { tok } = useSelector((state) => state.user);

  const [requests, setRequests] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  const getRequests = async () => {
    setLoadingData(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/seller/requests`,
        {},
        {
          headers: {
            Authorization: tok,
          },
        }
      );

      setRequests(data);
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
    getRequests();
  }, []);

  return (
    <PrimaryLayout>
      <div className="text-start">
        <h2 className="text-lg font-bold ">Admin Requests</h2>
        <p className="text-sm">Requests {">"} Admin Requests</p>
      </div>
      <div className="card bg-white max-w-full">
        <div className="card-body p-0 2xl:mx-auto">
          {loadingData && (
            <div className="w-40 h-40 m-auto">
              <Loading />
            </div>
          )}
          {!loadingData &&
            (requests?.length ? (
              <div className="mt-3 overflow-x-auto max-md:pb-28">
                <table className="table table-zebra table-auto w-full">
                  <thead className="bg-neutral text-center text-white">
                    <tr>
                      <th>User Name</th>
                      <th>Description</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Created At</th>
                      <th>Last Updated At</th>
                      <th>Response</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests?.map((request) => (
                      <tr key={request?.id}>
                        <td>{request?.user?.name}</td>
                        <td>{request?.description}</td>
                        <td className="capitalize">
                          {request?.role === 0
                            ? "account creation"
                            : request?.role === 1
                            ? "connection request"
                            : "query"}
                        </td>
                        <td className="capitalize">
                          {request?.status == 1
                            ? "open"
                            : request?.status == 2
                            ? "declined"
                            : request?.status == 3
                            ? "approved"
                            : "closed"}
                        </td>
                        <td>{formatDate(request?.createdAt)}</td>
                        <td>{formatDate(request?.updatedAt)}</td>
                        <td>{request?.response}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <FallbackText
                IconRef={TiDocumentText}
                message={"No Admin Requests found"}
              />
            ))}
        </div>
      </div>
    </PrimaryLayout>
  );
};

export default AdminRequests;
