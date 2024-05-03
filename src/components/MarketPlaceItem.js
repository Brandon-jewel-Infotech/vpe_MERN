import React from "react";

const MarketPlaceItem = ({ product }) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img
          src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {product?.name}
          <div
            className={`badge ${
              product.availability ? "badge-secondary" : "badge-error"
            }`}
          >
            {product?.availability ? "Available" : "Out of stock"}
          </div>
        </h2>
        <div className="flex items-center">
          {Array.from({ length: product?.ratings }, (_, index) => (
            <Star key={index} fillColor="#EACA4E" />
          ))}
          {Array.from(
            { length: 5 - Math.floor(product?.ratings) },
            (_, index) => (
              <Star key={index} fillColor="#e2e8f0" />
            )
          )}
          ({product?.views} views)
        </div>
        <div className="card-actions items-center justify-between">
          <div className="text-xl">₹{product?.price}</div>
          <button className="primary-btn justify-end">Buy now</button>
        </div>
      </div>
    </div>
  );
};

const Star = ({ fillColor }) => {
  //#EACA4E for yellow
  //#e2e8f0 for grey
  return (
    <svg
      style={{
        width: "0.8rem",
        height: "0.8rem",
        fill: fillColor,
        marginRight: "0.25rem",
      }}
      viewBox="0 0 1000 1000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M972 380c9 28 2 50-20 67L725 619l87 280c11 39-18 75-54 75-12 0-23-4-33-12L499 790 273 962a58 58 0 0 1-78-12 50 50 0 0 1-8-51l86-278L46 447c-21-17-28-39-19-67 8-24 29-40 52-40h280l87-279c7-23 28-39 52-39 25 0 47 17 54 41l87 277h280c24 0 45 16 53 40z" />
    </svg>
  );
};

export default MarketPlaceItem;
