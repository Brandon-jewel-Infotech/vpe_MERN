import React, { useEffect, useState } from "react";
import PrimaryLayout from "../Layout/PrimaryLayout";
import OrderRequestCard from "../components/OrderRequestCard";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const MyOrderRequests = () => {
  const { tok } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  //fetch the orders
  const getMyOrderRequests = async () => {
    try {
      //   setloading(true);
      const url = `${process.env.REACT_APP_BACKEND_URL}seller/order_requests/myorders`;

      // console.log(`url ${url} `);
      const { data } = await axios.post(
        url,
        {},
        {
          headers: {
            Authorization: `${tok}`,
          },
        }
      );
      console.log(data);
      setOrders(data);
      //   if (res?.data?.message === "Session expired") {
      //     dispatch(logout());
      //   }
      //   setloading(false);
      //   setusData(res.data);
      //   console.log(res.data);
    } catch (error) {
      console.warn(error);
      // navigate("/logout");
    }
  };
  useEffect(() => {
    getMyOrderRequests();
  }, []);
  return (
    <PrimaryLayout>
      <div className="card bg-white">
        <div className="card-body gap-5">
          <div className="flex justify-between items-center">
            <div className="text-start">
              <h2 className="text-lg font-bold ">My Order Requests</h2>
              <p className="text-sm">Order {">"} My Order Requests</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-evenly gap-10 overflow-hidden">
            {orders.map((order) => (
              <OrderRequestCard {...order} />
            ))}
          </div>
        </div>
      </div>
    </PrimaryLayout>
  );
};

export default MyOrderRequests;
