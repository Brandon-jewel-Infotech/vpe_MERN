import React from "react";
import { Link } from "react-router-dom";
import { Autoplay, Navigation, Thumbs } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";

const MarketPlaceItem = ({ product }) => {
  return (
    <div className="card w-[31%] bg-base-100 shadow-md max-lg:w-[47%] max-sm:w-full">
      <div className="p-4 rounded-md overflow-hidden h-56">
        <Swiper
          autoplay={{ delay: (product.id % 4) * 1000 + 2000 }}
          modules={[Thumbs, Autoplay]}
          className="h-full "
        >
          {product?.images?.map((image) => (
            <SwiperSlide key={image?.id}>
              <div
                className="h-full bg-no-repeat bg-base-100 w-full bg-center bg-contain"
                style={{
                  backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}${image?.url})`,
                }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="card-body">
        <div className="flex justify-between items-center">
          <h2 className="card-title">{product?.name}</h2>
          <div
            className={`badge ${
              product?.availability && product?.instock
                ? "badge-secondary"
                : "badge-error text-white"
            }`}
          >
            {product?.availability && product?.instock
              ? "Available"
              : "Out of stock"}
          </div>
        </div>
        {/* <div className="flex items-center">
          {Array.from({ length: product?.ratings }, (_, index) => (
            <Star key={index} fillColor="#EACA4E" />
            ))}
            {Array.from(
              { length: 5 - Math.floor(product?.ratings) },
              (_, index) => (
                <Star key={index} fillColor="#e2e8f0" />
                )
                )}
                </div> */}
        <p className="text-start">{product?.description}</p>
        <div className="card-actions items-end justify-between">
          <div className="text-xl">₹{product?.price_b2b}</div>
          <Link
            className="btn btn-info text-white justify-end"
            to={`/product/${product?.id}`}
          >
            View
          </Link>
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
