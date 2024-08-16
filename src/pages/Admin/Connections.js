import React, { useEffect, useState } from "react";
import PrimaryLayout from "../../Layout/PrimaryLayout";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slice";
import FormField from "../../components/FormField";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import FallbackText from "../../components/FallbackText";
import { PiPlugsConnected } from "react-icons/pi";
import Loading from "../../components/Loading";

const Connections = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tok, code } = useSelector((state) => state.user);
  const [searchParams, setSearchParams] = useSearchParams();
  const [connections, setConnections] = useState([]);
  const [selectedConnection, setSelectedConnection] = useState({});
  const [searchCode, setSearchCode] = useState(
    searchParams.get("code") || code
  );
  const [loadingData, setLoadingData] = useState(false);

  const getConnections = async (sCode) => {
    setLoadingData(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/connections`,
        { code: sCode || searchCode || code },
        {
          headers: {
            Authorization: tok,
          },
        }
      );

      setConnections(data);
    } catch (error) {
      if (error?.response?.status === 401) {
        toast.dismiss();
        toast.error("Session Expired");
        dispatch(logout());
      }
      // console.log(error);
      // navigate("/logout");
    }
    setLoadingData(false);
  };

  const search = (sCode) => {
    navigate(`/connections?code=${encodeURIComponent(sCode)}`);
    getConnections(sCode);
  };

  useEffect(() => {
    search(searchCode);
  }, [searchCode]);

  useEffect(() => {
    let paramCode = searchParams.get("code") || code;
    if (searchCode != paramCode) setSearchCode(paramCode);
  }, [searchParams.get("code")]);

  return (
    <>
      <AddConnection getConnections={getConnections} />
      <AddSubConnection
        connection={selectedConnection}
        getConnections={getConnections}
      />
      <PrimaryLayout>
        <div className="card bg-white max-w-full">
          <div className="card-body p-0 2xl:mx-auto">
            <div className="flex justify-between items-center max-sm:flex-col text-start max-sm:text-center">
              <div className=" ">
                <h2 className="text-lg font-bold ">
                  Connection List{" "}
                  <span className="uppercase">
                    {" "}
                    {(searchCode || code) &&
                      `(${
                        searchCode === code
                          ? code + " - Your Connections"
                          : searchCode ||
                            (code.length > 0
                              ? code + " - Your Connections"
                              : code)
                      })`}
                  </span>
                </h2>
                {/* <p className="text-sm">Connections {">"} Connection List</p> */}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  search();
                }}
                className="relative"
              >
                <FormField
                  placeholder="Enter Search Code…"
                  value={searchCode}
                  inputHandler={(e) => setSearchCode(e.target.value)}
                  className={"pr-10"}
                />
                <button
                  type="submit"
                  value="Search"
                  className="absolute right-4 top-8"
                >
                  <FaSearch />
                </button>
              </form>
            </div>
            <div className="flex gap-10 max-lg:flex-col">
              <div
                className={`bg-base-100 card w-[98%] rounded-md shadow-xl ${
                  connections?.customers?.length > 0 ? "lg:w-[50%]" : ""
                }`}
              >
                <div className="card-body">
                  <h3 className="text-xl text-start max-sm:text-center font-semibold">
                    Suppliers
                  </h3>
                  {loadingData && (
                    <div className="w-40 h-40 mx-auto">
                      <Loading />
                    </div>
                  )}
                  {!loadingData &&
                    (connections?.suppliers?.length ? (
                      <div className="mt-3 overflow-x-auto">
                        <table className="table table-zebra table-auto w-full">
                          <thead className="bg-neutral text-center text-white">
                            <tr>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {connections?.suppliers?.map((connection) => (
                              <tr key={connection?.id}>
                                <td>{connection?.name}</td>
                                <td>{connection?.email}</td>
                                <td>
                                  <div className=" flex items-center justify-around gap-5">
                                    <button
                                      className="btn btn-success text-white"
                                      onClick={() => {
                                        setSearchCode(connection.code);
                                        search(connection.code);
                                      }}
                                    >
                                      Connections
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <FallbackText
                        IconRef={PiPlugsConnected}
                        message={"No Connection with Suppliers"}
                      />
                    ))}
                </div>
              </div>

              <div
                className={`bg-base-100 card w-[98%] rounded-md shadow-xl ${
                  connections?.suppliers?.length > 0 ? "lg:w-[50%]" : ""
                }`}
              >
                <div className="card-body">
                  <h3 className="text-xl text-start max-sm:text-center font-semibold">
                    Customers
                  </h3>
                  {loadingData && (
                    <div className="w-40 h-40 mx-auto">
                      <Loading />
                    </div>
                  )}
                  {!loadingData &&
                    (connections?.customers?.length ? (
                      <div className="mt-3 overflow-x-auto">
                        <table className="table table-zebra table-auto w-full">
                          <thead className="bg-neutral text-center text-white ">
                            <tr>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {connections?.customers?.map((connection) => (
                              <tr key={connection?.id}>
                                <td>{connection?.name}</td>
                                <td>{connection?.email}</td>
                                <td>
                                  <div className=" flex items-center justify-around gap-5">
                                    <button
                                      className="btn btn-success text-white"
                                      onClick={() => {
                                        setSearchCode(connection.code);
                                        search(connection.code);
                                      }}
                                    >
                                      Connections
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <FallbackText
                        IconRef={PiPlugsConnected}
                        message={"No Connection with Customers"}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </PrimaryLayout>
    </>
  );
};

export default Connections;

const AddConnection = ({ getConnections }) => {
  const dispatch = useDispatch();
  const { tok } = useSelector((state) => state.user);
  const [connectionName, setConnectionName] = useState("");

  const submitHandler = async () => {
    try {
      const res = await toast.promise(
        axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/connections/create`,
          { name: connectionName },
          { headers: { Authorization: tok } }
        ),
        {
          pending: "Adding Connection...",
          success: "Connection added Successfully!",
          error: {
            render({ data }) {
              if (data?.response?.status === 401) {
                dispatch(logout());
                return "Session Expired";
              } else {
                return (
                  data?.response?.data?.error || "Failed to add Connection."
                );
              }
            },
          },
        }
      );
      if (res?.status === 201) {
        setConnectionName("");
        getConnections();
        document.getElementById("add_connection").close();
      }
    } catch (e) {}
  };
  return (
    <dialog id="add_connection" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-2">Add Connection</h3>
        <FormField
          title={"Connection Name"}
          placeholder={"Enter Connection Name"}
          inputHandler={(e) => {
            setConnectionName(e.target.value);
          }}
          value={connectionName}
        />
        <div className="modal-action flex justify-between items-center">
          <form method="dialog">
            <button className="secondary-btn">Close</button>
          </form>
          <button className="primary-btn" onClick={submitHandler}>
            Add
          </button>
        </div>
      </div>
    </dialog>
  );
};

