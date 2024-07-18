import React, { useEffect, useState } from "react";
// import FormField from "../components/Login_Signup/FormField";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { login } from "../redux/slice";
import { addToCart } from "../redux/cartSlice";
import FormField from "../components/FormField";
import validateEmail from "../utils/validateEmail";

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
  const [error, setError] = useState(null);
  const { tok } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("Something went wrong!");

  const { auth, id } = useSelector((state) => state.user);

  useEffect(() => {
    if (auth) navigate("/");
  }, []);

  const getCart = (token) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/seller/cart`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        let qty = [];
        let variant = [];

        // handleClick(res.data.message);
        // console.log(res?.data)
        // console.log(res?.data.result[0].description)
        // console.log(res?.data.result[0].image.split(',')[0])
        // console.log("Hello2")
        // console.log(res.data.total,res.data.variant_id,res.data.qty)
        res.data?.result?.map((i, index) => {
          dispatch(
            addToCart({
              createdBy: id,
              price: i.price_b2b,
              description: i.description,
              images: i.image.split(",")[0],
              name: i.name,
              id: i.id,
              quantity: parseInt(res.data.qty[index]),
              variant_id: res.data.variant_id[index]
                ? res.data.variant_id[index]
                : 0,
              total: res.data.total,
            })
          );
        });
      })
      .catch((err) => {
        // console.log(err);
        alert("Session expired");
        // navigate("/logout");
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let email = data.get("email");
    let password = data.get("password");

    if (!validateEmail(email)) {
      setShowAlert(true);
      setAlertMessage("Please enter a valid email");
      return;
    }
    // console.log(email, password);

    if (email.length >= 8 && password.length >= 8) {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
          email: data.get("email").toLowerCase(),
          password: data.get("password"),
        })
        .then((res) => {
          if (res?.data?.token) {
            //role => 1: Admin , 2 : business , 3 : Mod , 4 : employee
            const user_role =
              res.data.role === 1
                ? "admin"
                : res.data.role === 2
                ? "business"
                : res.data.role === 3
                ? "mod"
                : "employee";
            // console.log('logged in')
            dispatch(
              login({
                token: res.data.token,
                code: res.data.code,
                id: res.data.userId,
                role: user_role,
                email: data.get("email").toLowerCase(),
              })
            );

            // socket.emit('login', res.data.userId)
            // socket.on("newUserResponse",console.log(data));
            user_role === "admin"
              ? navigate("/")
              : user_role === "business"
              ? navigate("/")
              : navigate("/login");
            // getCart();
          } else {
            setError(res?.data?.message || "Something went wrong");
          }
        })
        .catch((err) => {
          const status = err?.code;
          // console.log(err);
          if (status === "ERR_NETWORK") {
            setError("Something went wrong. Please try again later ");
          } else if (status === "ERR_BAD_REQUEST") {
            setError("Invalid Credentials");
          } else setError("Something went wrong. Please try again later ");
        });
    } else setError(`Please fill all the fields  `);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="card lg:card-side bg-base-100 shadow-2xl my-auto md:my-10 md:mx-auto max-sm:m-5 overflow-hidden md:max-w-[70%] mx-10 max-h-[88vh]">
        {/* <figure className=" max-h-[87vh] "> */}
        <img
          width="50%"
          src="./assets/images/Login_Signup.png"
          alt="Album"
          className="max-lg:hidden object-cover"
        />
        {/* </figure> */}

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
              to={"/"}
              className="text-neutral hover:text-neutral/70 font-semibold"
            >
              Forgot your password
            </Link>
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

export default Login;

// <div className="flex justify-center items-center h-screen md:px-20 sm:px-10 sm:py-5 md:py-10 bg-neutral100">
//   <div className="shadow-md overflow-hidden h-[100%] min-h-0 max-md:hidden">
//     <img src="./assets/images/Login_Signup.png" className="w-full" />
//   </div>
//   <div className="w-1/2 max-md:w-full sm:px-10 lg:px-16 px-8 bg-white shadow-md h-[100%] flex flex-col justify-center gap-8">
//     <form className="flex flex-col gap-6 pb-8 border-b-2 border-neutral300">
//       <h1 className="text-3xl text-primary300 font-semibold">Login</h1>
//       <div>
//         <FormField title="Email" loginHandler={loginHandler} />
//         <FormField
//           title="Password"
//           type="password"
//           loginHandler={loginHandler}
//         />
//       </div>
//       <button className="rounded-md py-3 px-6 bg-primary300 hover:bg-primary200 text-white shadow-md">
//         Login
//       </button>
//     </form>
//     <div className="flex flex-col gap-3">
//       <Link
//         to={"/"}
//         className="text-primary300 hover:text-primary200 font-semibold"
//       >
//         Forgot your password
//       </Link>
//       <Link
//         to={"/register"}
//         className="text-primary300 hover:text-primary200 font-semibold"
//       >
//         Register New User
//       </Link>
//     </div>
//   </div>
// </div>
