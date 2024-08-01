import React, { useEffect, useState } from "react";
import PrimaryLayout from "../../Layout/PrimaryLayout";
import { GoPlus } from "react-icons/go";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slice";
import { toast } from "react-toastify";
import FormField from "../../components/FormField";
import validateEmail from "../../utils/validateEmail";
import FallbackText from "../../components/FallbackText";
import { FaPeopleRoof } from "react-icons/fa6";
import Loading from "../../components/Loading";

const Companies = () => {
  const dispatch = useDispatch();
  const { tok } = useSelector((state) => state.user);

  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState({});
  const [loadingData, setLoadingData] = useState(false);

  //  Get all products from the database.
  const getCompanies = async () => {
    setLoadingData(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/company`,
        {},
        {
          headers: {
            Authorization: tok,
          },
        }
      );

      setCompanies(data);
    } catch (error) {
      if (error?.response?.status === 401) {
        toast.dismiss();
        toast.error("Session Expired");
        dispatch(logout());
      }
    }
    setLoadingData(false);
  };

  const deleteCompanyHandler = async (id) => {
    try {
      const res = await toast.promise(
        axios.delete(
          `${process.env.REACT_APP_BACKEND_URL}/company/delete/${id}`,
          {
            headers: {
              Authorization: tok,
            },
          }
        ),
        {
          pending: "Deleting Company...",
          success: "Company deleted Successfully!",
          error: {
            render({ data }) {
              if (data?.response?.status === 401) {
                dispatch(logout());
                return "Session Expired";
              } else {
                return (
                  data?.response?.data?.error || "Failed to delete Company."
                );
              }
            },
          },
        }
      );
      if (res?.status === 200) {
        setCompanies((currCompanies) =>
          currCompanies.filter((company) => company.id !== id)
        );
      }
    } catch (e) {}
  };

  useEffect(() => {
    getCompanies();
  }, []);

  return (
    <>
      <AddCompany getCompanies={getCompanies} />
      <UpdateCompany company={selectedCompany} setCompanies={setCompanies} />
      {/*
      <AddSubCompany company={selectedCompany} /> */}
      <PrimaryLayout>
        <div className="card bg-white max-w-full max-md:pb-28">
          <div className="card-body p-0 2xl:mx-auto">
            <div className="flex max-sm:flex-col max-sm:items-start max-sm:gap-3 justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-start">Company List</h2>
                <p className="text-sm">Companies {">"} Company List</p>
              </div>
              <Link
                className="primary-btn font-semibold"
                // onClick={() => {
                //   navigate("/add-product");
                // }}
                onClick={() =>
                  document.getElementById("add_company").showModal()
                }
                // to={"/add-company"}
              >
                <GoPlus size={20} /> Add New
              </Link>
            </div>
            {/* table starts here */}
            {loadingData && (
              <div className="w-40 h-40 m-auto">
                <Loading />
              </div>
            )}
            {!loadingData &&
              (companies?.length ? (
                <div className="mt-3 overflow-x-auto">
                  <table className="table table-zebra table-auto w-full">
                    <thead className="bg-neutral text-center text-white">
                      <tr>
                        <th>Company Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>WhatsApp</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {companies?.map((company) => (
                        <tr key={company?.id}>
                          <td>{company?.name}</td>
                          <td>{company?.email}</td>
                          <td>{company?.contact}</td>
                          <td>{company?.whatsapp}</td>
                          <td>
                            <div className=" flex items-center justify-around gap-5">
                              <button
                                className="secondary-btn"
                                onClick={() => deleteCompanyHandler(company.id)}
                              >
                                Delete
                              </button>
                              <Link
                                className="primary-btn"
                                onClick={() => {
                                  setSelectedCompany(company);
                                  document
                                    .getElementById("update_company")
                                    .showModal();
                                }}
                              >
                                Update
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <FallbackText
                  IconRef={FaPeopleRoof}
                  message={"No Companies found"}
                />
              ))}
          </div>
        </div>
      </PrimaryLayout>
    </>
  );
};

export default Companies;

const AddCompany = ({ getCompanies }) => {
  const dispatch = useDispatch();
  const { tok } = useSelector((state) => state.user);
  const [companyDetails, setCompanyDetails] = useState({
    name: "",
    contact: "",
    whatsapp: "",
    email: "",
  });

  const inputHandler = (e) => {
    setCompanyDetails((currDetails) => {
      return { ...currDetails, [e.target.name]: e.target.value };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!companyDetails?.name?.length) {
        return toast.error("Please enter a Company Name");
      } else if (companyDetails?.contact?.length !== 10) {
        return toast.error("Please enter a valid Contact Number");
      } else if (companyDetails?.whatsapp?.length !== 10) {
        return toast.error("Please enter a valid WhatsApp Number");
      } else if (!validateEmail(companyDetails?.email)) {
        return toast.error("Please enter a valid Email Address");
      }

      const res = await toast.promise(
        axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/company/create`,
          companyDetails,
          { headers: { Authorization: tok } }
        ),
        {
          pending: "Adding Company...",
          success: "Company added Successfully!",
          error: {
            render({ data }) {
              if (data?.response?.status === 401) {
                dispatch(logout());
                return "Session Expired";
              } else {
                return data?.response?.data?.error || "Failed to add Company.";
              }
            },
          },
        }
      );
      if (res?.status === 201) {
        document.getElementById("add_company").close();
        setCompanyDetails({
          name: "",
          contact: "",
          whatsapp: "",
          email: "",
        });
        getCompanies();
      }
    } catch (e) {}
  };

  return (
    <dialog id="add_company" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Add Company</h3>
        <div className="flex flex-col flex-wrap py-2">
          <div className="flex justify-between items-center gap-3 max-sm:flex-wrap">
            <FormField
              title={"Company Name"}
              name={"name"}
              inputHandler={inputHandler}
              value={companyDetails?.name}
            />
            <FormField
              title={"Email"}
              name={"email"}
              inputHandler={inputHandler}
              value={companyDetails?.email}
            />
          </div>
          <div className="flex justify-between items-center gap-3 max-sm:flex-wrap">
            <FormField
              title={"Contact"}
              name={"contact"}
              inputHandler={inputHandler}
              value={companyDetails?.contact}
              type={"number"}
            />
            <FormField
              title={"WhatsApp"}
              name={"whatsapp"}
              inputHandler={inputHandler}
              value={companyDetails?.whatsapp}
              type={"number"}
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="modal-action my-0">
              <form method="dialog">
                <button className="secondary-btn">Close</button>
              </form>
            </div>
            <button className="primary-btn" onClick={submitHandler}>
              Add
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

const UpdateCompany = ({ company, setCompanies }) => {
  const dispatch = useDispatch();
  const { tok } = useSelector((state) => state.user);
  const [updatedCompany, setUpdatedCompany] = useState({});

  useEffect(() => {
    setUpdatedCompany(company);
  }, [company]);

  const inputHandler = (e) => {
    setUpdatedCompany((currDetails) => {
      return { ...currDetails, [e.target.name]: e.target.value };
    });
  };

  const updateCompanyHandler = async (e) => {
    e.preventDefault();
    try {
      if (!updatedCompany?.name?.length) {
        return toast.error("Please enter a Company Name");
      } else if (updatedCompany?.contact?.length !== 10) {
        return toast.error("Please enter a valid Contact Number");
      } else if (updatedCompany?.whatsapp?.length !== 10) {
        return toast.error("Please enter a valid WhatsApp Number");
      } else if (!validateEmail(updatedCompany?.email)) {
        return toast.error("Please enter a valid Email Address");
      }

      const res = await toast.promise(
        axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/company/update/${company.id}`,
          updatedCompany,
          { headers: { Authorization: tok } }
        ),
        {
          pending: "Updating Company...",
          success: "Company updated Successfully!",
          error: {
            render({ data }) {
              if (data?.response?.status === 401) {
                dispatch(logout());
                return "Session Expired";
              } else {
                return (
                  data?.response?.data?.error || "Failed to update Company."
                );
              }
            },
          },
        }
      );
      if (res?.status === 200) {
        document.getElementById("update_company").close();
        setCompanies((currCompanies) => {
          return currCompanies.map((comp) => {
            if (comp.id === company.id) return { ...comp, ...updatedCompany };
            return comp;
          });
        });
        setUpdatedCompany({
          name: "",
          contact: "",
          whatsapp: "",
          email: "",
        });
      }
    } catch (e) {}
  };
  return (
    <dialog id="update_company" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          Update Company - {updatedCompany?.name}
        </h3>
        <div className="flex flex-col flex-wrap py-2">
          <div className="flex justify-between items-center gap-3 max-sm:flex-wrap">
            <FormField
              title={"Company Name"}
              name={"name"}
              value={updatedCompany?.name}
              inputHandler={inputHandler}
            />
            <FormField
              title={"Email"}
              name={"email"}
              value={updatedCompany?.email}
              inputHandler={inputHandler}
            />
          </div>
          <div className="flex justify-between items-center gap-3 max-sm:flex-wrap">
            <FormField
              title={"WhatsApp"}
              name={"whatsapp"}
              value={updatedCompany?.whatsapp}
              inputHandler={inputHandler}
            />
            <FormField
              title={"Contact"}
              name={"contact"}
              value={updatedCompany?.contact}
              inputHandler={inputHandler}
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="modal-action my-0">
              <form method="dialog">
                <button className="secondary-btn">Close</button>
              </form>
            </div>
            <button className="primary-btn" onClick={updateCompanyHandler}>
              Update
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};
