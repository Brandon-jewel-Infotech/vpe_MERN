import React, { useEffect, useState } from "react";
import PrimaryLayout from "../../Layout/PrimaryLayout";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slice";
import { toast } from "react-toastify";
import FallbackText from "../../components/FallbackText";
import Loading from "../../components/Loading";
import { TiDocumentText } from "react-icons/ti";
import formatDate from "../../utils/FormatDate";

const Requests = () => {
  const dispatch = useDispatch();
  const { tok } = useSelector((state) => state.user);

  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState({});
  const [loadingData, setLoadingData] = useState(false);

  const getRequests = async () => {
    setLoadingData(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/employee/requests`,
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
    <>
      <UpdateRequest request={selectedRequest} setRequests={setRequests} />
      <PrimaryLayout>
        <div className="card bg-white max-w-full">
          <div className="card-body p-0 2xl:mx-auto">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-start">Request List</h2>
                <p className="text-sm">Requests {">"} Request List</p>
              </div>
            </div>
            {loadingData && (
              <div className="w-40 h-40 m-auto">
                <Loading />
              </div>
            )}
            {!loadingData &&
              (requests?.length ? (
                <div className="mt-3 overflow-x-auto max-md:pb-20">
                  <table className="table table-zebra table-auto w-full">
                    <thead className="bg-neutral text-center text-white">
                      <tr>
                        <th>User Name</th>
                        <th>Description</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Response</th>
                        <th>Created At</th>
                        <th>Last Updated</th>
                        <th>Actions</th>
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
                          <td>{request?.response}</td>
                          <td>{formatDate(request?.createdAt)}</td>
                          <td>{formatDate(request?.updatedAt)}</td>
                          <td>
                            <Link
                              className="primary-btn"
                              onClick={() => {
                                setSelectedRequest(request);
                                document
                                  .getElementById("update_request")
                                  .showModal();
                              }}
                            >
                              Update
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <FallbackText
                  IconRef={TiDocumentText}
                  message={"No Requests found"}
                />
              ))}
          </div>
        </div>
      </PrimaryLayout>
    </>
  );
};

export default Requests;

// const AddRequest = ({ getRequests }) => {
//   const dispatch = useDispatch();
//   const { tok } = useSelector((state) => state.user);
//   const [requestDetails, setRequestDetails] = useState({
//     name: "",
//     contact: "",
//     whatsapp: "",
//     email: "",
//   });

//   const inputHandler = (e) => {
//     setRequestDetails((currDetails) => {
//       return { ...currDetails, [e.target.name]: e.target.value };
//     });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       if (!requestDetails?.name?.length) {
//         return toast.error("Please enter a Request Name");
//       } else if (requestDetails?.contact?.length !== 10) {
//         return toast.error("Please enter a valid Contact Number");
//       } else if (requestDetails?.whatsapp?.length !== 10) {
//         return toast.error("Please enter a valid WhatsApp Number");
//       } else if (!validateEmail(requestDetails?.email)) {
//         return toast.error("Please enter a valid Email Address");
//       }

//       const res = await toast.promise(
//         axios.post(
//           `${process.env.REACT_APP_BACKEND_URL}/requests/create`,
//           requestDetails,
//           { headers: { Authorization: tok } }
//         ),
//         {
//           pending: "Adding Request...",
//           success: "Request added Successfully!",
//           error: {
//             render({ data }) {
//               if (data?.response?.status === 401) {
//                 dispatch(logout());
//                 return "Session Expired";
//               } else {
//                 return data?.response?.data?.error || "Failed to add Request.";
//               }
//             },
//           },
//         }
//       );
//       if (res?.status === 201) {
//         document.getElementById("add_request").close();
//         setRequestDetails({
//           name: "",
//           contact: "",
//           whatsapp: "",
//           email: "",
//         });
//         getRequests();
//       }
//     } catch (e) {}
//   };

//   return (
//     <dialog id="add_request" className="modal modal-bottom sm:modal-middle">
//       <div className="modal-box">
//         <h3 className="font-bold text-lg">Add Request</h3>
//         <div className="flex flex-col flex-wrap py-2">
//           <div className="flex justify-between items-center gap-3 max-sm:flex-wrap">
//             <FormField
//               title={"Request Name"}
//               name={"name"}
//               inputHandler={inputHandler}
//               value={requestDetails?.name}
//             />
//             <FormField
//               title={"Email"}
//               name={"email"}
//               inputHandler={inputHandler}
//               value={requestDetails?.email}
//             />
//           </div>
//           <div className="flex justify-between items-center gap-3 max-sm:flex-wrap">
//             <FormField
//               title={"Contact"}
//               name={"contact"}
//               inputHandler={inputHandler}
//               value={requestDetails?.contact}
//               type={"number"}
//             />
//             <FormField
//               title={"WhatsApp"}
//               name={"whatsapp"}
//               inputHandler={inputHandler}
//               value={requestDetails?.whatsapp}
//               type={"number"}
//             />
//           </div>
//           <div className="flex justify-between items-center">
//             <div className="modal-action my-0">
//               <form method="dialog">
//                 <button className="btn">Close</button>
//               </form>
//             </div>
//             <button className="primary-btn" onClick={submitHandler}>
//               Add
//             </button>
//           </div>
//         </div>
//       </div>
//     </dialog>
//   );
// };

const UpdateRequest = ({ request, setRequests }) => {
  const dispatch = useDispatch();
  const { tok } = useSelector((state) => state.user);
  const [updatedRequest, setUpdatedRequest] = useState({
    response: "",
    status: "",
  });

  useEffect(() => {
    setUpdatedRequest({
      response: request?.response || "",
      status: request?.status || "",
    });
  }, [request]);

  const inputHandler = (e) => {
    setUpdatedRequest((currDetails) => {
      return { ...currDetails, [e.target.name]: e.target.value };
    });
  };

  const updateRequestHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await toast.promise(
        axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/employee/requests/update/${request.id}`,
          { ...updatedRequest, user_id: request?.createdBy },
          { headers: { Authorization: tok } }
        ),
        {
          pending: "Updating Request...",
          success: "Request updated Successfully!",
          error: {
            render({ data }) {
              if (data?.response?.status === 401) {
                dispatch(logout());
                return "Session Expired";
              } else {
                return (
                  data?.response?.data?.error || "Failed to update Request."
                );
              }
            },
          },
        }
      );
      if (res?.status === 200) {
        document.getElementById("update_request").close();
        setRequests((currRequests) => {
          return currRequests.map((comp) => {
            if (comp.id === request.id)
              return { ...comp, ...updatedRequest, updatedAt: new Date() };
            return comp;
          });
        });
        setUpdatedRequest({
          response: "",
          status: "",
        });
      }
    } catch (e) {}
  };

  return (
    <dialog id="update_request" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg capitalize">
          Update{" "}
          {request?.role === 0
            ? "account creation"
            : request?.role === 1
            ? "connection request"
            : "query"}{" "}
          Request from {request?.user?.name}
        </h3>
        <div className="flex flex-col flex-wrap py-2">
          {/* <div className="flex justify-between items-center gap-3 max-sm:flex-wrap"> */}
          <label className="form-control">
            <div className="label">
              <span className="label-text font-semibold">Response</span>
            </div>
            <textarea
              className="textarea textarea-bordered h-18 bg-white"
              value={updatedRequest?.response}
              name="response"
              onChange={inputHandler}
            ></textarea>
            <div className="label"></div>
          </label>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text font-semibold">Status</span>
            </div>
            <select
              className="select select-bordered bg-white"
              onChange={inputHandler}
              name="status"
            >
              <option value={1} selected={updatedRequest?.status == 1}>
                Open
              </option>
              <option value={2} selected={updatedRequest?.status == 2}>
                Declined
              </option>
              <option value={3} selected={updatedRequest?.status == 3}>
                Approved
              </option>
              <option value={4} selected={updatedRequest?.status == 4}>
                Closed
              </option>
            </select>
            <div className="label"></div>
          </label>
          {/* </div> */}

          <div className="flex justify-between items-center">
            <div className="modal-action my-0">
              <form method="dialog">
                <button className="secondary-btn">Close</button>
              </form>
            </div>
            <button className="primary-btn" onClick={updateRequestHandler}>
              Update
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};
