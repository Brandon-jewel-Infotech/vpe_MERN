// import { Home } from "./pages/Home";
// import { Orders } from "./pages/Orders";
// import { Products } from "./pages/Products";
// import { AddUsers } from "./pages/AddUsers";
// import { AddAssociates } from "./pages/AddAssociates";
// import { AddProducts } from "./pages/AddProducts";
// import { EditProducts } from "./pages/EditProducts";
// import { AdminRoute, PrivateRoute } from "./components/PrivateRoutes";
// import { EditUsers } from "./pages/EditUsers";

// import { Requests } from "./pages/requests/Requests";
// import { RequestView } from "./pages/requests/RequestView";
// import { QueryRequestView } from "./pages/requests/QueryRequestView";
// import { ConnectionsView } from "./pages/ConnectionsView";
// import { Analytics } from "./pages/Analytics";
// import { Categories } from "./pages/categories/Categories";
// import { CompanyRequestView } from "./pages/requests/CompanyRequestView";

// import { SellerHome } from "./sellers/SellerHome";

// import { Register } from "./pages/Register";
// import { SellerProducts } from "./sellers/SellerProducts";
// import { SellerRequest } from "./sellers/SellerRequest";
// import { SellerOrders } from "./sellers/SellerOrders";
// import { SellerAnalytics } from "./sellers/SellerAnalytics";
// import { SellerCategories } from "./sellers/SellerCategories";
// import { SellerConnectionsView } from "./sellers/seller_components/SellerConnectionView";
// import { AddEmployee } from "./sellers/pages/AddEmployee";
// import { SellerQueryRequestView } from "./sellers/pages/SellerQueryRequestView";
// import { SellerProductView } from "./sellers/pages/SellerProductView";
// import { AddVariant } from "./pages/AddVariant";
// import { Navigate } from "react-router-dom";
// import { SellerVariantView } from "./sellers/pages/SellerVariantView";
// import socketIO from 'socket.io-client'
// import Cart from "./sellers/pages/Cart";
// import OrderRequest from "./sellers/pages/OrderRequest";
// import MyOrders from "./sellers/MyOrders";
// import MyOrder from "./sellers/Myorder";
// import MyorderRequest from "./sellers/seller_components/MyorderRequest";
// import AddRewards from "./pages/AddRewards";
// import Redeem from "./sellers/pages/Redeem";
import Cart from "./pages/Seller/Cart";
import Dashboard from "./pages/Admin/Dashboard";
import Login from "./pages/Login";
import OrderRequests from "./pages/Seller/Requests/OrderRequests";
import AddProduct from "./pages/Seller/Products/AddProduct";
import ProductList from "./pages/Seller/Products/ProductList";
import ProductDetails from "./pages/Seller/Products/ProductDetails";
import Categories from "./pages/Admin/Categories";
import Companies from "./pages/Admin/Companies";
import Users from "./pages/Admin/Users";
import Requests from "./pages/Admin/Requests";
import Connections from "./pages/Admin/Connections";
import AddVariant from "./pages/Seller/Products/AddVariant";
import EditProduct from "./pages/Seller/Products/EditProduct";
import MarketPlace from "./pages/Seller/MarketPlace";
import EmployeeList from "./pages/Seller/Employee/EmployeeList";
import AddEmployee from "./pages/AddEmployee";

import SellerDashboard from "./pages/Seller/Dashboard";
import MyOrderRequests from "./pages/Seller/Requests/MyOrderRequests";
import RedeemWallet from "./pages/RedeemWallet";
import AdminRequests from "./pages/Seller/Requests/AdminRequests";
import Rewards from "./pages/Seller/Rewards/Rewards";
import Announcements from "./pages/Seller/Announcements";
import ForgotPassword from "./pages/ForgotPassword";

export const getRoutesByRole = (auth, role, code, navigate) => {
  // Admin Routes
  const adminRoutes = [
    { path: "/", component: <Dashboard /> },
    { path: "/login", component: <Login /> },
    { path: "/users", component: <Users /> },
    { path: "/requests", component: <Requests /> },
    { path: "/connections", component: <Connections /> },
    { path: "/categories", component: <Categories /> },
    { path: "/companies", component: <Companies /> },
    { path: "/add-moderator", component: <AddEmployee role={role} /> },
    // { path: "/orders", component: <Orders  /> },
    //   { path: "/users/edit/:id", component: <EditUsers /> },
    // { path: "/users/add", component: <AddUsers /> },
    //   { path: "/users/business", component: <AddAssociates /> },
    //   { path: "/requests/:id", component: <RequestView /> },
    // { path: "/requests/q/:id", component: <QueryReq@@@uestView /> },
    //   { path: "/requests/c/:id", component: <CompanyRequestView /> },

    //   { path: "/analytics", component: <Analytics /> },
    //   { path: "/requests/c/:id", component: <CompanyRequestView /> },
    // { path: "*", component: <Navigate to="/logout" replace /> },
    // ...other admin routes
  ];

  // Business Routes
  const businessRoutes = [
    { path: "/", component: <SellerDashboard /> },
    { path: "/add-product", component: <AddProduct /> },
    { path: "/products", component: <ProductList /> },
    { path: "/products/edit/:id", component: <EditProduct /> },
    { path: "/products/variant/:id", component: <AddVariant /> },
    { path: "/products/cart", component: <Cart /> },
    { path: "/marketplace", component: <MarketPlace /> },
    { path: "/product/:id", component: <ProductDetails /> },
    { path: "/employee-list", component: <EmployeeList /> },
    { path: "/add-employee", component: <AddEmployee role={role} /> },
    { path: "/my-order-requests", component: <MyOrderRequests /> }, //my  order requests
    { path: "/order-requests", component: <OrderRequests /> }, //my orders
    { path: "/admin-requests", component: <AdminRequests /> }, //my orders
    { path: "/redeem-wallet", component: <RedeemWallet /> },
    { path: "/reward-list", component: <Rewards /> },
    { path: "/cart", component: <Cart /> },
    { path: "/announcements", component: <Announcements /> },
  ];

  // console.log(`Auth : ${auth} ; Role : ${role}`);
  if (role === "admin") {
    return adminRoutes;
  } else if (role === "business") {
    return businessRoutes;
  }
  return [];
};
