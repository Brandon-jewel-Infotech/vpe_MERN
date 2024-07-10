import React, { useEffect, useRef, useState } from "react";
import PrimaryLayout from "../../../Layout/PrimaryLayout";
import FormField from "../../../components/FormField";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../../../redux/slice";
import validateEmail from "../../../utils/validateEmail";
import FileUploader from "../../../components/FileUploader";

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tok } = useSelector((state) => state.user);
  const [subcategories, setSubcategories] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [rewards, setRewards] = useState([]);

  const [category, setCategory] = useState({});
  const [subCategory, setSubCategory] = useState(null);
  const [reward, setReward] = useState(null);
  const [company, setCompany] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    price_b2b: null,
    price_b2c: null,
    availability: null,
  });
  const [productImages, setProductImages] = useState([]);

  const handleImageUpload = (newImages, name) => {
    setProductImages((prevImages) => {
      return newImages;
    });
  };
  // to get categories , sub-categories and companies
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

  //to get rewards
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

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (
        !productDetails?.name?.length ||
        !productDetails?.description?.length ||
        !productDetails?.price_b2b ||
        !productDetails?.price_b2c ||
        !productDetails?.availability ||
        !subCategory ||
        !company
      ) {
        return toast.error("Please fill all required details");
      }

      if (!productImages.length) {
        return toast.error("Please add atleast one image to your product.");
      }

      const formData = new FormData();
      for (let image of productImages) {
        formData.append("images", image);
      }

      for (let key in productDetails) {
        formData.append(key, productDetails[key]);
      }
      formData.append("subCategory", subCategory);
      formData.append("company", company);
      formData.append("reward", reward);

      const res = await toast.promise(
        axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/seller/products`,
          formData,
          {
            headers: {
              Authorization: tok,
              "Content-Type": "multipart/form-data",
            },
          }
        ),
        {
          pending: "Adding Product...",
          success: "Product added Successfully!",
          error: {
            render({ data }) {
              if (data?.response?.status === 401) {
                dispatch(logout());
                return "Session Expired";
              } else {
                return data?.response?.data?.error || "Failed to add Product.";
              }
            },
          },
        }
      );
      if (res?.status === 201) {
        navigate("/products");
      }
    } catch (e) {}
  };
  const inputHandler = (e) => {
    setProductDetails((currDetails) => {
      return { ...currDetails, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    getCategories();
    getRewards();
  }, []);

  return (
    <PrimaryLayout>
      <div className="flex flex-col mb-6 text-start">
        <h2 className="text-xl font-bold ">Add Product Details</h2>
        <h4 className="text-md ">Products &gt; Product Details</h4>
      </div>
      <div className="flex gap-10 max-lg:flex-col bg-white">
        <div className="w-[98%] lg:w-[50%] h-full">
          <div className="bg-base-100 card card-body  shadow-xl rounded-md">
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
                  Product Description <span className="text-red-500">*</span>
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
              <FileUploader
                onFileUpload={handleImageUpload}
                acceptedFileStr={".png, .jpg, .jpeg, .gif"}
                name={document._id}
                isRequired={document.isRequired}
                isMultipleFile
              />
            </label>
          </div>
        </div>
        <div className="bg-base-100 card w-[98%] lg:w-[50%] rounded-md shadow-xl">
          <div className="card-body">
            <div className="flex gap-4">
              <div className="w-full flex flex-col justify-start">
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text font-semibold">
                      Sub-category {category?.name && `(${category?.name})`}
                      <span className="text-red-500">*</span>
                    </span>
                  </div>
                  <select
                    className="select select-bordered bg-white"
                    onChange={(e) => {
                      setSubCategory(e.target.value);
                    }}
                  >
                    <option disabled selected>
                      Pick one
                    </option>
                    {subcategories?.map((subcategory, index) => (
                      <option key={index} value={subcategory.id}>
                        {subcategory.name}
                      </option>
                    ))}
                  </select>
                </label>
                <RequestNewSubCategoryModal category={category} />
                {/* <button className="text-start ml-2 mt-1 text-neutral hover:text-[#bc8ffc] w-fit">
                  Request a new sub-category?
                </button> */}
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
                    <span className="label-text font-semibold">Rewards</span>
                  </div>
                  <select
                    className="select select-bordered bg-white"
                    onChange={(e) => {
                      setReward(e.target.value);
                    }}
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
                  to={"/"}
                  className="text-start ml-2 mt-1 text-neutral hover:text-[#bc8ffc] w-fit"
                >
                  Create a new reward schema?
                </Link>
              </div>
            </div>

            <button className="primary-btn mt-5" onClick={submitHandler}>
              Add Product
            </button>
          </div>
        </div>
      </div>
    </PrimaryLayout>
  );
};

export default AddProduct;

export const RequestNewSubCategoryModal = ({ category }) => {
  const dispatch = useDispatch();
  const [subCategoryName, setSubCategoryName] = useState();
  const { tok } = useSelector((state) => state.user);

  const requestNewCategory = async () => {
    try {
      let message = `I want to request a new sub category (${subCategoryName}) under category id (${category?.id}) named (${category?.name}) `;

      const { data } = await toast.promise(
        axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/seller/requests/create`,
          {
            description: message,
            receiver: 0,
            role: 2,
          },
          {
            headers: {
              Authorization: tok,
            },
          }
        ),
        {
          pending: "Adding Sub Category request...",
          success: "Sub Category request added Successfully!",
          error: {
            render({ data }) {
              if (data?.response?.status === 401) {
                dispatch(logout());
                return "Session Expired";
              } else {
                return (
                  data?.response?.data?.error ||
                  "Failed to add Sub Category request."
                );
              }
            },
          },
        }
      );
      document.getElementById("sub_category_modal").close();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        className="text-start ml-2 mt-1 text-neutral hover:text-[#bc8ffc] w-fit"
        onClick={() =>
          document.getElementById("sub_category_modal").showModal()
        }
      >
        Request a new sub-category?
      </button>
      <dialog id="sub_category_modal" className="modal">
        <div className="modal-box">
          <h2 className="font-semibold text-xl my-2">
            Request new sub category in {category?.name}
          </h2>
          <FormField
            title="Enter new Sub Category name"
            value={subCategoryName}
            inputHandler={(e) => {
              setSubCategoryName(e.target.value);
            }}
          />
          <div className="flex w-full justify-center gap-4">
            {/* if there is a button in form, it will close the modal */}
            <form method="dialog">
              <button className=" btn secondary-btn">Cancel</button>
            </form>
            <button
              className=" btn primary-btn"
              onClick={() => {
                requestNewCategory();
              }}
            >
              Make request
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export const RequestNewCompanyModal = () => {
  const dispatch = useDispatch();
  const { tok } = useSelector((state) => state.user);
  const [companyName, setCompanyName] = useState();
  const [companyNumber, setCompanyNumber] = useState();
  const [companyWhatsappNumber, setCompanyWhatsappNumber] = useState();
  const [companyEmail, setCompanyEmail] = useState();

  const requestNewCompany = async () => {
    try {
      if (!companyName?.length) {
        toast.error("Please enter a valid company name");
      } else if (companyNumber?.length !== 10) {
        toast.error("Please enter a valid contact number");
      } else if (companyWhatsappNumber?.length !== 10) {
        toast.error("Please enter a valid whatsapp number");
      } else if (validateEmail(companyEmail)) {
        toast.error("Please enter a valid email address");
      }
      let message = `I want to request a new company  : 
        \nCompany Name : ${companyName}
        \nCompany Toll Free : ${companyNumber}
        \nCompany Whatsapp Number : ${companyWhatsappNumber}
        \nCompany Email : ${companyEmail}`;

      const { data } = await toast.promise(
        axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/seller/requests/create`,
          {
            description: message,
            receiver: 0,
            role: 2,
          },
          {
            headers: {
              Authorization: tok,
            },
          }
        ),
        {
          pending: "Adding Company request...",
          success: "Company request added Successfully!",
          error: {
            render({ data }) {
              if (data?.response?.status === 401) {
                dispatch(logout());
                return "Session Expired";
              } else {
                return (
                  data?.response?.data?.error ||
                  "Failed to add Company request."
                );
              }
            },
          },
        }
      );
      document.getElementById("company_modal").close();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        className="text-start ml-2 mt-1 text-neutral hover:text-[#bc8ffc] w-fit"
        onClick={() => document.getElementById("company_modal").showModal()}
      >
        Request a new company?
      </button>
      <dialog id="company_modal" className="modal">
        <div className="modal-box">
          <h2 className="font-semibold text-xl my-2">Request new company</h2>
          <FormField
            title="Enter new company name"
            inputHandler={(e) => {
              setCompanyName(e.target.value);
            }}
            value={companyName}
            required={true}
          />
          <FormField
            title="Enter company number"
            value={companyNumber}
            inputHandler={(e) => {
              setCompanyNumber(e.target.value);
            }}
            required={true}
          />
          <FormField
            title="Enter company whatsapp number"
            value={companyWhatsappNumber}
            inputHandler={(e) => {
              setCompanyWhatsappNumber(e.target.value);
            }}
            required={true}
          />
          <FormField
            title="Enter company email"
            value={companyEmail}
            inputHandler={(e) => {
              setCompanyEmail(e.target.value);
            }}
            required={true}
          />
          <div className="flex w-full justify-center gap-4">
            {/* if there is a button in form, it will close the modal */}
            <form method="dialog">
              <button className=" btn secondary-btn">Cancel</button>
            </form>
            <button
              className=" btn primary-btn"
              onClick={() => {
                requestNewCompany();
              }}
            >
              Make request
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

// export const RequestNewRewardsSchema = () => {
//   const [name, setName] = useState();
//   const [status, setStatus] = useState(1);
//   const [coinsPerItem, setCoinsPerItem] = useState();
//   return (
//     <>
//       <button
//         className="text-start ml-2 mt-1 text-neutral hover:text-[#bc8ffc] w-fit"
//         onClick={() => document.getElementById("reward_modal").showModal()}
//       >
//         Request a new reward schema?
//       </button>
//       <dialog id="reward_modal" className="modal">
//         <div className="modal-box">
//           <h2 className="font-semibold text-xl my-2">
//             Request new reward schema
//           </h2>
//           <FormField
//             title="Name"
//             inputHandler={(e) => {
//               // setCompanyName(e.target.value);
//             }}
//             required={true}
//           />
//           <label className="form-control w-full ">
//             <div className="label">
//               <span className="label-text font-semibold">
//                 Status <span className="text-red-500">*</span>
//               </span>
//             </div>
//             <select
//               className="select select-bordered bg-white"
//               onChange={(e) => {
//                 setStatus(e.target.value);
//               }}
//               defaultValue={1}
//             >
//               <option value={1}>Fixed Share</option>
//               <option value={2}>Fixed Percentage</option>
//               <option value={3}>Variable</option>
//             </select>
//           </label>
//           {status === 1 && <FormField title="Coins per item" type="number" />}
//           {status === 2 && (
//             <FormField
//               title="Coins Percentage per Item's Price"
//               type="number"
//             />
//           )}
//           {status === 3 && (
//             <>
//               <FormField
//                 title="Coins Percentage per Item's Price"
//                 type="number"
//               />
//               <FormField title="Coins" type="number" />
//             </>
//           )}

//           <div className="flex w-full justify-center gap-4">
//             {/* if there is a button in form, it will close the modal */}
//             <form method="dialog">
//               <button className=" btn secondary-btn">Cancel</button>
//             </form>
//             <button className=" btn primary-btn">Make request</button>
//           </div>
//         </div>
//       </dialog>
//     </>
//   );
// };
