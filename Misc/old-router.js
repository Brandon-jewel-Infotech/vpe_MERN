const { createConnection } = require("mysql");
const {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  fetchOnlyCategories,
} = require("../controllers/categoryControllers");
const {
  fetchCompany,
  createCompany,
  deleteCompany,
  updateCompany,
} = require("../controllers/companyControllers");
const {
  updateRequest,
  fetchrequests,
  fetchrequestsById,
} = require("../controllers/requestController");
const {
  createSubCategory,
  deleteSubCategory,
} = require("../controllers/subCategoryControllers");
const {
  createUser,
  fetchUsers,
  searchByCode,
  updateById,
  deleteById,
  login,
  getConnections,
  analytics,
  createEmployee,
  deleteEmployee,
  getEmployee,
} = require("../controllers/userControllers");
const auth = require("../utils/auth");
const authAll = require("../utils/authAll");
const {
  createNotification,
  getNotification,
} = require("../controllers/notificationController");

const multerUpload = require("../middleware/aadharSaver");

//1: Admin , 2 : business , 3 : Mod , 4 : employee

const router = require("express").Router();

// create a new record
router.post("/users", createUser);
// router.post("/users", multerUpload.single("file"), createUser);

// Add a new employee
router.post("/employees/add", authAll(), createEmployee);
// Delete employee
router.delete("/employees/delete/:id", authAll(), deleteEmployee);
// GEt employees
router.post("/employees", authAll(), getEmployee);

router.get("/", (req, res) => {
  res.send("Working");
});

// get all records
router.post("/users/fetch", auth(1), fetchUsers);
// get a record by ID
router.get("/users/:id", auth(1), searchByCode);
// update a record by ID
router.put("/users/", auth(1), updateById);
// delete a record by ID
router.delete("/users/:id", auth(1), deleteById);

router.post("/login", login);

router.post("/requests/edit", auth(1), updateRequest);
router.post("/requests/", auth(1), fetchrequests);
router.post("/requests/id/", auth(1), fetchrequestsById);

router.post("/connections/", auth(1), getConnections);

router.post("/analytics/", auth(1), analytics);

// Category routes start

router.post("/categories", auth(1), fetchCategories);
router.post("/category", fetchOnlyCategories);
router.post("/categories/create", auth(1), createCategory);
router.delete("/categories/delete/:id", auth(1), deleteCategory);
router.put("/categories/update/:id", auth(1), updateCategory);

// Category routes ends

// Sub Category routes start

router.post("/subcategories/create", auth(1), createSubCategory);
router.delete("/subcategories/delete/:id", auth(1), deleteSubCategory);

//Sub Category routes ends

// Company routes start

router.post("/company", auth(1), fetchCompany);
router.post("/company/create", auth(1), createCompany);
router.delete("/company/delete/:id", auth(1), deleteCompany);
router.put("/company/update/:id", auth(1), updateCompany);
//new Comment

//notifications routes
router.post("/notifications", createNotification);
router.post("/notification", getNotification);

// Company routes endsN
module.exports = router;