const AddSubConnection = ({ connection, getConnections }) => {
  const dispatch = useDispatch();
  const { tok } = useSelector((state) => state.user);
  const [subConnectionName, setSubConnectionName] = useState("");

  const submitHandler = async () => {
    try {
      const res = await toast.promise(
        axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/subconnections/create`,
          { name: subConnectionName, cat_id: connection.id },
          { headers: { Authorization: tok } }
        ),
        {
          pending: "Adding Sub Connection...",
          success: "Sub Connection added Successfully!",
          error: {
            render({ data }) {
              if (data?.response?.status === 401) {
                dispatch(logout());
                return "Session Expired";
              } else {
                return (
                  data?.response?.data?.error || "Failed to add Sub Connection."
                );
              }
            },
          },
        }
      );
      if (res?.status === 201) {
        setSubConnectionName("");
        getConnections();
        document.getElementById("add_sub_connection").close();
      }
    } catch (e) {}
  };

  return (
    <dialog
      id="add_sub_connection"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-2">
          Add Sub Connection in {connection.name}
        </h3>
        <FormField
          title={"Sub Connection Name"}
          placeholder={"Enter Sub Connection Name"}
          value={subConnectionName}
          inputHandler={(e) => {
            setSubConnectionName(e.target.value);
          }}
        />
        <div className="modal-action flex justify-between items-center">
          <form method="dialog">
            <button className="secondary-btn ">Close</button>
          </form>
          <button className="primary-btn" onClick={submitHandler}>
            Add
          </button>
        </div>
      </div>
    </dialog>
  );
};
