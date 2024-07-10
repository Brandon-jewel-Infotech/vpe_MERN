import axios from "axios";
import React, { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../redux/slice";

const ProductListMenu = ({ productId, instock, setProducts }) => {
  const { tok } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);

  const handleDelete = async () => {
    try {
      const res = await toast.promise(
        axios.delete(
          `${process.env.REACT_APP_BACKEND_URL}/seller/products/delete/${productId}`,
          {
            headers: {
              Authorization: tok,
            },
          }
        ),
        {
          pending: "Deleting Product...",
          success: "Product deleted Successfully!",
          error: {
            render({ data }) {
              if (data?.response?.status === 401) {
                dispatch(logout());
                return "Session Expired";
              } else {
                return (
                  data?.response?.data?.error || "Failed to delete Product."
                );
              }
            },
          },
        }
      );
      if (res?.status === 200) {
        setProducts((currProducts) => {
          return currProducts.filter((product) => product.id !== productId);
        });
      }
    } catch (e) {}
  };

  const handleUpdate = async () => {
    try {
      const res = await toast.promise(
        axios.patch(
          `${process.env.REACT_APP_BACKEND_URL}/seller/products/${productId}/outofstock`,
          { instock },
          {
            headers: {
              Authorization: tok,
            },
          }
        ),
        {
          pending: "Updating Product...",
          success: "Product Updated Successfully!",
          error: {
            render({ data }) {
              if (data?.response?.status === 401) {
                dispatch(logout());
                return "Session Expired";
              } else {
                return (
                  data?.response?.data?.error || "Failed to Update Product."
                );
              }
            },
          },
        }
      );
      if (res?.status === 200) {
        setProducts((currProducts) => {
          return currProducts.map((product) => {
            if (product.id === productId) {
              product.instock = res?.data?.instock;
            }
            return product;
          });
        });
      }
    } catch (e) {}
  };

  return (
    <div className="dropdown dropdown-left">
      <div
        tabIndex={0}
        role="button"
        onClick={() => {
          setShow((prev) => !prev);
        }}
        className="menu-button"
      >
        <HiDotsVertical />
      </div>
      <ul
        tabIndex={0}
        className={`menu-list dropdown-content z-[1] menu p-2 shadow bg-neutral rounded-box w-52 text-white ${
          !show ? "hidden" : ""
        }`}
      >
        <li onClick={handleDelete}>
          <button>Delete Product</button>
        </li>
        <li
          onClick={() => {
            navigate(`/products/variant/${productId}`, {
              state: { previousPage: location.pathname },
            });
          }}
        >
          <button>Add a variant</button>
        </li>
        <li
          onClick={() => {
            navigate(`/products/edit/${productId}`);
          }}
        >
          <button>Edit Product Details</button>
        </li>
        <li onClick={handleUpdate}>
          <button>Mark {instock ? "out of stock" : "in stock"}</button>
        </li>
      </ul>
    </div>
  );
};

export default ProductListMenu;
