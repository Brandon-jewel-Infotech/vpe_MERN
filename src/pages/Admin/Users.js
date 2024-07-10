import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slice";
import PrimaryLayout from "../../Layout/PrimaryLayout";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Users = () => {
  const { tok } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState(2);
  const dispatch = useDispatch();

  //  Get all products from the database.
  const getData = async () => {
    try {
      // setloading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users/fetch`,
        { role: selectedRole },
        {
          headers: {
            Authorization: `${tok}`,
          },
        }
      );

      setUsers(data);
    } catch (error) {
      if (error?.response?.status === 401) {
        toast.dismiss();
        toast.error("Session Expired");
        dispatch(logout());
      }
    }
  };

  const suspendUserHandler = async (code, status) => {
    try {
      const res = await toast.promise(
        axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/users/`,
          { code, status },
          {
            headers: {
              Authorization: tok,
            },
          }
        ),
        {
          pending: "Updating User Status...",
          success: "User Status Updated Successfully!",
          error: {
            render({ data }) {
              if (data?.response?.status === 401) {
                dispatch(logout());
                return "Session Expired";
              } else {
                return (
                  data?.response?.data?.error || "Failed to Update User Status."
                );
              }
            },
          },
        }
      );
      if (res?.status === 200) {
        setUsers((currUsers) => {
          return currUsers.map((user) => {
            if (user.code === code) {
              user.status = status;
              return user;
            }
            return user;
          });
        });
      }
    } catch (e) {}
  };

  useEffect(() => {
    getData();
  }, [selectedRole]);

  return (
    <>
      {/* <AddUser />
      <AddSubUser user={selectedUser} /> */}
      <PrimaryLayout>
        <div className="card bg-white max-w-full">
          <div className="card-body p-0 2xl:mx-auto">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-start">User List</h2>
                <p className="text-sm">Users {">"} User List</p>
              </div>
              <div className="flex justify-between flex-wrap items-center">
                <div className=" flex items-center gap-4 flex-wrap justify-between max-sm:w-full ms-auto my-5">
                  <button
                    className={
                      "font-semibold border border-neutral hover:bg-neutral hover:text-white flex items-center py-1 px-4 rounded-md gap-2 " +
                      (selectedRole === 2 ? "bg-neutral text-white" : "")
                    }
                    onClick={() => setSelectedRole(2)}
                  >
                    {/* <MdOutlineUpcoming
                    className={
                      " text-warning " +
                      (selectedRole === "idle" ? "text-white" : "")
                    }
                  /> */}
                    <span className="max-sm:hidden">Business</span>
                  </button>
                  <button
                    className={
                      "font-semibold border border-neutral hover:bg-neutral hover:text-white flex items-center py-1 px-4 rounded-md gap-2 " +
                      (selectedRole === 3 ? "bg-neutral text-white" : "")
                    }
                    onClick={() => setSelectedRole(3)}
                  >
                    {/* <MdOutlineUpcoming
                    className={
                      " text-warning " +
                      (selectedRole === "upcoming" ? "text-white" : "")
                    }
                  /> */}
                    <span className="max-sm:hidden">Moderator</span>
                  </button>
                  <button
                    className={
                      "font-semibold border border-neutral hover:bg-neutral hover:text-white flex items-center py-1 px-4 rounded-md gap-2 " +
                      (selectedRole === 4 ? "bg-neutral text-white" : "")
                    }
                    onClick={() => setSelectedRole(4)}
                  >
                    {/* <GrCompliance
                    className={
                      " text-success " +
                      (selectedRole === "elapsed" ? "text-white" : "")
                    }
                  /> */}
                    <span className="max-sm:hidden">Employees</span>
                  </button>
                  <button
                    className={
                      "font-semibold border border-neutral hover:bg-neutral hover:text-white flex items-center py-1 px-4 rounded-md gap-2 " +
                      (selectedRole === 1 ? "bg-neutral text-white" : "")
                    }
                    onClick={() => setSelectedRole(1)}
                  >
                    {/* <GrCompliance
                    className={
                      " text-success " +
                      (selectedRole === "completed" ? "text-white" : "")
                    }
                  /> */}
                    <span className="max-sm:hidden">Admin</span>
                  </button>
                </div>
              </div>
            </div>
            {/* table starts here */}
            <div className="mt-3 overflow-x-auto">
              <table className="table table-zebra table-auto w-full">
                <thead className="bg-neutral text-white">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    {/* <th>Role</th> */}
                    <th>Status</th>
                    <th>GSTIN</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((user) => (
                    <tr key={user?.id}>
                      <td>{user?.name}</td>
                      <td>{user?.email}</td>
                      <td>{user?.contact}</td>
                      {/* <td>
                        {user?.role === 1
                          ? "Admin"
                          : user?.role === 2
                          ? "Business"
                          : user?.role === 3
                          ? "Moderator"
                          : "Employee"}
                          </td> */}
                      <td>
                        {user?.status === 1
                          ? "Pending"
                          : user?.status === 2
                          ? "Declined"
                          : "Accepted"}
                      </td>
                      <td>{user?.gstin}</td>
                      <td>
                        <div className=" flex items-center justify-around gap-5">
                          <button
                            className="secondary-btn text-white"
                            onClick={() => suspendUserHandler(user?.code, 2)}
                          >
                            Suspend
                          </button>
                          <Link
                            to={`/connections/?code=${user?.code}`}
                            className="primary-btn text-white"
                          >
                            Connections
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </PrimaryLayout>
    </>
  );
};

export default Users;