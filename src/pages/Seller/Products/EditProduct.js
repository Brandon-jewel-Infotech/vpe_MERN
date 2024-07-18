import React, { useEffect, useState } from "react";
import PrimaryLayout from "../../../Layout/PrimaryLayout";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import FormField from "../../../components/FormField";
import { toast } from "react-toastify";
import { logout } from "../../../redux/slice";
import { GoPlus } from "react-icons/go";
import { AiFillDelete, AiOutlineDelete } from "react-icons/ai";
import { MdCheck, MdClose, MdOutlineModeEditOutline } from "react-icons/md";
import FileUploader from "../../../components/FileUploader";
import FallbackText from "../../../components/FallbackText";
import { BsSubtract } from "react-icons/bs";
import { FaImage } from "react-icons/fa";
import Loading from "../../../components/Loading";
import RequestNewSubCategoryModal from "../../../modals/RequestNewSubCategoryModal";
import RequestNewCompanyModal from "../../../modals/RequestNewCompanyModal";

const EditProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  const { tok } = useSelector((state) => state.user);
  const [productDetails, setProductDetails] = useState({});
  const [productVariants, setProductVariants] = useState([]);
  const [editVariantId, setEditVariantId] = useState(0);
  const [updatedVariantDetails, setUpdatedVariantDetails] = useState({});
  const [imageUpdateItem, setImageUpdateItem] = useState({});
  const [loadingData, setLoadingData] = useState(false);

  const [subcategories, setSubcategories] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [rewards, setRewards] = useState(null);

  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [reward, setReward] = useState(null);
  const [company, setCompany] = useState(null);

  const getCategories = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/seller/categories`,
        {},
        {
          headers: {
            Authorization: tok,
          },
        }
      );

      setCategory(data.category);
      setSubcategories(data.subcategories);
      setCompanies(data.companies);
    } catch (error) {
      console.error(error);
    }
  };

  const getRewards = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/seller/rewards`,
        {},
        {
          headers: {
            Authorization: tok,
          },
        }
      );
      setRewards(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const getData = async () => {
    setLoadingData(true);
    try {
      const {
        data: { variants, ...productData },
      } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/seller/all`,
        { id },
        {
          headers: {
            Authorization: tok,
          },
        }
      );

      setProductDetails(productData);
      setSubCategory(productData.subcategory.id);
      setReward(productData.reward.id);
      setCompany(productData.company.id);
      setProductVariants(variants);
    } catch (error) {
      if (error?.response?.status === 401) {
        toast.dismiss();
        toast.error("Session Expired");
        dispatch(logout());
      }
      // console.log(error);
    }
    setLoadingData(false);
  };

  const updateProductDetailsHandler = async () => {
    try {
      const res = await toast.promise(
        axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/seller/products/update/${id}`,
          { ...productDetails, subCategory, reward, company },
          {
            headers: {
              Authorization: tok,
            },
          }
        ),
        {
          pending: "Updating Product Details...",
          success: "Product Details Updated Successfully!",
          error: {
            render({ data }) {
              if (data?.response?.status === 401) {
                dispatch(logout());
                return "Session Expired";
              } else {
                return (
                  data?.response?.data?.error ||
                  "Failed to Update Product Details."
                );
              }
            },
          },
        }
      );
    } catch (err) {}
  };

  const deleteVariantHandler = async (variantId) => {
    try {
      const res = await toast.promise(
        axios.delete(
          `${process.env.REACT_APP_BACKEND_URL}/seller/variants/delete/${variantId}`,
          {
            headers: {
              Authorization: tok,
            },
          }
        ),
        {
          pending: "Deleting Variant...",
          success: "Variant deleted Successfully!",
          error: {
            render({ data }) {
              if (data?.response?.status === 401) {
                dispatch(logout());
                return "Session Expired";
              } else {
                return (
                  data?.response?.data?.error || "Failed to delete Variant."
                );
              }
            },
          },
        }
      );

      if (res?.status === 200) {
        setProductVariants((currVariants) => {
          return currVariants?.filter((variant) => variant.id != variantId);
        });
      }
    } catch (e) {}
  };

  const handleUpdateVariant = async () => {
    try {
      const res = await toast.promise(
        axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/seller/variants/update/${editVariantId}`,
          updatedVariantDetails,
          {
            headers: {
              Authorization: tok,
            },
          }
        ),
        {
          pending: "Updating Variant Details...",
          success: "Variant Details Updated Successfully!",
          error: {
            render({ data }) {
              if (data?.response?.status === 401) {
                dispatch(logout());
                return "Session Expired";
              } else {
                return (
                  data?.response?.data?.error ||
                  "Failed to Update Variant Details."
                );
              }
            },
          },
        }
      );
      if (res?.status === 200) {
        setProductVariants((currVariants) => {
          currVariants = currVariants?.map((variant) => {
            if (variant.id == updatedVariantDetails.id) {
              return updatedVariantDetails;
            }
            return variant;
          });
          return currVariants;
        });
        setEditVariantId(0);
      }
    } catch (err) {}
  };

  const inputHandler = (e) => {
    setProductDetails((currDetails) => {
      return { ...currDetails, [e.target.name]: e.target.value };
    });
  };

  const variantUpdateInputHandler = (e) => {
    setUpdatedVariantDetails((currDetails) => {
      return { ...currDetails, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    getData();
    getCategories();
    getRewards();
  }, []);
  return (
    <>
      <ImageUpdateModal
        details={imageUpdateItem}
        setImageUpdateItem={setImageUpdateItem}
        setProductDetails={setProductDetails}
        setProductVariants={setProductVariants}
      />
      <PrimaryLayout>
        <div className="flex flex-col text-start mb-6">
          <h2 className="text-xl font-bold ">Update Product Details</h2>
          <p className="text-md">Products &gt; Update Product Details</p>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex gap-10 max-lg:flex-col bg-white">
            <div className="w-[98%] lg:w-[50%] h-full">
              <div className="bg-base-100 card card-body  shadow-md rounded-md">
                <FormField
                  title="Product name"
                  required={true}
                  name={"name"}
                  value={productDetails?.name}
                  inputHandler={inputHandler}
                />
                <label className="form-control">
                  <div className="label">
                    <span className="label-text font-semibold">
                      Product Description{" "}
                      <span className="text-red-500">*</span>
                    </span>
                  </div>
                  <textarea
                    className="textarea textarea-bordered mb-3 h-14 bg-white"
                    value={productDetails?.description}
                    name={"description"}
                    onChange={inputHandler}
                  ></textarea>
                </label>
                <FormField
                  title="Quantity Available"
                  required={true}
                  type={"number"}
                  value={productDetails?.availability}
                  name={"availability"}
                  inputHandler={inputHandler}
                />

                <label className="form-control">
                  <div className="label">
                    <span className="label-text font-semibold">
                      Product Images <span className="text-red-500">*</span>
                    </span>
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    {productDetails?.images?.length ? (
                      productDetails?.images?.map((image) => (
                        <img
                          src={process.env.REACT_APP_BACKEND_URL + image?.url}
                          key={image.id}
                          className="w-20 h-20 cursor-pointer hover:scale-105 transition-transform duration-300"
                          onClick={() => {
                            setImageUpdateItem({
                              id: productDetails?.id,
                              name: productDetails?.name,
                              images: productDetails?.images,
                              type: "product",
                            });
                            document
                              .getElementById("image_update_modal")
                              .showModal();
                          }}
                        />
                      ))
                    ) : (
                      <div
                        className="bg-white/70 p-3 flex flex-col items-center gap-2 h-20 w-20 cursor-pointer hover:scale-105 transition-transform duration-300 shadow-md"
                        onClick={() => {
                          setImageUpdateItem({
                            id: productDetails?.id,
                            name: productDetails?.name,
                            images: productDetails?.images,
                            type: "product",
                          });
                          document
                            .getElementById("image_update_modal")
                            .showModal();
                        }}
                      >
                        <FaImage size={40} />
                        <h4 className="text-xs">Add images</h4>
                      </div>
                    )}
                  </div>
                </label>
              </div>
            </div>
            <div className="bg-base-100 card w-[98%] lg:w-[50%] rounded-md shadow-md">
              <div className="card-body">
                <div className="flex gap-4">
                  <div className="w-full flex flex-col justify-start">
                    <label className="form-control w-full ">
                      <div className="label">
                        <span className="label-text font-semibold">
                          Sub-category{" "}
                          {productDetails?.category?.name &&
                            `(${productDetails?.category?.name})`}
                          <span className="text-red-500">*</span>
                        </span>
                      </div>
                      <select
                        className="select select-bordered bg-white"
                        onChange={(e) => {
                          setSubCategory(e.target.value);
                        }}
                        value={subCategory}
                      >
                        {subcategories?.map((subcategory, index) => (
                          <option key={index} value={subcategory.id}>
                            {subcategory.name}
                          </option>
                        ))}
                      </select>

                      <RequestNewSubCategoryModal category={category} />
                    </label>
                  </div>
                </div>
                <div className="flex gap-4">
                  <FormField
                    title="Price for Business"
                    required={true}
                    type={"number"}
                    value={productDetails?.price_b2b}
                    name={"price_b2b"}
                    inputHandler={inputHandler}
                  />
                  <FormField
                    title="Price for Customer"
                    required={true}
                    type={"number"}
                    value={productDetails?.price_b2c}
                    name={"price_b2c"}
                    inputHandler={inputHandler}
                  />
                </div>
                <div className="flex gap-4">
                  <div className="w-full flex flex-col justify-start">
                    <label className="form-control w-full ">
                      <div className="label">
                        <span className="label-text font-semibold">
                          Company <span className="text-red-500">*</span>
                        </span>
                      </div>
                      <select
                        className="select select-bordered bg-white"
                        onChange={(e) => {
                          setCompany(e.target.value);
                        }}
                        value={company}
                      >
                        <option disabled selected>
                          Pick one
                        </option>
                        {companies?.map((company, index) => (
                          <option key={index} value={company.id}>
                            {company.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <RequestNewCompanyModal />
                  </div>
                  <div className="w-full flex flex-col justify-start">
                    <label className="form-control w-full ">
                      <div className="label">
                        <span className="label-text font-semibold">
                          Rewards
                        </span>
                      </div>
                      <select
                        className="select select-bordered bg-white"
                        onChange={(e) => {
                          setReward(e.target.value);
                        }}
                        value={reward}
                      >
                        <option disabled selected>
                          Pick one
                        </option>
                        {rewards?.map((reward, index) => (
                          <option key={index} value={reward.id}>
                            {reward.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    {/* <RequestNewRewardsSchema /> */}
                    <Link
                      to={"/reward-list"}
                      className="text-start ml-2 mt-1 text-neutral hover:text-[#bc8ffc] w-fit"
                    >
                      Create a new reward schema?
                    </Link>
                  </div>
                </div>

                <button
                  className="primary-btn mt-auto"
                  onClick={updateProductDetailsHandler}
                >
                  Update Product
                </button>
              </div>
            </div>
          </div>
          <div className="w-[98%] lg:w-full h-full">
            <div className="bg-base-100 card card-body shadow-md rounded-md">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold text-start">
                    Variants List
                  </h2>
                </div>
                <button
                  className="primary-btn font-semibold"
                  onClick={() => {
                    navigate(`/products/variant/${id}`, {
                      state: { previousPage: location.pathname },
                    });
                  }}
                >
                  <GoPlus size={20} /> Add New
                </button>
              </div>
              {loadingData && (
                <div className="w-40 h-40 mx-auto">
                  <Loading />
                </div>
              )}
              {!loadingData &&
                (productVariants?.length ? (
                  <div className="mt-3 overflow-x-auto">
                    <table className="table table-zebra table-auto ">
                      <thead className="bg-neutral text-center text-white">
                        <tr>
                          <th>Variant Id</th>
                          <th>Name</th>
                          <th>Image</th>
                          <th>Business Price</th>
                          <th>Customer Price</th>
                          <th>Description</th>
                          <th>Available Quantity</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productVariants?.map((item) => (
                          <tr key={item?.id}>
                            <td>{item?.id}</td>
                            <td>
                              {editVariantId === item.id ? (
                                <FormField
                                  placeholder={"Variant Name"}
                                  name={"name"}
                                  value={updatedVariantDetails?.name}
                                  inputHandler={variantUpdateInputHandler}
                                />
                              ) : (
                                item?.name
                              )}
                            </td>
                            <td>
                              {item.images?.length ? (
                                <img
                                  className="w-20 max-h-20 rounded object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
                                  src={`${process.env.REACT_APP_BACKEND_URL}${
                                    item.images?.length && item?.images[0]?.url
                                  }`}
                                  onClick={() => {
                                    setImageUpdateItem({
                                      id: item?.id,
                                      name: item?.name,
                                      images: item?.images,
                                      type: "variant",
                                    });
                                    document
                                      .getElementById("image_update_modal")
                                      .showModal();
                                  }}
                                  alt="variant image"
                                />
                              ) : (
                                <div
                                  className="bg-white/70 p-3 flex flex-col items-center gap-2 h-20 w-20 cursor-pointer hover:scale-105 transition-transform duration-300 text-center shadow-md"
                                  onClick={() => {
                                    setImageUpdateItem({
                                      id: item?.id,
                                      name: item?.name,
                                      images: item?.images,
                                      type: "variant",
                                    });
                                    document
                                      .getElementById("image_update_modal")
                                      .showModal();
                                  }}
                                >
                                  <FaImage size={40} />
                                  <h4 className="text-xs">Add images</h4>
                                </div>
                              )}
                            </td>
                            <td>
                              {editVariantId === item.id ? (
                                <FormField
                                  placeholder={"Business Price"}
                                  name={"price_b2b"}
                                  value={updatedVariantDetails?.price_b2b}
                                  inputHandler={variantUpdateInputHandler}
                                  type={"number"}
                                />
                              ) : (
                                item?.price_b2b
                              )}
                            </td>
                            <td>
                              {editVariantId === item.id ? (
                                <FormField
                                  placeholder={"Customer Price"}
                                  name={"price_b2c"}
                                  value={updatedVariantDetails?.price_b2c}
                                  inputHandler={variantUpdateInputHandler}
                                  type={"number"}
                                />
                              ) : (
                                item?.price_b2c
                              )}
                            </td>
                            <td>
                              {" "}
                              {editVariantId === item.id ? (
                                <FormField
                                  placeholder={"Description"}
                                  name={"description"}
                                  value={updatedVariantDetails?.description}
                                  inputHandler={variantUpdateInputHandler}
                                />
                              ) : (
                                item?.description
                              )}
                            </td>
                            <td>
                              {" "}
                              {editVariantId === item.id ? (
                                <FormField
                                  placeholder={"Available Quantity"}
                                  name={"qty"}
                                  value={updatedVariantDetails?.qty}
                                  inputHandler={variantUpdateInputHandler}
                                  type={"number"}
                                />
                              ) : (
                                item?.qty
                              )}
                            </td>
                            <td>
                              <div className="flex gap-3">
                                {editVariantId === item.id ? (
                                  <>
                                    <button
                                      className="text-error"
                                      onClick={() => {
                                        setUpdatedVariantDetails({});
                                        setEditVariantId(0);
                                      }}
                                    >
                                      <MdClose size={25} />
                                    </button>
                                    <button
                                      className="text-info"
                                      onClick={handleUpdateVariant}
                                    >
                                      <MdCheck size={25} />
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      className="text-error"
                                      onClick={() =>
                                        deleteVariantHandler(item.id)
                                      }
                                    >
                                      <AiOutlineDelete size={25} />
                                    </button>
                                    <button
                                      className="text-info"
                                      onClick={() => {
                                        setUpdatedVariantDetails(item);
                                        setEditVariantId(
                                          editVariantId === item.id
                                            ? 0
                                            : item.id
                                        );
                                      }}
                                    >
                                      <MdOutlineModeEditOutline size={25} />
                                    </button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <FallbackText
                    IconRef={BsSubtract}
                    message={"No Variant Found"}
                  />
                ))}
            </div>
          </div>
        </div>
      </PrimaryLayout>
    </>
  );
};

export default EditProduct;

export const ImageUpdateModal = ({
  details,
  setImageUpdateItem,
  setProductDetails,
  setProductVariants,
}) => {
  const dispatch = useDispatch();
  const { tok } = useSelector((state) => state.user);
  const [newImages, setNewImages] = useState([]);

  const handleImageUpload = (newImages, name) => {
    setNewImages((prevImages) => {
      return newImages;
    });
  };

  const imageDeleteHandler = async (id) => {
    try {
      const { data } = await toast.promise(
        axios.delete(
          `${process.env.REACT_APP_BACKEND_URL}/seller/images/${id}`,
          {
            headers: {
              Authorization: tok,
            },
          }
        ),
        {
          pending: "Deleting Image...",
          success: "Image Deleted Successfully!",
          error: {
            render({ data }) {
              if (data?.response?.status === 401) {
                dispatch(logout());
                return "Session Expired";
              } else {
                return data?.response?.data?.error || "Failed to delete Image.";
              }
            },
          },
        }
      );
      if (details?.type === "variant") {
        setProductVariants((currVariants) =>
          currVariants?.map((v) => {
            if (v.id === details?.id) {
              let updatedImages = v?.images?.filter((img) => img.id !== id);
              return { ...v, images: updatedImages };
            }
            return v;
          })
        );
      } else if (details?.type === "product") {
        setProductDetails((currProduct) => {
          let updatedImages = currProduct?.images?.filter(
            (img) => img.id !== id
          );

          return { ...currProduct, images: updatedImages };
        });
      }
      setImageUpdateItem((currItem) => {
        return {
          ...currItem,
          images: currItem?.images?.filter((image) => image.id !== id),
        };
      });
      // document.getElementById("image_update_modal").close();
    } catch (error) {
      // console.log(error);
    }
  };

  const addImageHandler = async () => {
    if (!newImages.length)
      return toast.error("Please upload at least one image");

    const formData = new FormData();
    for (let image of newImages) {
      formData.append("images", image);
    }

    formData.append(
      details?.type === "variant" ? "variant_id" : "product_id",
      details?.id
    );

    try {
      const { data } = await toast.promise(
        axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/seller/images`,
          formData,
          {
            headers: {
              Authorization: tok,
              "Content-Type": "multipart/form-data",
            },
          }
        ),
        {
          pending: "Uploading Images...",
          success: "Images Uploaded Successfully!",
          error: {
            render({ data }) {
              if (data?.response?.status === 401) {
                dispatch(logout());
                return "Session Expired";
              } else {
                return (
                  data?.response?.data?.error || "Failed to upload images."
                );
              }
            },
          },
        }
      );

      const updatedImages = data?.images;

      if (details?.type === "variant") {
        setProductVariants((currVariants) =>
          currVariants?.map((v) => {
            if (v.id === details?.id) {
              return { ...v, images: [...v.images, ...updatedImages] };
            }
            return v;
          })
        );
      } else if (details?.type === "product") {
        setProductDetails((currProduct) => {
          return {
            ...currProduct,
            images: [...currProduct.images, ...updatedImages],
          };
        });
      }

      setImageUpdateItem((currItem) => {
        return { ...currItem, images: [...currItem.images, ...updatedImages] };
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <dialog id="image_update_modal" className="modal">
      <div className="modal-box">
        <h2 className="font-semibold text-xl my-2">
          Update {details.name} Images
        </h2>
        <label className="form-control pb-4">
          <div className="label">
            <span className="label-text font-semibold">Uploaded Images</span>
          </div>
          <div className="flex gap-3 flex-wrap">
            {details?.images?.map((image) => (
              <ImageCard
                key={image?.id}
                url={image?.url}
                backendUrl={process.env.REACT_APP_BACKEND_URL}
                deleteHandler={() => imageDeleteHandler(image.id)}
              />
            ))}
          </div>
        </label>
        <label className="form-control pb-4">
          <div className="label">
            <span className="label-text font-semibold">New Images</span>
          </div>
          <FileUploader
            onFileUpload={handleImageUpload}
            acceptedFileStr={".png, .jpg, .jpeg, .gif"}
            name={details.id + details?.images?.length}
            isMultipleFile
          />
        </label>
        <div className="flex w-full justify-center gap-4">
          {/* if there is a button in form, it will close the modal */}
          <form method="dialog">
            <button className=" btn secondary-btn">Cancel</button>
          </form>
          <button
            className=" btn primary-btn"
            // onClick={() => {
            //   requestNewCompany();
            // }}
            onClick={addImageHandler}
          >
            Upload
          </button>
        </div>
      </div>
    </dialog>
  );
};

const ImageCard = ({ url, deleteHandler, backendUrl }) => {
  const [mouseIn, setMouseIn] = useState(false);
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    if (backendUrl) {
      setImageURL(backendUrl + url);
    } else {
      setImageURL(url);
    }
  }, [url, backendUrl]);

  return (
    <>
      {imageURL && (
        <div
          className="uploaded-images"
          style={{
            backgroundImage: `url(${imageURL})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onMouseEnter={() => {
            setMouseIn(true);
          }}
          onMouseLeave={() => {
            setMouseIn(false);
          }}
        >
          {mouseIn && (
            <div className="overlay" onClick={deleteHandler}>
              <AiFillDelete size={15} />
            </div>
          )}
        </div>
      )}
    </>
  );
};
