import React, { useState } from "react";
import PrimaryLayout from "../Layout/PrimaryLayout";
import { AiFillDelete } from "react-icons/ai";

const OrderRequests = () => {
  const ordersData = [
    {
      requestId: 13526,
      requestDate: "12/02/2022",
      image:
        "https://images.hindustantimes.com/img/2022/08/17/1600x900/pexels-ihsan-adityawarman-1445696_1660730475031_1660730484077_1660730484077.jpg",
      title: "Heels for women",
      variants: [
        { name: "Color", value: "Black" },
        { name: "Size", value: "M" },
      ],
      quantity: 123,
      price: 1243,
    },
    {
      requestId: 13526,
      requestDate: "12/02/2022",
      image:
        "https://images.hindustantimes.com/img/2022/08/17/1600x900/pexels-ihsan-adityawarman-1445696_1660730475031_1660730484077_1660730484077.jpg",
      title: "Heels for women",
      variants: [
        { name: "Color", value: "Black" },
        { name: "Size", value: "M" },
      ],
      quantity: 123,
      price: 1243,
    },
    {
      requestId: 13526,
      requestDate: "12/02/2022",
      image:
        "https://images.hindustantimes.com/img/2022/08/17/1600x900/pexels-ihsan-adityawarman-1445696_1660730475031_1660730484077_1660730484077.jpg",
      title: "Heels for women",
      variants: [
        { name: "Color", value: "Black" },
        { name: "Size", value: "M" },
      ],
      quantity: 123,
      price: 1243,
    },
    {
      requestId: 13526,
      requestDate: "12/02/2022",
      image:
        "https://images.hindustantimes.com/img/2022/08/17/1600x900/pexels-ihsan-adityawarman-1445696_1660730475031_1660730484077_1660730484077.jpg",
      title: "Heels for women",
      variants: [
        { name: "Color", value: "Black" },
        { name: "Size", value: "M" },
      ],
      quantity: 123,
      price: 1243,
    },
  ];
  return (
    <PrimaryLayout>
      <div className="card bg-white">
        <div className="card-body gap-5">
          <div className="flex justify-between items-center">
            <div className="text-start">
              <h2 className="text-lg font-bold ">Order Requests</h2>
              <p className="text-sm">Order {">"} Requests</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-evenly gap-10">
            {ordersData.map((order) => (
              <OrderRequestCard {...order} />
            ))}
          </div>
        </div>
      </div>
    </PrimaryLayout>
  );
};

const OrderRequestCard = ({
  image,
  requestId,
  requestDate,
  title,
  variants,
  quantity,
  price,
}) => {
  return (
    <div
      className={`card text-primary-content lg:w-[47%] shadow-xl bg-gray-50`}
    >
      <div className="card-body flex flex-col items-center w-full p-4">
        {/* {Icon ? <Icon size={30} /> : <></>} */}
        <div className="flex justify-between items-center px-4 w-full text-sm border-b">
          <div>
            <h4 className="font-semibold">Request Id</h4>
            <p>{requestId}</p>
          </div>
          <div>
            <h4 className="font-semibold">Order Request Date</h4>
            <p>{requestDate}</p>
          </div>
        </div>
        <div className="flex justify-between items-center w-full py-4 px-7 text-start gap-5">
          <img src={image} className="w-24 h-24 flex-none" />
          <div className="flex-1 h-full text-sm">
            <h3 className="text-lg font-semibold">{title}</h3>
            {variants.map((variant, i) => (
              <p key={i}>
                <span className="font-semibold">{variant.name}:</span>{" "}
                {variant.value}
              </p>
            ))}
            <p>
              <span className="font-semibold">Quantity:</span> {quantity}
            </p>
          </div>
          <p className="flex-none h-full">${price}</p>
        </div>
        <div className="flex justify-between items-center w-full px-4 border-t pt-2">
          <button className="btn btn-error text-white">Cancel</button>
          <button className="btn bg-success text-white">Accept</button>
        </div>
      </div>
    </div>
  );
};

export default OrderRequests;
