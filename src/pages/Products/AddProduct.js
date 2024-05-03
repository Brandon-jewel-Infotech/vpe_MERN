import React, { useEffect, useRef, useState } from "react";
import PrimaryLayout from "../../Layout/PrimaryLayout";
import FormField from "../../components/FormField";
import axios from "axios";
import { useSelector } from "react-redux";
const AddProduct = () => {
  const imgRef = useRef();
  const { tok } = useSelector((state) => state.user);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [categoryValue, setCategoryValue] = useState();

  const [category, setCategory] = useState();
  const [company, setCompany] = useState();

  // to get categories , sub-categories and companies
  const getCategories = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}seller/categories`,
        {},
        {
          headers: {
            Authorization: tok,
          },
        }
      );
      setCategories(data[0]);
      setSubcategories(data[1]);
      setCompanies(data[2]);
    } catch (error) {
      console.error(error);
    }
  };

  //to get rewards
  const getRewards = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}seller/rewards`,
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

  useEffect(() => {
    getCategories();
    getRewards();
  }, []);

  return (
    <PrimaryLayout>
      <div className="flex flex-col mb-6">
        <h2 className="text-xl font-bold text-start mb-3">
          Add Product Details
        </h2>
        <h4 className="text-md text-start mb-3 lg:mb-0">
          Product &gt; Product Details
        </h4>
      </div>
      <div className="flex gap-10 max-lg:flex-col items-center bg-white">
        <div className="w-[98%] lg:w-[50%] h-full">
          <div className="bg-base-100 card card-body rounded-none shadow-xl">
            <FormField title="Product name" required={true} />
            <label className="form-control">
              <div className="label">
                <span className="label-text font-semibold">
                  Product Description <span className="text-red-500">*</span>
                </span>
              </div>
              <textarea className="textarea textarea-bordered mb-3 h-24 bg-white"></textarea>
            </label>
            <FormField title="Quantity Available" required={true} />
          </div>
        </div>
        <div className="bg-base-100 card w-[98%] lg:w-[50%] rounded-none shadow-xl">
          <div className="card-body">
            <div className="flex gap-4">
              <div className="w-full flex flex-col justify-start">
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text font-semibold">
                      Category <span className="text-red-500">*</span>
                    </span>
                  </div>
                  <select
                    className="select select-bordered bg-white"
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                  >
                    <option disabled selected>
                      Pick one
                    </option>
                    {categories?.map((category, index) => (
                      <option key={index} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </label>
                <RequestNewCategoryModal />
              </div>
              <div className="w-full flex flex-col justify-start">
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text font-semibold">
                      Sub-category <span className="text-red-500">*</span>
                    </span>
                  </div>
                  <select
                    className="select select-bordered bg-white"
                    onChange={(e) => {
                      setCategory(e.target.value);
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
                <button className="text-start ml-2 mt-1 text-neutral hover:text-[#bc8ffc] w-fit">
                  Request a new sub-category?
                </button>
              </div>
            </div>
            <div className="flex gap-4">
              <FormField title="Price for Business" required={true} />
              <FormField title="Price for Customer" required={true} />
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
                    <span className="label-text font-semibold">
                      Rewards <span className="text-red-500">*</span>
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
                    {rewards?.map((reward, index) => (
                      <option key={index} value={reward.id}>
                        {reward.name}
                      </option>
                    ))}
                  </select>
                </label>
                <RequestNewRewardsSchema />
              </div>
            </div>
            <label className="form-control">
              <div className="label">
                <span className="label-text font-semibold">Product Images</span>
                {/* <span className="label-text-alt text-error">Alt label</span> */}
              </div>
              <div
                className="textarea textarea-bordered flex items-center justify-center h-20 bg-white"
                onClick={() => {
                  imgRef?.current?.click();
                }}
                onDragOver={(e) => e.preventDefault()}
                onDragLeave={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.files[0]) {
                    // const imgArray = Array.from(e.dataTransfer.files);
                    // setImages((currImages) => {
                    //   let newImagesArr = [...currImages, ...imgArray];
                    //   const urlArr = newImagesArr.map((image) =>
                    //     URL.createObjectURL(image)
                    //   );
                    //   setUploadedImageUrls(urlArr);
                    //   return newImagesArr;
                    // });
                  }
                }}
              >
                Drop your files here or browse
                <input
                  type="file"
                  accept=".jpg, .png, .jpeg, .gif"
                  multiple
                  hidden
                  ref={imgRef}
                  onChange={(e) => {
                    if (e.currentTarget.files[0]) {
                      const imgArray = Array.from(e.currentTarget.files);
                      // setImages((currImages) => {
                      // let newImagesArr = [...currImages, ...imgArray];
                      // const urlArr = newImagesArr.map((image) =>
                      //   URL.createObjectURL(image)
                      // );
                      // setUploadedImageUrls(urlArr);
                      // return newImagesArr;
                      // });
                    }
                  }}
                />
              </div>
            </label>
            <button className="primary-btn mt-5">Add Product</button>
          </div>
        </div>
      </div>
    </PrimaryLayout>
  );
};

export default AddProduct;

export const RequestNewCategoryModal = () => {
  const [categoryName, setCategoryName] = useState();
  const { tok } = useSelector((state) => state.user);
  const requestNewCategory = async () => {
    try {
      let message = `I want to request a new category : ${categoryName}`;

      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}seller/requests/create`,
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
      );
      alert(data.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <button
        className="text-start ml-2 mt-1 text-neutral hover:text-[#bc8ffc] w-fit"
        onClick={() => document.getElementById("category_modal").showModal()}
      >
        Request a new category?
      </button>
      <dialog id="category_modal" className="modal">
        <div className="modal-box">
          <h2 className="font-semibold text-xl my-2">Request new category</h2>
          <FormField
            title="Enter new category name"
            inputHandler={(e) => {
              setCategoryName(e.target.value);
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
  const { tok } = useSelector((state) => state.user);
  const [companyName, setCompanyName] = useState();
  const [companyTollFreeNumber, setCompanyTollFreeNumber] = useState();
  const [companyWhatsappNumber, setCompanyWhatsappNumber] = useState();
  const [companyEmail, setCompanyEmail] = useState();

  const requestNewCompany = async () => {
    try {
      let message = "";
      if (
        companyName?.length > 0 &&
        companyTollFreeNumber?.length > 0 &&
        companyWhatsappNumber?.length > 0 &&
        companyEmail?.length > 0
      ) {
        message = `I want to request a new company  : 
        \nCompany Name : ${companyName}
        \nCompany Toll Free : ${companyTollFreeNumber}
        \nCompany Whatsapp Number : ${companyWhatsappNumber}
        \nCompany Email : ${companyEmail}`;
      } else {
        return alert("Please fill data before submitting ");
      }

      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}seller/requests/create`,
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
      );
      alert(data.message);
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
            required={true}
          />
          <FormField
            title="Enter company toll free number"
            inputHandler={(e) => {
              setCompanyTollFreeNumber(e.target.value);
            }}
            required={true}
          />
          <FormField
            title="Enter company whatsapp number"
            inputHandler={(e) => {
              setCompanyWhatsappNumber(e.target.value);
            }}
            required={true}
          />
          <FormField
            title="Enter company email"
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

export const RequestNewRewardsSchema = () => {
  const [name, setName] = useState();
  const [status, setStatus] = useState(1);
  const [coinsPerItem, setCoinsPerItem] = useState();
  return (
    <>
      <button
        className="text-start ml-2 mt-1 text-neutral hover:text-[#bc8ffc] w-fit"
        onClick={() => document.getElementById("reward_modal").showModal()}
      >
        Request a new reward schema?
      </button>
      <dialog id="reward_modal" className="modal">
        <div className="modal-box">
          <h2 className="font-semibold text-xl my-2">
            Request new reward schema
          </h2>
          <FormField
            title="Name"
            inputHandler={(e) => {
              // setCompanyName(e.target.value);
            }}
            required={true}
          />
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text font-semibold">
                Status <span className="text-red-500">*</span>
              </span>
            </div>
            <select
              className="select select-bordered bg-white"
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            >
              <option value={1} selected>
                Fixed Share
              </option>
              <option value={2}>Fixed Percentage</option>
              <option value={3}>Variable</option>
            </select>
          </label>
          {status === 1 && <FormField title="Coins per item" type="number" />}
          {status === 2 && (
            <FormField
              title="Coins Percentage per Item's Price"
              type="number"
            />
          )}
          {status === 3 && (
            <>
              <FormField
                title="Coins Percentage per Item's Price"
                type="number"
              />
              <FormField title="Coins" type="number" />
            </>
          )}

          <div className="flex w-full justify-center gap-4">
            {/* if there is a button in form, it will close the modal */}
            <form method="dialog">
              <button className=" btn secondary-btn">Cancel</button>
            </form>
            <button className=" btn primary-btn">Make request</button>
          </div>
        </div>
      </dialog>
    </>
  );
};
