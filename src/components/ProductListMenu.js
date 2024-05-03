import React, { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const ProductListMenu = ({ productId }) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
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
        <li>
          <a>Delete Product</a>
        </li>
        <li
          onClick={() => {
            navigate(`/product-list/add-variant/${productId}`);
          }}
        >
          <a>Add a variant</a>
        </li>
        <li>
          <a>Edit Product Details</a>
        </li>
        <li>
          <a>Mark out of stock</a>
        </li>
      </ul>
    </div>
  );
};

export default ProductListMenu;
