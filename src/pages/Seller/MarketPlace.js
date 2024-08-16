import React, { useCallback, useEffect, useState } from "react";
import PrimaryLayout from "../../Layout/PrimaryLayout";
import MarketPlaceItem from "../../components/MarketPlaceItem";
import axios from "axios";
import FallbackText from "../../components/FallbackText";
import Loading from "../../components/Loading";
import { IoBagHandleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import FormField from "../../components/FormField";
import debounce from "../../utils/debounce";

const MarketPlace = () => {
  const { tok } = useSelector((state) => state.user);
  const [products, setProducts] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [keyword, setKeyword] = useState("");

  const getProducts = async (keyword) => {
    setLoadingData(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/seller/all`,
        { keyword },
        { headers: { Authorization: tok } }
      );

      setProducts(data);
    } catch (error) {
      // console.log(error);
    }
    setLoadingData(false);
  };

  const debouncedGetProducts = useCallback(
    debounce((nextValue) => {
      getProducts(nextValue);
    }, 300),
    []
  );

  useEffect(() => {
    if (keyword) {
      debouncedGetProducts(keyword);
    } else {
      getProducts();
    }

    return () => {};
  }, [keyword, debouncedGetProducts]);

  return (
    <PrimaryLayout>
      <div className="card bg-white ">
        <div className="card-body p-0">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-start mb-3">MarketPlace</h2>
            </div>
            <FormField
              name={"keyword"}
              placeholder={"Type to search..."}
              value={keyword}
              className={"max-w-52 ms-auto"}
              inputHandler={(e) => {
                setKeyword(e.target.value);
              }}
            />
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
          {loadingData && (
            <div className="w-40 h-40 mx-auto">
              <Loading />
            </div>
          )}
          {!loadingData &&
            (products?.length ? (
              <div className="flex flex-wrap gap-6 mt-4 justify-center lg:justify-start">
                {products?.map((product, ind) => (
                  <MarketPlaceItem key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <FallbackText
                IconRef={IoBagHandleOutline}
                message={"No Products Available in MarketPlace."}
              />
            ))}
        </div>
      </div>
    </PrimaryLayout>
  );
};

export default MarketPlace;
