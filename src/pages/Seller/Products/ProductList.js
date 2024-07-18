import React, { useEffect, useState } from "react";
import PrimaryLayout from "../../../Layout/PrimaryLayout";
import { GoPlus } from "react-icons/go";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/slice";
import ProductListMenu from "../../../components/ProductListMenu";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";
import FallbackText from "../../../components/FallbackText";
import { GiCardboardBox } from "react-icons/gi";

const ProductList = () => {
  const { tok } = useSelector((state) => state.user);
  const [products, setProducts] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  const dispatch = useDispatch();

  //  Get all products from the database.
  const getData = async () => {
    setLoadingData(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/seller/getproducts`,
        {},
        {
          headers: {
            Authorization: `${tok}`,
          },
        }
      );

      setProducts(data);
    } catch (error) {
      if (error?.response?.status === 401) {
        toast.dismiss();
        toast.error("Session Expired");
        dispatch(logout());
      }
    }
    setLoadingData(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <PrimaryLayout>
      <div className="card bg-white max-w-full">
        <div className="card-body p-0 2xl:mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-start">Product List</h2>
              <p className="text-md">Products &gt; Product List</p>
            </div>
            <Link className="primary-btn font-semibold" to={"/add-product"}>
              <GoPlus size={20} /> Add New
            </Link>
          </div>
          {loadingData && (
            <div className="w-40 h-40 mx-auto">
              <Loading />
            </div>
          )}
          {!loadingData &&
            (products?.length ? (
              <div className="mt-3 overflow-x-auto min-h-64">
                <table className="table table-zebra table-auto ">
                  <thead className="bg-neutral text-center text-white">
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Image</th>
                      <th>B2B Price</th>
                      <th>B2C Price</th>
                      <th>Description</th>
                      <th>Category</th>
                      <th>Subcategory</th>
                      <th>Company</th>
                      <th>Variants</th>
                      <th>Out of stock</th>
                      <th>Available Quantity</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products?.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>
                          <img
                            className="w-[200px] rounded object-contain"
                            src={`${process.env.REACT_APP_BACKEND_URL}${
                              item.images?.length && item?.images[0]?.url
                            }`}
                            alt="product image"
                          />
                        </td>
                        <td>{item.price_b2b}</td>
                        <td>{item.price_b2c}</td>
                        <td
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        ></td>
                        <td>{item.category.name}</td>
                        <td>{item.subcategory.name}</td>
                        <td>{item.company.name}</td>
                        <td>{item.variants}</td>
                        <td>{!item.instock ? "Yes" : "No"}</td>
                        <td>{item.availability}</td>
                        <td>
                          <ProductListMenu
                            productId={item.id}
                            instock={item.instock}
                            setProducts={setProducts}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <FallbackText
                IconRef={GiCardboardBox}
                message={"No Product Available"}
                size={150}
              />
            ))}
        </div>
      </div>
    </PrimaryLayout>
  );
};

export default ProductList;
