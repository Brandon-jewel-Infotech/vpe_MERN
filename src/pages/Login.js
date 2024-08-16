import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { login } from "../redux/slice";
import FormField from "../components/FormField";
import validateEmail from "../utils/validateEmail";
import { toast } from "react-toastify";

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const loginHandler = (e) => {
    setLoginData((currData) => {
      currData[e.target.name] = e.target.value;
      return currData;
    });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("Something went wrong!");

  const { auth, id } = useSelector((state) => state.user);

  useEffect(() => {
    if (auth) navigate("/");
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let email = data.get("email");
    let password = data.get("password");

    toast.dismiss();
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    if (password?.length < 8) {
      return toast.error("Password must be at least 8 characters");
    }

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        {
          email: data.get("email").toLowerCase(),
          password: data.get("password"),
        }
      );

      console.log("Working");
      const user_role =
        res.data.role === 3
          ? "moderator"
          : res.data.role === 4
          ? "employee"
          : "";

      if (user_role === "") {
        toast.dismiss();
        return toast.error("Employee and Moderator login allowed only");
      }
      dispatch(
        login({
          token: res.data.token,
          code: res.data.code,
          id: res.data.employeeId,
          role: user_role,
          email: data.get("email").toLowerCase(),
        })
      );

      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.error || "Employee Login Failed");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="card lg:card-side bg-base-100 shadow-2xl my-auto md:my-10 md:mx-auto max-sm:m-5 overflow-hidden md:max-w-[70%] mx-10 max-h-[88vh]">
        <img
          width="50%"
          src="./assets/images/Login_Signup.png"
          alt="Album"
          className="max-lg:hidden object-cover"
        />

        <div className="card-body bg-white">
          <form
            className="flex flex-col gap-6 pb-8 border-b-2 border-neutral300"
            onSubmit={handleSubmit}
          >
            <h1 className="text-3xl text-primary300 font-semibold">Login</h1>
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
            <div>
              <FormField
                title="Email"
                id="email"
                type="email"
                name="email"
                inputHandler={loginHandler}
              />
              <FormField
                title="Password"
                type="password"
                id="password"
                name="password"
                inputHandler={loginHandler}
              />
            </div>
            <button type="submit" className="primary-btn">
              Login
            </button>
          </form>

          <div className="flex flex-col gap-3">
            <Link
              to={"/forgot-password"}
              className="text-neutral hover:text-neutral/70 font-semibold"
            >
              Forgot your password?
            </Link>
            {/* <Link
              to={"/register"}
              className="text-neutral hover:text-neutral/70 font-semibold"
            >
              Register New User
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
