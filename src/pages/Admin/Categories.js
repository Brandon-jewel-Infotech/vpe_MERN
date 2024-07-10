import React, { useEffect, useState } from "react";
import PrimaryLayout from "../../Layout/PrimaryLayout";
import { GoPlus } from "react-icons/go";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slice";
import FormField from "../../components/FormField";
import { CiEdit } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";

const Categories = () => {
  const dispatch = useDispatch();
  const { tok } = useSelector((state) => state.user);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [editModeId, setEditModeId] = useState("");
  const [updatedName, setUpdatedName] = useState("");

  const getCategories = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/categories`,
        {},
        {
          headers: {
            Authorization: tok,
          },
        }
      );

      setCategories(data);
    } catch (error) {
      if (error?.response?.status === 401) {
        toast.dismiss();
        toast.error("Session Expired");
        dispatch(logout());
      }
      console.log(error);
      // navigate("/logout");
    }
  };

  const updateCategoryNameHandler = async (id) => {
    try {
      const res = await toast.promise(
        axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/categories/update/${id}`,
          { name: updatedName },
          {
            headers: {
              Authorization: tok,
            },
          }
        ),
        {
          pending: "Updating Category Name...",
          success: "Category Name Updated Successfully!",
          error: {
            render({ data }) {
              if (data?.response?.status === 401) {
                dispatch(logout());
                return "Session Expired";
              } else {
                return (
                  data?.response?.data?.error ||
                  "Failed to Update Category Name."
                );
              }
            },
          },
        }
      );
      if (res?.status === 200) {
        setCategories((currCategories) => {
          return currCategories.map((category) => {
            if (category.id === id) {
              category.name = updatedName;
              return category;
            }
            return category;
          });
        });
        setUpdatedName("");
        setEditModeId("");
      }
    } catch (e) {}
  };

  const deleteSubCategoryHandler = async (id, categoryId) => {
    try {
      const res = await toast.promise(
        axios.delete(
          `${process.env.REACT_APP_BACKEND_URL}/subcategories/delete/${id}`,
          {
            headers: {
              Authorization: tok,
            },
          }
        ),
        {
          pending: "Deleting Sub Category...",
          success: "Sub Category deleted Successfully!",
          error: {
            render({ data }) {
              if (data?.response?.status === 401) {
                dispatch(logout());
                return "Session Expired";
              } else {
                return (
                  data?.response?.data?.error ||
                  "Failed to delete Sub Category."
                );
              }
            },
          },
        }
      );
      if (res?.status === 200) {
        setCategories((currCategories) => {
          return currCategories.map((category) => {
            if (category.id === categoryId) {
              category.subcategories = category?.subcategories?.filter(
                (subCat) => subCat.id !== id
              );
              return category;
            }
            return category;
          });
        });
      }
    } catch (e) {}
  };

  const deleteCategoryHandler = async (id) => {
    try {
      const res = await toast.promise(
        axios.delete(
          `${process.env.REACT_APP_BACKEND_URL}/categories/delete/${id}`,
          {
            headers: {
              Authorization: tok,
            },
          }
        ),
        {
          pending: "Deleting Category...",
          success: "Category deleted Successfully!",
          error: {
            render({ data }) {
              if (data?.response?.status === 401) {
                dispatch(logout());
                return "Session Expired";
              } else {
                return (
                  data?.response?.data?.error || "Failed to delete Category."
                );
              }
            },
          },
        }
      );
      if (res?.status === 200) {
        setCategories((currCategories) =>
          currCategories.filter((category) => category.id !== id)
        );
      }
    } catch (e) {}
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <AddCategory getCategories={getCategories} />
      <AddSubCategory
        category={selectedCategory}
        getCategories={getCategories}
      />
      <PrimaryLayout>
        <div className="card bg-white max-w-full">
          <div className="card-body p-0 2xl:mx-auto">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-start">Category List</h2>
                <p className="text-sm">Categories {">"} Category List</p>
              </div>
              <button
                className="primary-btn font-semibold"
                // onClick={() => {
                //   navigate("/add-product");
                // }}
                onClick={() =>
                  document.getElementById("add_category").showModal()
                }
              >
                <GoPlus size={20} /> Add New
              </button>
            </div>
            {/* table starts here */}
            <div className="mt-3 overflow-x-auto">
              <table className="table table-zebra table-auto w-full">
                <thead className="bg-neutral text-white">
                  <tr>
                    <th>Category Name</th>
                    <th>Sub Categories</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((category) => (
                    <tr key={category?.id}>
                      <td>
                        {editModeId === category.id ? (
                          <div className="flex justify-between items-center">
                            <FormField
                              value={updatedName}
                              inputHandler={(e) => {
                                setUpdatedName(e.target.value);
                              }}
                              placeholder={"Enter Category Name"}
                            />
                            <div className="flex items-center">
                              <button
                                className="btn btn-ghost text-success"
                                onClick={() =>
                                  updateCategoryNameHandler(category.id)
                                }
                              >
                                <FaCheck size={25} />
                              </button>
                              <button
                                className="btn btn-ghost text-error"
                                onClick={() => {
                                  setUpdatedName("");
                                  setEditModeId("");
                                }}
                              >
                                <MdOutlineCancel size={25} />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-between items-center">
                            {category?.name}{" "}
                            <button
                              className="btn btn-ghost btn-sm"
                              onClick={() => {
                                setUpdatedName(category.name);
                                setEditModeId(category.id);
                              }}
                            >
                              <CiEdit />
                            </button>
                          </div>
                        )}
                      </td>

                      <td>
                        <div className="flex gap-3 flex-wrap">
                          {category?.subcategories?.map((subCat) => (
                            <div
                              className="badge badge-outline badge-primary cursor-pointer hover:bg-error hover:text-white"
                              key={subCat?.id}
                              onClick={() => {
                                deleteSubCategoryHandler(
                                  subCat.id,
                                  category.id
                                );
                              }}
                            >
                              {subCat?.name}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td>
                        <div className=" flex items-center justify-around gap-5">
                          <button
                            className="secondary-btn text-white"
                            onClick={() => deleteCategoryHandler(category.id)}
                          >
                            Delete
                          </button>
                          <button
                            className="primary-btn text-white"
                            onClick={() => {
                              setSelectedCategory(category);
                              document
                                .getElementById("add_sub_category")
                                .showModal();
                            }}
                          >
                            Add Sub-Category
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </PrimaryLayout>
    </>
  );
};

export default Categories;

const AddCategory = ({ getCategories }) => {
  const dispatch = useDispatch();
  const { tok } = useSelector((state) => state.user);
  const [categoryName, setCategoryName] = useState("");

  const submitHandler = async () => {
    try {
      const res = await toast.promise(
        axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/categories/create`,
          { name: categoryName },
          { headers: { Authorization: tok } }
        ),
        {
          pending: "Adding Category...",
          success: "Category added Successfully!",
          error: {
            render({ data }) {
              if (data?.response?.status === 401) {
                dispatch(logout());
                return "Session Expired";
              } else {
                return data?.response?.data?.error || "Failed to add Category.";
              }
            },
          },
        }
      );
      if (res?.status === 201) {
        setCategoryName("");
        getCategories();
        document.getElementById("add_category").close();
      }
    } catch (e) {}
  };

  return (
    <dialog id="add_category" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-2">Add Category</h3>
        <FormField
          title={"Category Name"}
          placeholder={"Enter Category Name"}
          inputHandler={(e) => {
            setCategoryName(e.target.value);
          }}
          value={categoryName}
        />
        <div className="modal-action flex justify-between items-center">
          <form method="dialog">
            <button className="btn btn-error text-white">Close</button>
          </form>
          <button
            className="btn text-white btn-success"
            onClick={submitHandler}
          >
            Add
          </button>
        </div>
      </div>
    </dialog>
  );
};

const AddSubCategory = ({ category, getCategories }) => {
  const dispatch = useDispatch();
  const { tok } = useSelector((state) => state.user);
  const [subCategoryName, setSubCategoryName] = useState("");

  const submitHandler = async () => {
    try {
      const res = await toast.promise(
        axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/subcategories/create`,
          { name: subCategoryName, cat_id: category.id },
          { headers: { Authorization: tok } }
        ),
        {
          pending: "Adding Sub Category...",
          success: "Sub Category added Successfully!",
          error: {
            render({ data }) {
              if (data?.response?.status === 401) {
                dispatch(logout());
                return "Session Expired";
              } else {
                return (
                  data?.response?.data?.error || "Failed to add Sub Category."
                );
              }
            },
          },
        }
      );
      if (res?.status === 201) {
        setSubCategoryName("");
        getCategories();
        document.getElementById("add_sub_category").close();
      }
    } catch (e) {}
  };

  return (
    <dialog
      id="add_sub_category"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-2">
          Add Sub Category in {category.name}
        </h3>
        <FormField
          title={"Sub Category Name"}
          placeholder={"Enter Sub Category Name"}
          value={subCategoryName}
          inputHandler={(e) => {
            setSubCategoryName(e.target.value);
          }}
        />
        <div className="modal-action flex justify-between items-center">
          <form method="dialog">
            <button className="btn btn-error text-white ">Close</button>
          </form>
          <button
            className="btn text-white btn-success"
            onClick={submitHandler}
          >
            Add
          </button>
        </div>
      </div>
    </dialog>
  );
};
