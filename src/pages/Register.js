import React, { useEffect, useState } from "react";
import FormField from "../components/FormField";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import validateEmail from "../utils/validateEmail";
import { toast } from "react-toastify";

const Register = () => {
  //user token
  const navigate = useNavigate();
  const { tok } = useSelector((state) => state.user);

  //stepper state
  const [stepperIndex, setStepperIndex] = useState(1);

  //alert states
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("Something went wrong!");

  //category states
  const [categories, setCategories] = useState([]);
  const [categoryValue, setCategoryValue] = useState([]);

  //form input states
  const [category, setCategory] = useState();
  const [name, setName] = useState();
  const [contact, setContact] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [aadharCard, setAadharCard] = useState();
  const [addressLine1, setAddressLine1] = useState();
  const [addressLine2, setAddressLine2] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [country, setCountry] = useState();
  const [pincode, setPincode] = useState();
  const [googleMapLink, setGoogleMapLink] = useState();
  const [gstin, setGstin] = useState();
  const [accountHolderName, setAccountHolderName] = useState();
  const [accountNumber, setAccountNumber] = useState();
  const [bankName, setBankName] = useState();
  const [bankAddress, setBankAddress] = useState();
  const [ifscCode, setIfscCode] = useState();
  const [upiId, setUpiId] = useState();

  const getCategories = () => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/category`, {
        headers: {
          Authorization: `${tok}`,
        },
      })
      .then((res) => {
        let s = res.data?.categories?.split(",");
        // console.log(res.data[0]?.categories?.split(","));
        const lis = [];
        const val = [];
        s.map((r) => {
          // console.log(r?.split('|'));
          val.push(r?.split("|")[0]);
          lis.push(r?.split("|")[1]);
        });
        setCategories(lis);
        setCategoryValue(val);

        // // setSubCatData();
        // let lis = [];
        // // console.log(res.);
        // res.data.map((data) => {
        //   return lis.push(data.name);
        // });
        // setSubCatData(lis);
        // const extractedData = res.data.reduce((result, item) => {
        //   result[item.name] = item.id;
        //   return result;
        // }, {});
        // setCatId(extractedData);
        // console.log("extractedData");
        // console.log(extractedData);
        // console.log("catId");
        // console.log(catId);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getCategories();
  }, []);

  //form submit and step handler
  const formSubmitHandler = async () => {
    try {
      if (stepperIndex === 1) {
        if (!name || !contact || !email || !password || !category) {
          setShowAlert(true);
          setAlertMessage("Please fill all the fields!");
          return;
        }
        if (name.length < 3) {
          setShowAlert(true);
          setAlertMessage("Please enter a valid name");
          return;
        }
        if (contact.length < 10) {
          setShowAlert(true);
          setAlertMessage("Please enter a valid contact number");
          return;
        }
        if (!validateEmail(email)) {
          setShowAlert(true);
          setAlertMessage("Please enter a valid email");
          return;
        }
        if (password.length < 0) {
          setShowAlert(true);
          setAlertMessage("Password must have atleast 8 characters");
          return;
        }
        setShowAlert(false);
        setStepperIndex((prev) => {
          if (prev === 3) return prev;
          else return prev + 1;
        });
        return;
      } else if (stepperIndex === 2) {
        if (
          !aadharCard ||
          !addressLine1 ||
          !city ||
          !state ||
          !country ||
          !pincode ||
          !googleMapLink
        ) {
          setShowAlert(true);
          setAlertMessage("Please fill all the fields!");
          return;
        }

        if (addressLine1.trim().length === 0) {
          setShowAlert(true);
          setAlertMessage("Please enter a valid address!");
        }
        if (city.trim().length === 0) {
          setShowAlert(true);
          setAlertMessage("Please enter a valid city!");
        }
        if (state.trim().length === 0) {
          setShowAlert(true);
          setAlertMessage("Please enter a valid state!");
        }
        if (pincode.trim().length === 0) {
          setShowAlert(true);
          setAlertMessage("Please enter a valid pincode!");
        }
        setShowAlert(false);
        setStepperIndex((prev) => {
          if (prev === 3) return prev;
          else return prev + 1;
        });
        return;
      }
      if (
        !gstin ||
        !accountHolderName ||
        !accountNumber ||
        !bankName ||
        !bankAddress ||
        !ifscCode ||
        !upiId
      ) {
        setShowAlert(true);
        setAlertMessage("Please fill all the fields!");
        return;
      }
      if (gstin.trim().length === 0) {
        setShowAlert(true);
        setAlertMessage("Please enter a valid gstin!");
        return;
      }
      if (accountHolderName.trim().length === 0) {
        setShowAlert(true);
        setAlertMessage("Please enter a valid account holder's name!");
        return;
      }
      if (accountNumber.trim().length === 0) {
        setShowAlert(true);
        setAlertMessage("Please enter a valid account number!");
        return;
      }
      if (bankName.trim().length === 0) {
        setShowAlert(true);
        setAlertMessage("Please enter a valid bank name!");
        return;
      }
      if (bankAddress.trim().length === 0) {
        setShowAlert(true);
        setAlertMessage("Please enter a valid bank address!");
        return;
      }
      if (ifscCode.trim().length === 0) {
        setShowAlert(true);
        setAlertMessage("Please enter a valid ifsc code!");
        return;
      }
      if (upiId.trim().length === 0) {
        setShowAlert(true);
        setAlertMessage("Please enter a valid upi id!");
        return;
      }

      // payload with aadhar
      // let payload = new FormData();
      // payload.append("name", name);
      // payload.append("category", category);
      // payload.append("contact", contact);
      // payload.append("email", email);
      // payload.append("password", password);
      // payload.append("addressLine1", addressLine1);
      // payload.append("addressLine2", addressLine2);
      // payload.append("city", city);
      // payload.append("state", state);
      // payload.append("country", country);
      // payload.append("zip", pincode);
      // payload.append("gmaplink", googleMapLink);
      // payload.append("gstin", gstin);
      // payload.append("accountHolderName", accountHolderName);
      // payload.append("accountNumber", accountNumber);
      // payload.append("bankName", bankName);
      // payload.append("bankAddress", bankAddress);
      // payload.append("ifsc", ifscCode);
      // payload.append("upi", upiId);
      // payload.append("aadhar_pic", aadharCard);

      //payload without aadhar
      const payload = {
        name: name,
        category: category,
        contact: contact,
        email: email,
        password: password,
        addressLine1,
        addressLine2,
        city,
        state,
        country,
        zip: pincode,
        gmaplink: googleMapLink,
        gstin,
        accountHolderName,
        accountNumber,
        bankName,
        bankAddress,
        ifsc: ifscCode,
        file: aadharCard,
        upi: upiId,
      };

      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        navigate("/login");
        toast.success("Account Requested Successfully");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="flex  justify-center items-center">
      <div className="card lg:card-side bg-base-100 shadow-2xl my-auto md:my-10 md:mx-auto max-sm:m-5 overflow-hidden md:max-w-[70%] mx-10 md:h-fit">
        <img
          width="50%"
          src="./assets/images/Login_Signup.png"
          alt="Album"
          className="max-lg:hidden object-cover"
        />
        <div className="card-body bg-white">
          {/* Personal Details Form */}
          <form
            className={`flex flex-col my-auto gap-4 ${
              stepperIndex === 1 ? "" : "hidden"
            }`}
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <h1 className="text-2xl text-primary300 font-semibold text-center">
              Register
            </h1>
            <ul className="steps text-sm">
              <li className="step step-neutral">Personal Details</li>
              <li className={`step ${stepperIndex > 1 ? "step-neutral" : ""}`}>
                Address Details
              </li>
              <li className={`step ${stepperIndex > 2 ? "step-neutral" : ""}`}>
                Financial Details
              </li>
            </ul>
            <div>
              {showAlert && (
                <div
                  role="alert"
                  className={`alert alert-error flex bg-red-300 justify-between alert-sm`}
                >
                  <div className="flex gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="stroke-current shrink-0 w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <span>{alertMessage}</span>
                  </div>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    cursor="pointer"
                    onClick={() => {
                      setShowAlert(false);
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              )}
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text font-semibold">Category </span>
                </div>
                <select
                  className="select select-bordered bg-transparent"
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  <option disabled selected>
                    Pick one
                  </option>
                  {categories?.map((name, ind) => (
                    <option key={ind} value={categoryValue[ind]}>
                      {name}
                    </option>
                  ))}
                </select>
              </label>
              <div className="flex sm:gap-5 max-sm:flex-wrap">
                <FormField
                  required={true}
                  title="Name"
                  inputHandler={(e) => {
                    setName(e.target.value);
                  }}
                />
                <FormField
                  required={true}
                  title="Contact"
                  inputHandler={(e) => {
                    setContact(e.target.value);
                  }}
                />
              </div>
              <div className="flex sm:gap-5 max-sm:flex-wrap">
                <FormField
                  required={true}
                  title="Email Address"
                  inputHandler={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <FormField
                  required={true}
                  title="Password"
                  type="password"
                  inputHandler={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>
          </form>
          {/* Address Details Form */}
          <form
            className={`flex flex-col gap-4 ${
              stepperIndex === 2 ? "" : "hidden"
            }`}
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <h1 className="text-2xl text-primary300 font-semibold text-center">
              Register
            </h1>
            <ul className="steps">
              <li className="step step-neutral">Personal Details</li>
              <li className={`step ${stepperIndex > 1 ? "step-neutral" : ""}`}>
                Address Details
              </li>
              <li className={`step ${stepperIndex > 2 ? "step-neutral" : ""}`}>
                Financial Details
              </li>
            </ul>
            <div>
              <div
                role="alert"
                className={`alert alert-error ${
                  !showAlert ? "hidden" : "flex"
                } bg-red-300 justify-between`}
              >
                <div className="flex gap-1 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="stroke-current shrink-0 w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span>{alertMessage}</span>
                </div>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  cursor="pointer"
                  onClick={() => {
                    setShowAlert(false);
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex sm:gap-5 max-sm:flex-wrap">
                <FormField
                  title="Address Line 1"
                  required={true}
                  inputHandler={(e) => {
                    setAddressLine1(e.target.value);
                  }}
                />
                <FormField
                  title="Address Line 2"
                  required={true}
                  inputHandler={(e) => {
                    setAddressLine2(e.target.value);
                  }}
                />
              </div>
              <div className="flex sm:gap-5 max-sm:flex-wrap">
                <FormField
                  title="City"
                  required={true}
                  inputHandler={(e) => {
                    setCity(e.target.value);
                  }}
                />
                <FormField
                  title="State"
                  required={true}
                  inputHandler={(e) => {
                    setState(e.target.value);
                  }}
                />
              </div>
              <div className="flex sm:gap-5 max-sm:flex-wrap">
                <FormField
                  title="Country"
                  required={true}
                  inputHandler={(e) => {
                    setCountry(e.target.value);
                  }}
                />
                <FormField
                  title="Pincode"
                  required={true}
                  inputHandler={(e) => {
                    setPincode(e.target.value);
                  }}
                />
              </div>
              <div className="flex sm:gap-5 max-sm:flex-wrap">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-semibold">
                      Aadhar Card <span style={{ color: "red" }}>*</span>
                    </span>
                  </div>
                  <input
                    onChange={(e) => setAadharCard(e.target.files[0])}
                    type="file"
                    className="file-input file-input-bordered w-full "
                  />
                </label>
                <FormField
                  title="Google maps link"
                  required={true}
                  inputHandler={(e) => {
                    setGoogleMapLink(e.target.value);
                  }}
                />
              </div>
            </div>
          </form>
          {/* Financial Details Form */}
          <form
            className={`flex flex-col gap-4 ${
              stepperIndex === 3 ? "" : "hidden"
            }`}
            encType="multipart/form-data"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <h1 className="text-2xl text-primary300 font-semibold text-center">
              Register
            </h1>
            <ul className="steps">
              <li className="step step-neutral">Personal Details</li>
              <li className={`step ${stepperIndex > 1 ? "step-neutral" : ""}`}>
                Address Details
              </li>
              <li className={`step ${stepperIndex > 2 ? "step-neutral" : ""}`}>
                Financial Details
              </li>
            </ul>
            <div
              role="alert"
              className={`alert alert-error ${
                !showAlert ? "hidden" : "flex"
              } bg-red-300 justify-between`}
            >
              <div className="flex gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-current shrink-0 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>{alertMessage}</span>
              </div>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                cursor="pointer"
                onClick={() => {
                  setShowAlert(false);
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <FormField
                title="GSTIN"
                required={true}
                inputHandler={(e) => {
                  setGstin(e.target.value);
                }}
              />
              <FormField
                title="Account Holder's Name"
                required={true}
                inputHandler={(e) => {
                  setAccountHolderName(e.target.value);
                }}
              />
              <FormField
                title="Account Number"
                type="number"
                required={true}
                inputHandler={(e) => {
                  setAccountNumber(e.target.value);
                }}
              />
              <FormField
                title="Bank Name"
                required={true}
                inputHandler={(e) => {
                  setBankName(e.target.value);
                }}
              />
              <FormField
                title="Bank Address"
                required={true}
                inputHandler={(e) => {
                  setBankAddress(e.target.value);
                }}
              />
              <FormField
                title="IFSC Code"
                required={true}
                inputHandler={(e) => {
                  setIfscCode(e.target.value);
                }}
              />
              <FormField
                title="UPI ID"
                inputHandler={(e) => {
                  setUpiId(e.target.value);
                }}
              />
            </div>
          </form>
          <button
            className={`btn btn-secondary text-white rounded-btn hover:text-secondary hover:bg-white ${
              stepperIndex === 1 ? "hidden" : "block"
            }`}
            onClick={() => {
              setStepperIndex((prev) => {
                if (prev === 1) return prev;
                else return prev - 1;
              });
            }}
          >
            Go back
          </button>
          <button
            type="submit"
            className="primary-btn"
            onClick={formSubmitHandler}
          >
            {stepperIndex <= 2 ? "Proceed to next step" : "Submit"}
          </button>
          <div className="flex flex-col gap-3 mt-2">
            <Link
              to={"/login"}
              className="text-neutral hover:text-neutral/70 font-semibold"
            >
              Already a user? Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
