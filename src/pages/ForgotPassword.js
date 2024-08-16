import React, { useEffect, useState } from "react";
// import FormField from "../components/forgot-password_Signup/FormField";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { login } from "../redux/slice";
// import { addToCart } from "../redux/cartSlice";
import FormField from "../components/FormField";
import validateEmail from "../utils/validateEmail";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOTPSended, setIsOTPSended] = useState(false);
  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: "",
    emailOTP: "",
    password: "",
    confirmPassword: "",
  });
  const [countdown, setCountdown] = useState(60);
  const [isCounting, setIsCounting] = useState(false);

  const forgotPasswordInputHandler = (e) => {
    setForgotPasswordData((currData) => {
      currData[e.target.name] = e.target.value;
      return currData;
    });
  };

  const getForgotPasswordOTP = async () => {
    if (!validateEmail(forgotPasswordData?.email))
      return toast.error(`Please Enter a valid email address`);

    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/forgot-password-otp`,
        {
          email: forgotPasswordData?.email,
        }
      );

      if (res?.status === 201) {
        setCountdown(60);
        setIsCounting(true);
        setIsOTPSended(true);
      }
      toast.success("OTP Sent successfully");
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to send OTP.");
    }
  };

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("Something went wrong!");

  const { auth, id } = useSelector((state) => state.user);

  useEffect(() => {
    if (auth) navigate("/");
  }, []);

  const handleSubmit = () => {
    if (!validateEmail(forgotPasswordData.email)) {
      return toast.error("Please enter valid email address.");
    }

    if (forgotPasswordData?.emailOTP?.length !== 6)
      return toast.error("Please enter a valid OTP.");

    if (forgotPasswordData?.password?.length < 8)
      return toast.error("Password should have atleast 8 digits.");

    if (forgotPasswordData?.password !== forgotPasswordData?.confirmPassword)
      return toast.error("Password and Confirm Password should be same.");

    axios
      .patch(
        `${process.env.REACT_APP_BACKEND_URL}/forgot-password`,
        forgotPasswordData
      )
      .then((res) => {
        if (res?.data?.token) {
          const user_role =
            res.data.role === 1
              ? "admin"
              : res.data.role === 2
              ? "business"
              : "";

          if (user_role === "") {
            toast.dismiss();
            return toast.error("Admin and Seller login allowed only");
          }

          dispatch(
            login({
              token: res.data.token,
              code: res.data.code,
              id: res.data.userId,
              email: res.data.email,
              role: user_role,
            })
          );

          navigate("/");
        }
      })
      .catch((err) => {
        if (err.response.status === 403) {
          return toast.error(err.response.data.error);
        }
      });
  };

  useEffect(() => {
    let timer;
    if (isCounting) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            setIsCounting(false);
            clearInterval(timer);
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isCounting]);

  return (
    <div className="flex justify-center items-center">
      <div className="card lg:card-side bg-base-100 shadow-2xl my-auto md:my-10 md:mx-auto max-sm:m-5 overflow-hidden md:max-w-[70%] mx-10 max-h-[88vh] max-sm:overflow-scroll">
        <img
          width="50%"
          src="./assets/images/login_Signup.png"
          alt="Album"
          className="max-lg:hidden object-cover"
        />
        {/* </figure> */}

        <div className="card-body bg-white">
          <form
            className="flex flex-col gap-6 pb-8 border-b-2 border-neutral300"
            onSubmit={handleSubmit}
          >
            <h1 className="text-3xl text-primary300 font-semibold">
              Forgot Password
            </h1>
            <div
              role="alert"
              className={`alert alert-error transition-all duration-500 ${
                !showAlert ? "hidden invisible " : "flex visible"
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
            <div className="flex sm:gap-5 max-sm:flex-col">
              <FormField
                title="Email"
                id="email"
                type="email"
                name="email"
                inputHandler={forgotPasswordInputHandler}
              />
              <FormField
                title="Email OTP"
                type="number"
                id="emailOTP"
                name="emailOTP"
                inputHandler={forgotPasswordInputHandler}
              />
            </div>
            <div className="flex sm:gap-5 max-sm:flex-col">
              <FormField
                title="Password"
                id="password"
                type="password"
                name="password"
                inputHandler={forgotPasswordInputHandler}
              />
              <FormField
                title="Confirm Password"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                inputHandler={forgotPasswordInputHandler}
              />
            </div>
            <button
              type="submit"
              className="primary-btn"
              onClick={(e) => {
                e.preventDefault();
                if (isOTPSended) {
                  handleSubmit();
                } else {
                  getForgotPasswordOTP();
                }
              }}
            >
              {isOTPSended ? "Submit" : "Send OTP"}
            </button>
          </form>

          <div className="flex flex-col gap-3">
            {isOTPSended && (
              <Link
                className="text-neutral hover:text-neutral/70 font-semibold"
                style={{ border: "none", backgroundColor: "white" }}
                onClick={() => {
                  getForgotPasswordOTP();
                }}
                disabled={isCounting}
              >
                Resend OTP {isCounting && `(${countdown}s)`}
              </Link>
            )}
            <Link
              to={"/register"}
              className="text-neutral hover:text-neutral/70 font-semibold"
            >
              Register New User
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
