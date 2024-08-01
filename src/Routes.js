import Cart from "./pages/Employee/Cart";
import ProductDetails from "./pages/Employee/ProductDetails";
import Requests from "./pages/Moderator/Requests";
import MarketPlace from "./pages/Employee/MarketPlace";

import MyOrderRequests from "./pages/Employee/MyOrderRequests";
import RedeemWallet from "./pages/RedeemWallet";
import Announcements from "./pages/Employee/Announcements";

export const getRoutesByRole = (auth, role, code, navigate) => {
  // Moderator Routes
  const moderatorRoutes = [{ path: "/", component: <Requests /> }];

  // Employee Routes
  const employeeRoutes = [
    { path: "/", component: <MarketPlace /> },
    { path: "/cart", component: <Cart /> },
    { path: "/products/cart", component: <Cart /> },
    { path: "/product/:id", component: <ProductDetails /> },
    { path: "/my-order-requests", component: <MyOrderRequests /> },
    { path: "/redeem-wallet", component: <RedeemWallet /> },
    { path: "/announcements", component: <Announcements /> },
    // { path: "/reward-list", component: <Rewards /> },
  ];

  if (role === "moderator") {
    return moderatorRoutes;
  } else if (role === "employee") {
    return employeeRoutes;
  }
  return [];
};
