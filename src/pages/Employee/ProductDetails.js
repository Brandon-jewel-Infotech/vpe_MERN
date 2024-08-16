import React, { useEffect, useState } from "react";
import PrimaryLayout from "../../Layout/PrimaryLayout";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import { Navigation, Thumbs, Autoplay } from "swiper/modules";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../../redux/slice";
import { addToCart } from "../../redux/cartSlice";
import FallbackText from "../../components/FallbackText";
import { GiCardboardBox } from "react-icons/gi";
import currencyFormatter from "../../utils/currencyFormatter";
import truncateString from "../../utils/stringTruncate";
import { FaArrowLeft } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const { tok, code } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [thumbsSwiper, setThumbsSwiper] = useState();
  const [product, setProduct] = useState({});
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [images, setImages] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [rewardConditions, setRewardConditions] = useState([]);
  const [rewardCoins, setRewardCoins] = useState([]);
  const [sendingRequest, setSendingRequest] = useState(false);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/employee/products/${id}`,
        {
          headers: {
            Authorization: `${tok}`,
          },
        }
      );

      setRewardCoins(data?.employee_reward?.coins?.split(","));
      setRewardConditions(data?.employee_reward?.conditions?.split(","));

      setProduct(data);
    } catch (error) {
      console.warn(error);
      // alert("Session expired");
      // navigate("/logout");
    }
    setLoading(false);
  };

  const addToCartHandler = async (e) => {
    e.preventDefault();
    setSendingRequest(true);
    try {
      const res = await toast.promise(
        axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/cart`,
          {
            product_id: id,
            qty: quantity,
            total:
              (selectedVariant?.price_b2c || product?.price_b2c) * quantity ||
              0,
            variant_id: selectedVariant?.id,
          },
          {
            headers: {
              Authorization: tok,
            },
          }
        ),
        {
          pending: "Adding Product to Cart...",
          success: "Product added to Cart!",
          error: {
            render({ data }) {
              if (data?.response?.status === 401) {
                dispatch(logout());
                return "Session Expired";
              } else {
                return (
                  data?.response?.data?.error ||
                  "Failed to add Product to Cart."
                );
              }
            },
          },
        }
      );
      if (res?.status === 201) {
        dispatch(addToCart());
      }
    } catch (e) {}
    setSendingRequest(false);
  };

  useEffect(() => {
    getData();
    // getRewards();
  }, [id]);

  useEffect(() => {
    if (product?.variants?.length > 0)
      setSelectedVariant(
        product?.variants?.find((variant) => variant.qty > 0) ||
          product?.variants[0]
      );
  }, [product]);

  useEffect(() => {
    setImages(
      (selectedVariant?.images?.length > 0 && selectedVariant?.images) ||
        product?.images
    );
  }, [selectedVariant, product]);

  return (
    <PrimaryLayout>
      <>
        <div className="text-start capitalize">
          {/* <h2 className="text-xl font-bold">
            {product?.name || "Product Details"}
          </h2> */}
          <Link
            to={"/marketplace"}
            className="secondary-btn "
            style={{ borderRadius: "100px" }}
          >
            {" "}
            <FaArrowLeft /> Back to Marketplace
          </Link>
          {/* <p className="text-md">
            Products &gt; {product?.name || "Product Details"}
          </p> */}
        </div>
        <div className="flex gap-10 max-lg:flex-col justify-between">
          {product.id || loading ? (
            <>
              <div className="flex flex-col gap-5 flex-1">
                <div className="card bg-white w-full h-fit flex-1">
                  <div className="card-body gap-7 max-sm:p-2">
                    <div className="flex justify-between gap-4 flex-col lg:flex-row">
                      {loading ? (
                        <div className="flex w-80 flex-col gap-4">
                          <div className="skeleton h-56 w-full"></div>
                          <div className="flex gap-4 w-full">
                            <div className="skeleton h-20 w-1/3"></div>
                            <div className="skeleton h-20 w-1/3"></div>
                            <div className="skeleton h-20 w-1/3"></div>
                          </div>
                        </div>
                      ) : (
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
                            {images?.map((image, ind) => (
                              <SwiperSlide key={image?.id}>
                                <div
                                  className="h-96 bg-no-repeat bg-center bg-contain"
                                  style={{
                                    backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}${image?.url})`,
                                  }}
                                ></div>
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
                            {images?.map((image, ind) => (
                              <SwiperSlide key={image?.id}>
                                <img
                                  className="object-contain"
                                  src={`${process.env.REACT_APP_BACKEND_URL}${image?.url}`}
                                />
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        </div>
                      )}
                      {loading ? (
                        <div className="flex w-80 flex-col gap-4">
                          <div className="skeleton h-4 w-20"></div>
                          <div className="skeleton h-4 w-full"></div>
                          <div className="skeleton h-4 w-full"></div>
                          <div className="skeleton h-4 w-20"></div>
                          <div className="skeleton h-4 w-full"></div>
                          <div className="skeleton h-4 w-full"></div>
                          <div className="skeleton h-4 w-full"></div>
                        </div>
                      ) : (
                        <div className="lg:w-1/2 text-start flex flex-col gap-3">
                          <h1 className="font-semibold text-2xl capitalize">
                            {product?.name}
                          </h1>
                          <div>
                            <h3 className="font-semibold">Description:</h3>
                            <p className="text-black/80">
                              {selectedVariant?.description ||
                                product?.description}
                            </p>
                          </div>
                          <div>
                            <span className="font-semibold">Status: </span>
                            {selectedVariant?.id ? (
                              <span
                                className={`${
                                  selectedVariant?.qty
                                    ? "text-success"
                                    : "text-error"
                                }`}
                              >
                                {selectedVariant?.qty
                                  ? "Available in Stock"
                                  : "Out Of Stock"}
                              </span>
                            ) : (
                              <span
                                className={`${
                                  product?.availability && product?.instock
                                    ? "text-success"
                                    : "text-error"
                                }`}
                              >
                                {product?.availability && product?.instock
                                  ? "Available in Stock"
                                  : "Out Of Stock"}
                              </span>
                            )}
                          </div>
                          <div>
                            <span className="font-semibold">MRP: </span>₹{" "}
                            {currencyFormatter(
                              selectedVariant?.price_b2c || product?.price_b2c
                            )}
                          </div>
                          {product?.variants?.length > 0 && (
                            <div className="flex gap-2 items-center justify-center">
                              <span className="font-semibold">Variants: </span>
                              <label className="form-control w-full ">
                                <select
                                  className="select select-bordered bg-white"
                                  onChange={(e) => {
                                    setQuantity(1);
                                    setSelectedVariant(
                                      product.variants.find(
                                        (v) => v.id == e.target.value
                                      )
                                    );
                                  }}
                                  value={selectedVariant?.id}
                                >
                                  {product?.variants?.map((variant) => (
                                    <option key={variant.id} value={variant.id}>
                                      {variant?.name}
                                    </option>
                                  ))}
                                </select>
                              </label>
                            </div>
                          )}
                          {(selectedVariant?.qty !== undefined
                            ? selectedVariant?.qty > 0
                            : product?.availability > 0 &&
                              product?.instock === 1) && (
                            <div className="flex gap-2 items-center">
                              <span className="font-semibold">Quantity: </span>
                              <div className="join max-w-40">
                                <button
                                  className="btn join-item"
                                  onClick={() => {
                                    setQuantity((qty) => {
                                      if (qty - 1 >= 1) {
                                        return qty - 1;
                                      }
                                      return qty;
                                    });
                                  }}
                                >
                                  -
                                </button>
                                {/* <label className="form-control w-full join-item"> */}
                                <input
                                  value={quantity}
                                  className={
                                    "input input-bordered border-base-100 border-y-4 border-x-0 focus:outline-none focus:border-base-100 w-full bg-white join-item"
                                  }
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    if (
                                      value >= 1 &&
                                      value <=
                                        (selectedVariant?.qty !== undefined
                                          ? selectedVariant?.qty
                                          : product?.availability)
                                    ) {
                                      setQuantity(+value);
                                    }
                                  }}
                                  type="number"
                                />
                                {/* </label> */}
                                <button
                                  className="btn join-item"
                                  onClick={() => {
                                    setQuantity((qty) => {
                                      if (
                                        qty + 1 <=
                                        (selectedVariant?.qty !== undefined
                                          ? selectedVariant?.qty
                                          : product?.availability)
                                      ) {
                                        return +qty + 1;
                                      }
                                      return +qty;
                                    });
                                  }}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col flex-none max-w-[350px] gap-5">
                {loading ? (
                  <div className="skeleton h-16 w-72"></div>
                ) : (
                  rewardCoins?.length > 0 && (
                    <div className="card bg-secondary text-secondary-content text-start p-4">
                      {product?.employee_reward?.status == 1 ? (
                        <h3 className="font-semibold">
                          Get {rewardCoins[0]} coins per item.
                        </h3>
                      ) : product?.employee_reward?.status == 2 ? (
                        <h3 className="font-semibold">
                          Get {rewardCoins[0]}% coins per item.
                        </h3>
                      ) : (
                        product?.employee_reward?.status == 3 &&
                        rewardConditions?.length > 0 && (
                          <div>
                            <h3 className="font-semibold">
                              Reward Coin Conditions:
                            </h3>
                            <ul>
                              {rewardConditions?.map((item, index) => {
                                const previousCondition =
                                  index === 0
                                    ? 1
                                    : Number(rewardConditions[index - 1]) + 1;
                                const currentCondition = Number(item);
                                return (
                                  <li
                                    key={index}
                                    className="list-outside list-disc ms-5"
                                  >
                                    For {previousCondition}-{currentCondition}{" "}
                                    Product Items {rewardCoins[index]} coins per
                                    item will be rewarded.
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        )
                      )}
                    </div>
                  )
                )}
                {loading ? (
                  <div className="skeleton h-96 w-72"></div>
                ) : (
                  <div className="card h-fit sticky top-[6rem] shadow-md bg-base-100">
                    <div className="card-body">
                      <div className="overflow-x-auto mt-3">
                        <table className="table ">
                          <thead className="bg-neutral text-center text-white">
                            <tr>
                              <th>Set Order</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th>Item</th>
                              <td className="text-end">
                                {truncateString(product?.name)}
                              </td>
                            </tr>
                            <tr>
                              <th>Category</th>
                              <td className="text-end">
                                {product?.category?.name}
                              </td>
                            </tr>
                            <tr>
                              <th>Sub-category</th>
                              <td className="text-end">
                                {product?.subcategory?.name}
                              </td>
                            </tr>
                            <tr>
                              <th>Company</th>
                              <td className="text-end">
                                {product?.company?.name}
                              </td>
                            </tr>
                            <tr>
                              <th>Available quantity</th>
                              <td className="text-end">
                                {selectedVariant?.qty !== undefined
                                  ? selectedVariant?.qty
                                  : product?.availability}
                              </td>
                            </tr>
                            {/* <tr className="text-xl">
                        <th>Total</th>
                        <td className="text-end">Power Bank</td>
                      </tr> */}
                          </tbody>
                        </table>
                      </div>
                      <button
                        className="primary-btn disabled:text-white disabled:bg-neutral/80"
                        disabled={
                          // product?.employee_code === code ||
                          selectedVariant?.qty !== undefined
                            ? !selectedVariant?.qty
                            : product?.availability <= 0 ||
                              product?.instock !== 1
                        }
                        onClick={addToCartHandler}
                      >
                        Add To Cart - ₹{" "}
                        {currencyFormatter(
                          (selectedVariant?.price_b2c || product?.price_b2c) *
                            quantity || 0
                        )}
                      </button>
                      {/* <p className="text-secondary font-semibold">
                  Delivery Expected by Thu,26 Mar 2024
                </p> */}
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <FallbackText
              IconRef={GiCardboardBox}
              message={"Product Details Not Found."}
            />
          )}
        </div>
      </>
    </PrimaryLayout>
  );
};

export default ProductDetails;
