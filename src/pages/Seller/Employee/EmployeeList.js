import React, { useEffect, useState } from "react";
import PrimaryLayout from "../../../Layout/PrimaryLayout";
import { GoPlus } from "react-icons/go";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/slice";
import { toast } from "react-toastify";

const EmployeeList = () => {
  const { tok } = useSelector((state) => state.user);
  const [employeesData, setEmployeeData] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const removeEmployee = async (employeeId) => {
    try {
      const res = await toast.promise(
        axios.delete(
          `${process.env.REACT_APP_BACKEND_URL}/employees/delete/${employeeId}`,
          {
            headers: {
              Authorization: tok,
            },
          }
        ),
        {
          pending: "Deleting Employee...",
          success: "Employee deleted Successfully!",
          error: {
            render({ data }) {
              if (data?.response?.status === 401) {
                dispatch(logout());
                return "Session Expired";
              } else {
                return (
                  data?.response?.data?.error || "Failed to delete Employee."
                );
              }
            },
          },
        }
      );

      if (res?.status === 200) {
        setEmployeeData((currEmployees) =>
          currEmployees.filter((employee) => employee.id !== employeeId)
        );
      }
    } catch (e) {}
  };

  //fetch the employees
  const getEmployees = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/employees`,
        {},
        {
          headers: {
            Authorization: tok,
          },
        }
      );

      setEmployeeData(data);
    } catch (error) {
      if (error?.response?.status === 401) {
        toast.dismiss();
        toast.error("Session Expired");
        dispatch(logout());
      }
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <PrimaryLayout>
      <div className="card bg-white">
        <div className="card-body p-0">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-start">Employee List</h2>
              <p className="text-md">Employees {">"} Employee List</p>
            </div>

            <button
              className="primary-btn font-semibold"
              onClick={() => {
                navigate("/add-employee");
              }}
            >
              <GoPlus size={20} /> Add New
            </button>
          </div>
          <div className="overflow-x-auto mt-3">
            <table className="table ">
              <thead className="bg-neutral text-white">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employeesData.map((employee, i) => (
                  <tr key={i}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="font-bold">{employee.name}</div>
                      </div>
                    </td>
                    <td>{employee.email}</td>
                    <td>{employee.contact}</td>
                    <td>
                      <button
                        className="text-error"
                        onClick={() => {
                          removeEmployee(employee.id);
                        }}
                      >
                        <AiFillDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PrimaryLayout>
  );
};

export default EmployeeList;
