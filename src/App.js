import { Route, Routes, useNavigate } from "react-router-dom";
// import Header from "./Layout/PrimaryLayout";
// import { Route, Routes } from "react-router-dom";/
import Login from "./pages/Login";
import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import ProductList from "./pages/Products/ProductList";
// import EmployeeList from "./pages/Employee/EmployeeList";
// import OrderRequests from "./pages/OrderRequests";
// import Checkout from "./pages/Checkout";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./redux/slice";
import { emptyCart } from "./redux/cartSlice";
import { useEffect } from "react";
// import ProductDetails from "./pages/ProductDetails";
// import AddProduct from "./pages/Products/AddProduct";
// import Cart from "./pages/Cart";
import { getRoutesByRole } from "./Routes";
// import MyOrders from "./pages/MyOrders";
// import AddEmployee from "./pages/Employee/AddEmployee";
// import MarketPlace from "./pages/MarketPlace";
// import AddVariant from "./pages/AddVariant";
// import MyOrderRequests from "./pages/MyOrderRequests";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { auth, role, code } = useSelector((state) => state.user);
  // console.log(auth, role, code);
  const userRoutes = getRoutesByRole(auth, role);
  return (
    <>
      <ToastContainer />
      {/* <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/loading" element={<Loading />} />
      
    </Routes> */}
      <Routes>
        {userRoutes.length === 0 ? (
          <>
            {/* <Route path="*" element={<Dashboard />} /> */}
            <Route path="*" element={<Logout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
          </>
        ) : (
          userRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={route.component}
              exact
              replace
            />
          ))
        )}
      </Routes>
    </>
  );
}

export default App;

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(emptyCart());
    dispatch(logout());
    navigate("/login");
  }, []);
};
