import React, { useEffect, useState } from "react";
import PrimaryLayout from "../Layout/PrimaryLayout";
import { GoPlus } from "react-icons/go";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  decreaseQuantityby10,
  increaseQuantity,
  increaseQuantityby10,
  removeItem,
} from "../redux/cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [subTotal, setSubTotal] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shipping, setShipping] = useState(10);
  const [gst, setGst] = useState(20);
  const [cartData, setCartData] = useState([
    {
      name: "Heels for women",
      image:
        "https://images.hindustantimes.com/img/2022/08/17/1600x900/pexels-ihsan-adityawarman-1445696_1660730475031_1660730484077_1660730484077.jpg",
      quantity: 123,
      variants: [
        { name: "Color", value: "Black" },
        { name: "Size", value: "M" },
      ],
      discount: 20,
      price: 2000,
      total: 196800,
    },
    {
      name: "Heels for women",
      image:
        "https://images.hindustantimes.com/img/2022/08/17/1600x900/pexels-ihsan-adityawarman-1445696_1660730475031_1660730484077_1660730484077.jpg",
      quantity: 123,
      variants: [
        { name: "Color", value: "Black" },
        { name: "Size", value: "M" },
      ],
      discount: 20,
      price: 2000,
      total: 196800,
    },
    {
      name: "Heels for women",
      image:
        "https://images.hindustantimes.com/img/2022/08/17/1600x900/pexels-ihsan-adityawarman-1445696_1660730475031_1660730484077_1660730484077.jpg",
      quantity: 123,
      variants: [
        { name: "Color", value: "Black" },
        { name: "Size", value: "M" },
      ],
      discount: 20,
      price: 2000,
      total: 196800,
    },
    {
      name: "Heels for women",
      image:
        "https://images.hindustantimes.com/img/2022/08/17/1600x900/pexels-ihsan-adityawarman-1445696_1660730475031_1660730484077_1660730484077.jpg",
      quantity: 123,
      variants: [
        { name: "Color", value: "Black" },
        { name: "Size", value: "M" },
      ],
      discount: 20,
      price: 2000,
      total: 196800,
    },
    {
      name: "Heels for women",
      image:
        "https://images.hindustantimes.com/img/2022/08/17/1600x900/pexels-ihsan-adityawarman-1445696_1660730475031_1660730484077_1660730484077.jpg",
      quantity: 123,
      variants: [
        { name: "Color", value: "Black" },
        { name: "Size", value: "M" },
      ],
      discount: 20,
      price: 2000,
      total: 196800,
    },
  ]);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   setSubTotal(
  //     cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
  //   );
  //   setTotalDiscount(
  //     cart.reduce((acc, item) => acc + item.discount, 0) / cart.length
  //   );

  //   let totalPriceSum = cart.reduce((acc, item) => acc + item.total, 0);

  //   setTotalPrice(totalPriceSum + totalPriceSum * (gst / 100) + shipping);
  // }, [cart]);

  const removeCart = (indexToRemove) => {
    setCartData((prevData) => {
      const updatedData = [...prevData];
      updatedData.splice(indexToRemove, 1);
      return updatedData;
    });
  };

  const quantityMngby10 = (data) => {
    if (data.quantity <= 10) {
      dispatch(removeItem(data));
    } else {
      dispatch(decreaseQuantityby10(data));
    }
  };

  const quantityMngby1 = (data) => {
    if (data.quantity <= 1) {
      dispatch(removeItem(data));
    } else {
      dispatch(decreaseQuantity(data));
    }
  };

  return (
    <PrimaryLayout>
      <div className="ml-8">
        <h2 className="text-xl font-bold text-start ">Add Product Details</h2>
      </div>
      <div className="flex gap-10 max-lg:flex-col">
        <div className="card bg-white w-full flex-1">
          <div className="card-body">
            <div className="overflow-x-auto mt-3">
              <table className="table ">
                <thead className="bg-neutral text-white">
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Total</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cart?.cart?.map((cartItem, i) => (
                    <tr key={i}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={`${process.env.REACT_APP_BACKEND_URL}${cartItem.images}`}
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{cartItem.name}</div>
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
                      <td>{cartItem.price}</td>
                      <td>{cartItem.quantity}</td>
                      <td>₹{cartItem.total}</td>
                      <td className="flex justify-center">
                        <div className="flex justify-center w-[50%]">
                          <button
                            className="p-2 border"
                            onClick={() => {
                              quantityMngby10(cartItem);
                            }}
                          >
                            -10
                          </button>
                          <button
                            className="p-2 border"
                            onClick={() => {
                              quantityMngby1(cartItem);
                            }}
                          >
                            -
                          </button>
                          <p className="text-center pt-2 mx-4">
                            {cartItem.quantity}
                          </p>
                          <button
                            className="p-2 border"
                            onClick={() => {
                              dispatch(increaseQuantity(cartItem));
                            }}
                          >
                            +
                          </button>
                          <button
                            className="p-2 border"
                            onClick={() => {
                              dispatch(increaseQuantityby10(cartItem));
                            }}
                          >
                            +10
                          </button>
                          <button
                            className="text-error ms-2"
                            onClick={() => {
                              removeCart(i);
                            }}
                          >
                            <AiFillDelete size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="card bg-white flex-none h-fit sticky top-[6rem] lg:w-[30%]">
          <div className="card-body">
            <div className="overflow-x-auto mt-3">
              <table className="table ">
                <thead className="bg-neutral text-white">
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
                    <th>Discount</th>
                    <td className="text-end">{totalDiscount}%</td>
                  </tr>
                  <tr>
                    <th>Shipping</th>
                    <td className="text-end">{shipping}</td>
                  </tr>
                  <tr>
                    <th>GST</th>
                    <td className="text-end">{gst}</td>
                  </tr>
                  <tr className="text-xl">
                    <th>Total</th>
                    <td className="text-end">₹{cart.cartTotal}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Link to={"/checkout"} className="primary-btn">
              Checkout
            </Link>
            <button className="btn btn-accent ">Continue Shopping</button>
          </div>
        </div>
      </div>
    </PrimaryLayout>
  );
};

export default Cart;
