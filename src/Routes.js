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
import { Navigate } from "react-router-dom";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import OrderRequests from "./pages/OrderRequests";
import AddProduct from "./pages/Products/AddProduct";
import ProductList from "./pages/Products/ProductList";

export const getRoutesByRole = (auth, role, code, navigate) => {
  // Admin Routes
  const adminRoutes = [
    { path: "/", component: <Dashboard /> },
    { path: "/login", component: <Login /> },
    { path: "*", component: <Navigate to="/logout" replace /> },
    { path: "/users", component: <Dashboard /> },
    //   { path: "/orders", component: <Orders  /> },
      { path: "/products", component: <ProductList /> },
    //   { path: "/users/edit/:id", component: <EditUsers /> },
    { path: "/products/edit/:id", component: <AddProduct /> },

    // { path: "/users/add", component: <AddUsers /> },
    //   { path: "/users/business", component: <AddAssociates /> },
    { path: "/products/add", component: <AddProduct /> },
    //   { path: "/requests", component: <Requests /> },
    //   { path: "/requests/:id", component: <RequestView /> },
    //   { path: "/requests/q/:id", component: <QueryRequestView /> },
    //   { path: "/requests/c/:id", component: <CompanyRequestView /> },

    //   { path: "/connections/:code", component: <ConnectionsView /> },
    //   { path: "/analytics", component: <Analytics /> },
    //   { path: "/categories", component: <Categories /> },
    //   { path: "/requests/c/:id", component: <CompanyRequestView /> },
    // ...other admin routes
  ];

  // Business Routes
  const businessRoutes = [
    { path: "/", component: <Dashboard /> },
    { path: "*", component: <Navigate to="/logout" replace /> },
    //   { path: "/seller/home", component: <SellerHome /> },
    //   { path: "/seller/products", component: <SellerProducts /> },
    //   { path: "/seller/products/rewards", component: <AddRewards/> },
    { path: "/seller/products/cart", component: <Cart /> },
    //   { path: "/seller/request", component: <SellerRequest /> },
    // { path: "/seller/myorders", component: <MyOrder /> }, //my orders
    //   { path: "/seller/redeem", component: <Redeem/> },

    //   { path: "/seller/requests/q/:id", component: <SellerQueryRequestView /> },

    //   { path: "/seller/analytics", component: <SellerAnalytics /> },
    // { path: "/seller/orders", component: <SellerOrders /> }, //manage orders
    { path: "/seller/myorder_requests", component: <OrderRequests /> }, //my  order requests
    //   { path: "/seller/orders/requests/:id", component: <OrderRequest/> },
    //   { path: "/seller/myorders/requests/:id", component: <MyorderRequest/> },
    //   { path: "/seller/shop", component: <SellerCategories /> },
    //   { path: "/seller/add/employee", component: <AddUsers /> },
    // { path: "/seller/connections", component: <SellerConnectionsView /> },

    //   { path: "/seller/products/new", component: <AddProducts /> },
    //   { path: "/seller/products/:id", component: <SellerProductView /> },
    //   { path: "/seller/products/:id/:variantid", component: <SellerVariantView /> },
    //   { path: "/seller/products/edit/:id", component: <EditProducts /> },
    //   { path: "/seller/products/variant/:id", component: <AddVariant /> },
    //   { path: `/seller/connections`, component: <SellerConnectionsView /> },
    // {path:"/seller/shop",component: <SellerCategories/> },
    // {path:"/seller/shop",component: <SellerCategories/> },
    // {path:"/seller/shop",component: <SellerCategories/> },

    // ...other business routes
  ];

  // console.log(`Auth : ${auth} ; Role : ${role}`);
  if (role === "admin") {
    
    return adminRoutes;
  } else if (role === "business") {
    return businessRoutes;
  }
  return [];
};
