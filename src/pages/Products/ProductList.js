import React, { useEffect, useState } from "react";
import PrimaryLayout from "../../Layout/PrimaryLayout";
import { GoPlus } from "react-icons/go";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slice";
import ProductListMenu from "../../components/ProductListMenu";

const ProductList = () => {
  const { tok } = useSelector((state) => state.user);

  const [products, setProducts] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //  Get all products from the database.
  const getData = async () => {
    try {
      // setloading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}seller/getproducts`,
        {},
        {
          headers: {
            Authorization: `${tok}`,
          },
        }
      );

      if (data?.message === "Session expired") {
        dispatch(logout());
      }
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.log(error);
      // navigate("/logout");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <PrimaryLayout>
      <div className="card bg-white max-w-full">
        <div className="card-body p-0 max-w-fit 2xl:mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-start">Product List</h2>
              <p className="text-sm">Products {">"} Product List</p>
            </div>
            <button
              className="primary-btn font-semibold"
              onClick={() => {
                navigate("/add-product");
              }}
            >
              <GoPlus size={20} /> Add New
            </button>
          </div>
          {/* table starts here */}
          <div className="mt-3 overflow-x-auto">
            <table className="table table-zebra table-auto w-fit">
              <thead className="bg-neutral text-white">
                <tr>
                  <th>Product Id</th>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Business</th>
                  <th>Customer Price</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Subcategory</th>
                  <th>Company</th>
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
                        src={`${
                          process.env.REACT_APP_BACKEND_URL
                        }${item.image.slice(0, -1)}`}
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
                    <td>{item.instock ? "Yes" : "No"}</td>
                    <td>{item.availability}</td>
                    <td>
                      <ProductListMenu productId={item.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PrimaryLayout>
  );
};

export default ProductList;
