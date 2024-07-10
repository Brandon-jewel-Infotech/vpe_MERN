import React, { useEffect, useState } from "react";
import PrimaryLayout from "../../Layout/PrimaryLayout";
import { GoPlus } from "react-icons/go";
import { IoMdCash } from "react-icons/io";
import { useSelector } from "react-redux";

const Checkout = () => {
  const cart = useSelector((state) => state.cart);

  const [selectedAddress, setSelectedAddress] = useState(2);
  const [selectedMethod, setSelectedMethod] = useState(1);

  const [subTotal, setSubTotal] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shipping, setShipping] = useState(10);
  const [gst, setGst] = useState(20);

  const [orderItems, setOrderItems] = useState([
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

  const recievers = [];
  const variant = [];
  cart?.cart?.map((i) => {
    recievers.push(i.receiver);
    variant.push(i.variant_id);
    // console.log(i.variant_id)
  });

  useEffect(() => {
    setSubTotal(
      orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    );
    setTotalDiscount(
      orderItems.reduce((acc, item) => acc + item.discount, 0) /
        orderItems.length
    );

    let totalPriceSum = orderItems.reduce((acc, item) => acc + item.total, 0);

    setTotalPrice(totalPriceSum + totalPriceSum * (gst / 100) + shipping);
  }, [orderItems]);

  // const postOrderRequest = () => {
  //   // console.log(recievers);
  //   // console.log(items.images.split(","));
  //   // console.log(items[0].images.split(","));
  //   // console.log(prices ,qtys , ids,name,images,stage,variant)
  //   axios
  //     .post(
  //       `${process.env.REACT_APP_BACKEND_URL}seller/order_requests/create`,
  //       {
  //         reciever: recievers.toString(),
  //         prices: prices.toString(),
  //         prod_id: ids.toString(),
  //         qty: qtys.toString(),
  //         variant_id: variant.toString(),
  //         stage: stage.toString(),
  //       },
  //       {
  //         headers: {
  //           Authorization: `${tok}`,
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       handleClick(res.data.message);
  //       // console.log(res.data)
  //     })
  //     .catch((err) => {
  //       console.warn(err);
  //       alert("Session expired");
  //       // navigate("/logout");
  //     });
  // };

  // const handleRequests = () => {
  //   cart.map((i) => {
  //     prices.push(i.price);
  //     qtys.push(i.quantity);
  //     ids.push(i.id);
  //     name.push(i.name);
  //     images.push(i.images);
  //     stage.push(i.stage);
  //   });
  // };

  return (
    <PrimaryLayout>
      <div className="flex gap-10 max-lg:flex-col">
        <div className="card bg-white w-full h-fit flex-1">
          <div className="card-body gap-7">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-start">Checkout</h2>
            </div>
            <div>
              <div className="flex justify-between ">
                <h4 className="font-semibold text-lg text-start">
                  Billing Address
                </h4>
                <button className="secondary-btn">
                  <GoPlus size={20} /> Add New Address
                </button>
              </div>
              <div className="flex gap-5 justify-evenly flex-wrap py-4">
                {Array(6)
                  .fill({
                    title: "Address 1",
                    description: "Street no. 23, John street Faridabad Haryana",
                  })
                  .map((address, i) => (
                    <div
                      key={i}
                      className={`w-[30%] text-start checkout-card ${
                        selectedAddress === i && "active-card"
                      }`}
                      onClick={() => setSelectedAddress(i)}
                    >
                      <h5 className="font-semibold text-neutral check">
                        {address.title}
                      </h5>
                      <p className="text-black/70">{address.description}</p>
                    </div>
                  ))}
              </div>
            </div>
            <div>
              <div className="flex justify-between ">
                <h4 className="font-semibold text-lg text-start">
                  Payment Methods
                </h4>
              </div>
              <div className="flex gap-5 justify-evenly flex-wrap py-4">
                {Array(3)
                  .fill({
                    icon: IoMdCash,
                    title: "PayPal",
                  })
                  .map((method, i) => (
                    <div
                      key={i}
                      className={`bg-gray-100 shadow-md w-[25%] p-3 rounded-md checkout-card flex flex-col justify-center items-center gap-2 ${
                        selectedMethod === i && "active-card"
                      }`}
                      onClick={() => setSelectedMethod(i)}
                    >
                      <method.icon size={40} className="mt-5" />
                      <p className="text-xl font-semibold mb-5">
                        {method.title}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="card bg-white flex-none h-fit sticky top-[6rem] 2xl:w-[30%]">
          <div className="card-body">
            <div className="overflow-x-auto mt-3">
              <table className="table ">
                <thead className="bg-neutral text-white">
                  <tr>
                    <th>Order Summary</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cart?.cart?.map((item, i) => (
                    <tr key={i}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={`${process.env.REACT_APP_BACKEND_URL}/${item.images}`}
                                alt={`${item.name} image`}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{item.name}</div>
                            <div className="text-sm opacity-50">
                              <p>Quantity: {item.quantity}</p>
                              <p>Variant id: {item.variant_id}</p>
                              {/* {item?.variants?.map((variant, i) => (
                                <p key={i}>
                                  {variant.name}: {variant.value}
                                </p>
                              ))} */}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>₹{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                    <td className="text-end">₹{shipping}</td>
                  </tr>
                  <tr>
                    <th>GST</th>
                    <td className="text-end">{gst}%</td>
                  </tr>
                  <tr className="text-xl">
                    <th>Total</th>
                    <td className="text-end">₹{cart.cartTotal}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button className="primary-btn">Place Order</button>
            <button className="secondary-btn">Continue Shopping</button>
          </div>
        </div>
      </div>
    </PrimaryLayout>
  );
};

export default Checkout;
