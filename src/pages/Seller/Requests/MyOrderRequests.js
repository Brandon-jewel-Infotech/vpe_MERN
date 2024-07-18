import React, { useEffect, useState } from "react";
import PrimaryLayout from "../../../Layout/PrimaryLayout";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../../../redux/slice";
import FallbackText from "../../../components/FallbackText";
import { TiDocumentText } from "react-icons/ti";
import Loading from "../../../components/Loading";

const MyOrderRequests = () => {
  const dispatch = useDispatch();
  const { tok } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState({});
  const [loadingData, setLoadingData] = useState(false);

  //fetch the orders
  const getMyOrderRequests = async () => {
    try {
      setLoadingData(true);
      const url = `${process.env.REACT_APP_BACKEND_URL}/seller/order_requests/myorders`;

      const { data } = await axios.post(
        url,
        { type: "created" },
        {
          headers: {
            Authorization: tok,
          },
        }
      );

      setOrders(data);
    } catch (error) {
      if (error?.response?.status === 401) {
        toast.dismiss();
        toast.error("Session Expired");
        dispatch(logout());
      }
    }
    setLoadingData(false);
  };

  useEffect(() => {
    getMyOrderRequests();
  }, []);
  return (
    <>
      <OrderDetailModal
        orderDetails={selectedOrder}
        setOrders={setOrders}
        setSelectedOrder={setSelectedOrder}
      />
      <PrimaryLayout>
        <div className="text-start">
          <h2 className="text-lg font-bold ">My Order Requests</h2>
          <p className="text-sm">Requests {">"} My Order Requests</p>
        </div>
        <div className="card bg-white flex-1 w-full">
          <div className="card-body p-0 py-2">
            {loadingData && (
              <div className="w-40 h-40 mx-auto">
                <Loading />
              </div>
            )}
            {!loadingData &&
              (orders?.length ? (
                <div className="overflow-x-auto">
                  <table className="table ">
                    <thead className="bg-neutral text-center text-white">
                      <tr>
                        <th>Order Id</th>
                        <th>Customer Name</th>
                        <th>Customer Type</th>
                        <th>Date</th>
                        <th>Order Total</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders?.map((order, i) => {
                        const date = new Date(order?.createdAt);

                        const day = date.getUTCDate();
                        const month = date.getUTCMonth() + 1;
                        const year = date.getUTCFullYear();
                        order.formattedDate = `${day}/${month}/${year}`;

                        order.orderTotal = order?.orderItems?.reduce(
                          (acc, item) => acc + item.price,
                          0
                        );
                        return (
                          <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order?.createdBy?.name}</td>
                            <td>{order?.createdBy?.role}</td>
                            <td>{order.formattedDate}</td>
                            <td>₹ {order?.orderTotal}</td>
                            <td>
                              <button
                                className="primary-btn"
                                onClick={() => {
                                  document
                                    .getElementById("order_detail_modal")
                                    .showModal();
                                  setSelectedOrder(order);
                                }}
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <FallbackText
                  IconRef={TiDocumentText}
                  message={"No Order Request found"}
                />
              ))}
          </div>
        </div>
      </PrimaryLayout>
    </>
  );
};

export const OrderDetailModal = ({
  orderDetails,
  setOrders,
  setSelectedOrder,
}) => {
  const dispatch = useDispatch();
  const { tok } = useSelector((state) => state.user);

  const handleUpdate = async (id, stage) => {
    try {
      const res = await toast.promise(
        axios.patch(
          `${process.env.REACT_APP_BACKEND_URL}/seller/order_requests/${id}`,
          { stage },
          {
            headers: {
              Authorization: tok,
            },
          }
        ),
        {
          pending: "Updating Order Item...",
          success: "Order Item Updated Successfully!",
          error: {
            render({ data }) {
              if (data?.response?.status === 401) {
                dispatch(logout());
                return "Session Expired";
              } else {
                return (
                  data?.response?.data?.error || "Failed to Update Order Item."
                );
              }
            },
          },
        }
      );
      if (res?.status === 200) {
        setOrders((currOrders) => {
          const orderIndex = currOrders.findIndex(
            (order) => order.id === orderDetails.id
          );

          currOrders[orderIndex].orderItems = currOrders[
            orderIndex
          ]?.orderItems?.map((order, index) => {
            if (order.id === id) {
              const updatedOrder = { ...order, stage: res?.data?.stage };
              setSelectedOrder((currOrder) => {
                const orderItems = currOrder.orderItems;
                orderItems[index] = updatedOrder;
                return { ...currOrder, orderIndex };
              });
              return updatedOrder;
            }
            return order;
          });
          return currOrders;
        });
      }
    } catch (e) {}
  };

  return (
    <dialog id="order_detail_modal" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <div className="flex justify-between items-center font-semibold text-lg">
          <h3 className=" my-2">
            Order No: <span className="font-normal">{orderDetails?.id}</span>
          </h3>
          <p className="my-2">
            Date:{" "}
            <span className="font-normal">{orderDetails?.formattedDate}</span>
          </p>
        </div>
        <div className="font-semibold">
          <h2 className=" my-2">
            Customer Name:{" "}
            <span className="font-normal">{orderDetails?.createdBy?.name}</span>
          </h2>
          <h3 className="my-2">
            Customer Type:{" "}
            <span className="font-normal">{orderDetails?.createdBy?.role}</span>
          </h3>
          <div>
            <h3 className="my-2 font-semibold">Order Items: </h3>
            <div className="overflow-x-auto max-h-50vh overflow-auto">
              <table className="table">
                <thead className="bg-neutral text-center text-white">
                  <tr>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                    <th>Reward Coins</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="font-normal">
                  {orderDetails?.orderItems?.map((item, i) => {
                    return (
                      <tr key={item?.id}>
                        <td>
                          {item?.product} {item.variant && `- ${item?.variant}`}
                        </td>
                        <td>{item?.qty}</td>
                        <td>₹ {item?.price}</td>
                        <td>{item?.rewarded_coins}</td>
                        <td>
                          {item?.stage === 1
                            ? "Pending"
                            : item?.stage === 2
                            ? "Processed"
                            : item?.stage === 3
                            ? "Partially Accepted"
                            : item?.stage === 4
                            ? "Rejected"
                            : item?.stage === 5
                            ? "Cancelled By User"
                            : "Order Completed"}
                        </td>
                        <td>
                          <div className="flex items-center justify-evenly">
                            {(item.stage === 1 || item.stage === 3) && (
                              <button
                                className="secondary-btn"
                                onClick={() => handleUpdate(item.id, 5)}
                              >
                                Cancel
                              </button>
                            )}
                            {item.stage === 3 && (
                              <button
                                className="primary-btn"
                                onClick={() => handleUpdate(item.id, 2)}
                              >
                                Accept
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <h3 className="text-lg my-2 font-semibold">
              Order Total:{" "}
              <span className="font-normal">₹ {orderDetails?.orderTotal}</span>
            </h3>
            <h3 className="text-lg my-2 font-semibold">
              Total Reward Coins:{" "}
              <span className="font-normal">
                {orderDetails?.orderItems?.reduce(
                  (acc, item) => acc + item.rewarded_coins,
                  0
                )}
              </span>
            </h3>
          </div>

          <div className="flex gap-4">
            <form method="dialog">
              <button className=" btn secondary-btn">Close</button>
            </form>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default MyOrderRequests;
