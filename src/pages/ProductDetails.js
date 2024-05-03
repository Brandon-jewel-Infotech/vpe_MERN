import React, { useEffect, useState } from "react";
import PrimaryLayout from "../Layout/PrimaryLayout";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import { Navigation, Thumbs, Autoplay } from "swiper/modules";
import { FaStar } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import axios from "axios";
import { useSelector } from "react-redux";

const ProductDetails = () => {
  const { productId } = useParams();
  const { tok } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState([]);
  const [variantData, setVariantData] = useState([0]);
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState();
  const [image, setImage] = useState();
  const [allImages, setAllImages] = useState([]);
  const [company, setCompany] = useState();
  const [description, setDescription] = useState();
  const [name, setName] = useState();
  const [rewards, setRewards] = useState([]);
  const [status, setStatus] = useState();
  const [coins, setCoins] = useState([]);
  const [conditions, setConditions] = useState([]);

  const [thumbsSwiper, setThumbsSwiper] = useState();
  const [product, setProduct] = useState({
    title: "Power Bank",
    description:
      "This is a good product. This is a good product.This is a good product.",
    price: 200000,
    stockAvailablity: true,
    variants: [
      { name: "Color", value: "Black" },
      { name: "Size", value: "M" },
    ],
    images: [
      "https://m.media-amazon.com/images/I/31dxqKcCvSL._AC_UF1000,1000_QL80_.jpg",
      "https://www.portronics.com/cdn/shop/products/1_656a6e07-209b-4540-8b23-8928a74e6d98.jpg?v=1647441961",
      "https://m.media-amazon.com/images/I/71GfLIrtFUL._AC_UF1000,1000_QL80_.jpg",
      "https://www.reliancedigital.in/medias/Reconnect-RAPBB1008-Power-Bank-491392272-i-1-1200Wx1200H-300Wx300H?context=bWFzdGVyfGltYWdlc3w1Mzk1fGltYWdlL2pwZWd8aW1hZ2VzL2hlNC9oN2UvOTA5NTkzNjAxNjQxNC5qcGd8MjZhYTAyODlhNDFiNjUwMjk0NTc1ODFiZWU1ZDNlOTkyYjc3YjFhNGU5MzMxODllMTJiYzc3M2MzMThlNjQwYQ",
      "https://www.ultraprolink.com/cdn/shop/products/heroUM1107.jpg?v=1673610734",
      "https://m.media-amazon.com/images/I/31dxqKcCvSL._AC_UF1000,1000_QL80_.jpg",
    ],
    rating: 4.2,
    reviews: [{ reviwer: "Vishwas Sharma" }, { reviewer: "Vijay" }],
  });

  const getData = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}seller/all`,
        { id: productId },
        {
          headers: {
            Authorization: `${tok}`,
          },
        }
      );
      setPrice(data[0][0].price_b2b);
      setCompany(data[0][0].company);
      setDescription(data[0][0].description);
      setImage(data[0][0].images.split(",")[0]);
      setAllImages(data[0][0].images.split(","));
      setName(data[0][0].name);
      setProductData(data[0][0]);
      setVariantData(data[1]);
      setStatus(data[0][0].status);
      setCoins(data[0][0]?.coins?.split(","));
      setConditions(
        data[0][0].conditions ? data[0][0]?.conditions.split(",") : []
      );

      if (data[0][0].images.split(",")[0]) {
        setLoading(false);
      } else {
        console.warn(data[0][0].images.split(",")[0]);
      }
    } catch (error) {
      console.warn(error);
      // alert("Session expired");
      // navigate("/logout");
    }
  };

  useEffect(() => {
    getData();
    // getRewards();
  }, []);
  return (
    <PrimaryLayout>
      <>
        <div className="text-start">
          <h2 className="font-bold text-3xl">Product Details</h2>
          <p>Products &gt; Product Details</p>
        </div>
        <div className="flex gap-10 max-lg:flex-col justify-between">
          <div className="flex flex-col gap-5">
            <div className="card bg-white w-full h-fit flex-1">
              <div className="card-body gap-7">
                <div className="flex justify-between gap-4 flex-col lg:flex-row">
                  <div className="lg:w-1/2 lg:max-w-80 max-h-96">
                    <Swiper
                      style={{
                        "--swiper-navigation-color": "#fff",
                        "--swiper-pagination-color": "#fff",
                      }}
                      spaceBetween={10}
                      thumbs={{
                        swiper:
                          thumbsSwiper && !thumbsSwiper.destroyed
                            ? thumbsSwiper
                            : null,
                      }}
                      autoplay={{ delay: 6000 }}
                      modules={[Thumbs, Autoplay]}
                      className="mySwiper2 h-[80%] mb-3"
                    >
                      {allImages?.map((image) => (
                        <SwiperSlide>
                          <img
                            className="object-contain"
                            src={`${process.env.REACT_APP_BACKEND_URL}${image}`}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    <Swiper
                      onSwiper={setThumbsSwiper}
                      spaceBetween={10}
                      slidesPerView={4}
                      watchSlidesProgress={true}
                      modules={[Navigation, Thumbs]}
                      className="mySwiper h-[20%] items-center"
                    >
                      {allImages?.map((image) => (
                        <SwiperSlide>
                          <img
                            className="object-contain"
                            src={`${process.env.REACT_APP_BACKEND_URL}${image}`}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                  <div className="lg:w-1/2 text-start flex flex-col gap-3">
                    <h1 className="font-semibold text-2xl">
                      {productData?.name}
                    </h1>
                    <div className="flex gap-20">
                      <span className="flex items-center gap-2">
                        <FaStar className="text-accent" size={20} />
                        <p>{productData?.rating ? productData.rating : 0}</p>
                      </span>
                      <span className="flex items-center gap-2">
                        <MdRateReview className="text-accent" size={20} />
                        <p>
                          {productData?.reviews?.length
                            ? productData.reviews.length
                            : 0}{" "}
                          Reviews
                        </p>
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Description</h3>
                      <p className="text-black/80">
                        {productData?.description}
                      </p>
                    </div>
                    <div>
                      <span className="font-semibold">Status: </span>
                      <span
                        className={`${
                          product.stockAvailablity
                            ? "text-success"
                            : "text-error"
                        }`}
                      >
                        {product.stockAvailablity
                          ? "Available in Stock"
                          : "Out Of Stock"}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold">Seller Price: </span>₹
                      {productData?.price_b2b}
                    </div>
                    <div>
                      <span className="font-semibold">MRP: </span>₹
                      {productData?.price_b2c}
                    </div>
                    {product?.variants.map((variant) => (
                      <div>
                        <span className="font-semibold">{variant.name}: </span>
                        {variant.value}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="card bg-white w-full h-fit flex-1">
              <div className="card-body gap-7">
                <h4 className="text-2xl text-start h-80">
                  This is a good product. This is a good product.This is a good
                  product.
                </h4>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-none max-w-[350px gap-5">
            <div className="card bg-secondary text-secondary-content text-start p-4">
              {status == 1 ? (
                <h3 className="font-semibold">
                  Get ₹200 off on using 40 reward coins
                </h3>
              ) : status == 2 ? (
                <h3 className="font-semibold">
                  Get 20% off on using 40 reward coins
                </h3>
              ) : (
                conditions.map((item, index) => (
                  <div>
                    {index == 0 ? (
                      <h3 className="font-semibold">
                        Get ₹{+conditions[index]} Off for {coins[index]} reward
                        coins
                      </h3>
                    ) : index == 1 ? (
                      <h3 className="font-semibold">
                        Get ₹{+conditions[1] - +conditions[0]} Off for{" "}
                        {coins[1]} reward coins
                      </h3>
                    ) : (
                      <h3 className="font-semibold">
                        Get ₹{+conditions[2] - +conditions[1]} Off for{" "}
                        {coins[2]} reward coins
                      </h3>
                    )}
                  </div>
                ))
              )}
            </div>
            <div className="card bg-white h-fit sticky top-[6rem] ]">
              <div className="card-body">
                <div className="overflow-x-auto mt-3">
                  <table className="table ">
                    <thead className="bg-neutral text-white">
                      <tr>
                        <th>Set Order</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>Item</th>
                        <td className="text-end">Power Bank</td>
                      </tr>
                      <tr>
                        <th>Category</th>
                        <td className="text-end">{productData?.category}</td>
                      </tr>
                      <tr>
                        <th>Sub-category</th>
                        <td className="text-end">{productData?.subcategory}</td>
                      </tr>
                      <tr>
                        <th>Company</th>
                        <td className="text-end">{productData?.company}</td>
                      </tr>
                      <tr>
                        <th>Available quantity</th>
                        <td className="text-end">
                          {productData?.availability}
                        </td>
                      </tr>
                      <tr>
                        <th>Seller Id</th>
                        <td className="text-end">{productData?.seller_id}</td>
                      </tr>
                      {/* <tr className="text-xl">
                        <th>Total</th>
                        <td className="text-end">Power Bank</td>
                      </tr> */}
                    </tbody>
                  </table>
                </div>
                <button className="primary-btn">Place Order</button>
                <p className="text-secondary font-semibold">
                  Delivery Expected by Thu,26 Mar 2024
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    </PrimaryLayout>
  );
};

export default ProductDetails;
