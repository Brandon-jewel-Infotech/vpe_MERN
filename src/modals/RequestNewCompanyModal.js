import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../redux/slice";
import FormField from "../components/FormField";
import validateEmail from "../utils/validateEmail";

const RequestNewCompanyModal = () => {
  const dispatch = useDispatch();
  const { tok } = useSelector((state) => state.user);
  const [companyName, setCompanyName] = useState();
  const [companyNumber, setCompanyNumber] = useState();
  const [companyWhatsappNumber, setCompanyWhatsappNumber] = useState();
  const [companyEmail, setCompanyEmail] = useState();

  const requestNewCompany = async () => {
    try {
      if (!companyName?.length) {
        toast.error("Please enter a valid company name");
      } else if (companyNumber?.length !== 10) {
        toast.error("Please enter a valid contact number");
      } else if (companyWhatsappNumber?.length !== 10) {
        toast.error("Please enter a valid whatsapp number");
      } else if (validateEmail(companyEmail)) {
        toast.error("Please enter a valid email address");
      }
      let message = `I want to request a new company  : 
          \nCompany Name : ${companyName}
          \nCompany Toll Free : ${companyNumber}
          \nCompany Whatsapp Number : ${companyWhatsappNumber}
          \nCompany Email : ${companyEmail}`;

      const { data } = await toast.promise(
        axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/seller/requests/create`,
          {
            description: message,
            receiver: 0,
            role: 2,
          },
          {
            headers: {
              Authorization: tok,
            },
          }
        ),
        {
          pending: "Adding Company request...",
          success: "Company request added Successfully!",
          error: {
            render({ data }) {
              if (data?.response?.status === 401) {
                dispatch(logout());
                return "Session Expired";
              } else {
                return (
                  data?.response?.data?.error ||
                  "Failed to add Company request."
                );
              }
            },
          },
        }
      );
      document.getElementById("company_modal").close();
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <>
      <button
        className="text-start ml-2 mt-1 text-neutral hover:text-[#bc8ffc] w-fit"
        onClick={() => document.getElementById("company_modal").showModal()}
      >
        Request a new company?
      </button>
      <dialog id="company_modal" className="modal">
        <div className="modal-box">
          <h2 className="font-semibold text-xl my-2">Request new company</h2>
          <FormField
            title="Enter new company name"
            inputHandler={(e) => {
              setCompanyName(e.target.value);
            }}
            value={companyName}
            required={true}
          />
          <FormField
            title="Enter company number"
            value={companyNumber}
            inputHandler={(e) => {
              setCompanyNumber(e.target.value);
            }}
            required={true}
          />
          <FormField
            title="Enter company whatsapp number"
            value={companyWhatsappNumber}
            inputHandler={(e) => {
              setCompanyWhatsappNumber(e.target.value);
            }}
            required={true}
          />
          <FormField
            title="Enter company email"
            value={companyEmail}
            inputHandler={(e) => {
              setCompanyEmail(e.target.value);
            }}
            required={true}
          />
          <div className="flex w-full justify-center gap-4">
            {/* if there is a button in form, it will close the modal */}
            <form method="dialog">
              <button className=" btn secondary-btn">Cancel</button>
            </form>
            <button
              className=" btn primary-btn"
              onClick={() => {
                requestNewCompany();
              }}
            >
              Make request
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default RequestNewCompanyModal;
