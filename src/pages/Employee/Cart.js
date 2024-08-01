import React, { useEffect, useState } from "react";
import PrimaryLayout from "../../Layout/PrimaryLayout";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import {
//   decreaseQuantity,
//   decreaseQuantityby10,
//   increaseQuantity,
//   increaseQuantityby10,
//   removeItem,
// } from "../../redux/cartSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { logout } from "../../redux/slice";
import Loading from "../../components/Loading";
import FallbackText from "../../components/FallbackText";
import { IoCartOutline } from "react-icons/io5";
import getRewardCoins from "../../utils/RewardCoins";

const Cart = () => {
  const dispatch = useDispatch();
  const { tok } = useSelector((data) => data.user);
  const [cartData, setCartData] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [loadingData, setLoadingData] = useState(false);
  const [totalRewardCoins, setTotalRewardCoins] = useState(0);

  const getCart = async () => {
    setLoadingData(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/cart`,

        {
          headers: {
            Authorization: tok,
          },
        }
      );

      setCartData(data);
    } catch (error) {
      if (error?.response?.status === 401) {
        toast.dismiss();
        toast.error("Session Expired");
        dispatch(logout());
      }
    }
    setLoadingData(false);
  };

  const updateItemQuantity = async (cartItem, newQuantity) => {
    try {
      const variantQuantity = cartItem?.variant?.qty;
      const productQuantity = cartItem?.product?.availability;

      if (
        (!cartItem?.variant?.id && newQuantity > productQuantity) ||
        newQuantity > variantQuantity
      ) {
        return;
      }

      if (newQuantity <= 0) {
        deleteItem(cartItem?.id);
      }

      const res = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/cart/${cartItem?.id}`,
        { qty: newQuantity },
        { headers: { Authorization: tok } }
      );

      if (res?.status === 200) {
        setCartData((currItems) => {
          return currItems?.map((item) => {
            if (item.id === cartItem?.id) {
              return {
                ...item,
                qty: res?.data?.cartItem?.qty,
                total: res?.data?.cartItem?.total,
              };
            }
            return item;
          });
        });
      }
    } catch (e) {}
  };

  const deleteItem = async (id) => {
    try {
      const res = await toast.promise(
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/cart/${id}`, {
          headers: {
            Authorization: tok,
          },
        }),
        {
          pending: "Deleting Cart Item...",
          success: "Cart Item deleted Successfully!",
          error: {
            render({ data }) {
              if (data?.response?.status === 401) {
                dispatch(logout());
                return "Session Expired";
              } else {
                return (
                  data?.response?.data?.error || "Failed to delete Cart Item."
                );
              }
            },
          },
        }
      );
      if (res?.status === 200) {
        setCartData((currItems) => {
          return currItems?.filter((item) => item.id !== id);
        });
      }
    } catch (e) {}
  };

  const placeOrderHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await toast.promise(
        axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/order_requests/create`,
          {},
          { headers: { Authorization: tok } }
        ),
        {
          pending: "Placing Order...",
          success: "Order Placed Successfully!",
          error: {
            render({ data }) {
              if (data?.response?.status === 401) {
                dispatch(logout());
                return "Session Expired";
              } else {
                return data?.response?.data?.error || "Failed to Place Order.";
              }
            },
          },
        }
      );
      if (res?.status === 201) {
        setCartData([]);
      }
    } catch (e) {}
  };

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    const calculatedSubTotal = cartData?.reduce((acc, item) => {
      return (
        acc +
        (item?.variant?.price_b2c !== undefined
          ? item?.variant?.price_b2c
          : item?.product?.price_b2c) *
          item.qty
      );
    }, 0);
    setSubTotal(calculatedSubTotal);
    const cartTotal = cartData?.reduce((acc, item) => acc + item?.total, 0);
    setCartTotal(cartTotal);
    const calculatedTotalRewardCoins = cartData?.reduce((acc, item) => {
      return (
        acc +
        getRewardCoins(item?.product?.employee_reward, item?.qty, item?.total)
      );
    }, 0);
    setTotalRewardCoins(calculatedTotalRewardCoins);
  }, [cartData]);

  return (
    <PrimaryLayout>
      <div className="flex flex-col mb-6">
        <h2 className="text-xl font-bold text-start">Cart</h2>
      </div>
      {loadingData && (
        <div className="w-40 h-40 mx-auto">
          <Loading />
        </div>
      )}
      {!loadingData &&
        (cartData?.length ? (
          <div className="flex sm:gap-10 max-lg:flex-col max-md:pb-20">
            <div className="card bg-white flex-1 lg:w-[60%] xl:w-[70%]">
              <div className="card-body p-0 py-2">
                <div className="overflow-x-auto">
                  <table className="table ">
                    <thead className="bg-neutral text-center text-white">
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Sub total</th>
                        <th>Reward Coins</th>
                        <th>Total</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartData?.map((cartItem, i) => {
                        const itemPrice =
                          (cartItem?.variant?.price_b2c !== undefined
                            ? cartItem?.variant?.price_b2c
                            : cartItem?.product?.price_b2c) * cartItem.qty;

                        const rewardedCoins = getRewardCoins(
                          cartItem?.product?.employee_reward,
                          cartItem?.qty,
                          cartItem?.total
                        );

                        return (
                          <tr key={i}>
                            <td>
                              <div className="flex items-center gap-3">
                                <div className="avatar">
                                  <div className="mask mask-squircle w-12 h-12">
                                    <img
                                      src={`${
                                        process.env.REACT_APP_BACKEND_URL
                                      }${
                                        (cartItem?.variant?.images?.length &&
                                          cartItem?.variant?.images[0]?.url) ||
                                        (cartItem?.product?.images?.length &&
                                          cartItem?.product?.images[0]?.url)
                                      }`}
                                      alt="Avatar Tailwind CSS Component"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <div className="font-bold">
                                    {cartItem?.product?.name}
                                    {cartItem?.variant?.name &&
                                      `- ${cartItem?.variant?.name}`}
                                  </div>
                                  <div className="text-sm opacity-50">
                                    {cartItem?.variants?.map((variant, i) => (
                                      <p key={i}>
                                        {variant.name}: {variant.value}
                                      </p>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              ₹{" "}
                              {cartItem?.variant?.price_b2c ||
                                cartItem?.product?.price_b2c}
                            </td>
                            <td>₹ {itemPrice}</td>
                            <td>{rewardedCoins}</td>
                            <td>₹{cartItem.total}</td>
                            <td className="flex justify-center">
                              <div className="flex justify-center w-[50%]">
                                <button
                                  className="p-2 border"
                                  onClick={() =>
                                    updateItemQuantity(
                                      cartItem,
                                      cartItem.qty - 10
                                    )
                                  }
                                >
                                  -10
                                </button>
                                <button
                                  className="p-2 border"
                                  onClick={() =>
                                    updateItemQuantity(
                                      cartItem,
                                      cartItem.qty - 1
                                    )
                                  }
                                >
                                  -
                                </button>
                                <p className="text-center pt-2 mx-4">
                                  {cartItem.qty}
                                </p>
                                <button
                                  className="p-2 border"
                                  onClick={() =>
                                    updateItemQuantity(
                                      cartItem,
                                      cartItem.qty + 1
                                    )
                                  }
                                >
                                  +
                                </button>
                                <button
                                  className="p-2 border"
                                  onClick={() =>
                                    updateItemQuantity(
                                      cartItem,
                                      cartItem.qty + 10
                                    )
                                  }
                                >
                                  +10
                                </button>
                                <button
                                  className="text-error ms-2"
                                  onClick={() => {
                                    deleteItem(cartItem.id);
                                  }}
                                >
                                  <AiFillDelete size={20} />
                                </button>
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
            <div className="card bg-base-100 flex-none h-fit sticky top-[6rem] lg:w-[40%] xl:w-[30%]">
              <div className="card-body">
                <div className="overflow-x-auto mt-3">
                  <table className="table ">
                    <thead className="bg-neutral text-center text-white">
                      <tr>
                        <th>Product Totals</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>Sub Total</th>
                        <td className="text-end">₹{subTotal}</td>
                      </tr>
                      <tr>
                        <th>Total Reward Coins</th>
                        <td className="text-end">{totalRewardCoins}</td>
                      </tr>
                      {/* <tr>
                    <th>Shipping</th>
                    <td className="text-end">{shipping}</td>
                  </tr>
                  <tr>
                    <th>GST</th>
                    <td className="text-end">{gst}</td>
                  </tr> */}
                      <tr className="text-xl">
                        <th>Total</th>
                        <td className="text-end">₹{cartTotal}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <button className="primary-btn" onClick={placeOrderHandler}>
                  Place Order
                </button>
                <Link className="btn btn-accent" to={"/employee/shop"}>
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <FallbackText IconRef={IoCartOutline} message={"No Item in Cart"} />
        ))}
    </PrimaryLayout>
  );
};

export default Cart;
