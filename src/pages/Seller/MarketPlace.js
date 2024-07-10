import React, { useEffect, useState } from "react";
import PrimaryLayout from "../../Layout/PrimaryLayout";
import MarketPlaceItem from "../../components/MarketPlaceItem";
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";
// const products = [
//   {
//     availability: true,
//     name: "Product 1",
//     ratings: 4.5,
//     views: 100,
//     image: "https://dummyimage.com/300x200/000/fff&text=Product+1",
//     price: 29.99,
//   },
//   {
//     availability: false,
//     name: "Product 2",
//     ratings: 3.8,
//     views: 80,
//     image: "https://dummyimage.com/300x200/000/fff&text=Product+2",
//     price: 39.99,
//   },
//   {
//     availability: true,
//     name: "Product 3",
//     ratings: 4.2,
//     views: 120,
//     image: "https://dummyimage.com/300x200/000/fff&text=Product+3",
//     price: 49.99,
//   },
//   {
//     availability: true,
//     name: "Product 4",
//     ratings: 4.0,
//     views: 150,
//     image: "https://dummyimage.com/300x200/000/fff&text=Product+4",
//     price: 19.99,
//   },
//   {
//     availability: false,
//     name: "Product 5",
//     ratings: 4.7,
//     views: 90,
//     image: "https://dummyimage.com/300x200/000/fff&text=Product+5",
//     price: 59.99,
//   },
// ];

// const colors = [
//   "bg-red-500", // Red
//   "bg-green-500", // Green
//   "bg-blue-700", // Blue
//   "bg-yellow-300", // Yellow
//   "bg-violet-600", // Magenta
//   "bg-teal-300", // Teal
//   "bg-white", // White
//   "bg-black", // Black
// ];

// const productCategories = [
//   { name: "Electronics", count: 120 },
//   { name: "Clothing", count: 300 },
//   { name: "Books", count: 200 },
//   { name: "Home & Kitchen", count: 250 },
//   { name: "Sports & Outdoors", count: 150 },
// ];

// const genders = ["Male", "Female", "Kids", "Others"];

// const productBrands = [
//   "Nike",
//   "Apple",
//   "Samsung",
//   "Adidas",
//   "Sony",
//   "Amazon Basics",
//   "Microsoft",
//   "LG",
//   "Google",
// ];

const MarketPlace = () => {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/seller/get-all-products`
      );
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <PrimaryLayout>
      <div className="card bg-white ">
        <div className="card-body p-0">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-start mb-3">MarketPlace</h2>
            </div>

            {/* <button
              className="primary-btn font-semibold"
              onClick={() => {
                // navigate("/add-employee");
              }}
            >
              <GoPlus size={20} /> Add Newasd
            </button> */}
          </div>
          {/* Side bar */}
          {/* <div className="lg:flex flex-col gap-4 hidden">
          <div className="mr-4 bg-base-200 p-4  flex  rounded-sm">
            <input placeholder="Search for items" className="p-2 w-full" />
          </div>

          <div className="p-4 mr-4 bg-base-200">
            <div className="border-b py-1 mb-3 text-start font-bold">
              Colors
            </div>
            <div className="flex gap-2">
              {colors?.map((color, index) => (
                <div
                  key={index}
                  className={`h-[40px] w-[40px] border ${color} rounded-md cursor-pointer`}
                ></div>
              ))}
            </div>
          </div>
          <div className="p-4 mr-4 bg-base-200">
            <div className="border-b py-1 mb-3 text-start font-bold">
              Categories
            </div>
            <div className="flex flex-col w-full gap-2">
              {productCategories?.map((category, index) => (
                <div className="w-full flex" key={index}>
                  <input type="radio" name="category" value={category.name} />
                  <div className="flex w-full justify-between">
                    <label
                      htmlFor={category.name}
                      className="w-full text-start ml-3"
                    >
                      {category.name}
                    </label>
                    <p>({category.count})</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 mr-4 bg-base-200">
            <div className="border-b py-1 mb-3 text-start font-bold">
              Gender
            </div>
            <div className="flex flex-col w-full gap-2">
              {genders?.map((gender, index) => (
                <div className="w-full flex" key={index}>
                  <input type="radio" name="category" value={gender} />
                  <div className="flex w-full justify-between">
                    <label htmlFor={gender} className="w-full text-start ml-3">
                      {gender}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 mr-4 bg-base-200">
            <div className="border-b py-1 mb-3 text-start font-bold">
              Brands
            </div>
            <div className="flex flex-col w-full gap-2">
              {productBrands?.map((brand, index) => (
                <div className="w-full flex" key={index}>
                  <input type="radio" name="category" value={brand} />
                  <div className="flex w-full justify-between">
                    <label htmlFor={brand} className="w-full text-start ml-3">
                      {brand}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> */}

          {/* <div className="w-full flex justify-between p-4 bg-base-200 rounded">
            <div className="dropdown">
              <button
                tabIndex={0}
                role="button"
                className="btn p-2 border bg-white secondary-btn"
              >
                Features <IoIosArrowDown />
              </button>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a>Featured</a>
                </li>
                <li>
                  <a>Newest Items</a>
                </li>
                <li>
                  <a>Low To High</a>
                </li>
                <li>
                  <a>High To Low</a>
                </li>
                <li>
                  <a>Relevant</a>
                </li>
              </ul>
            </div>
            <button className="p-2 primary-btn">Add Product</button>
          </div> */}
          <div className="flex flex-wrap gap-6 mt-4 justify-center lg:justify-start">
            {products?.map((product, ind) => (
              <MarketPlaceItem key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </PrimaryLayout>
  );
};

export default MarketPlace;
