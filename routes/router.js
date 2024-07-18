const express = require("express");
const router = express.Router();

//Middlewares
const userAuthentication = require("../middleware/auth");
const roleAuthentication = require("../middleware/authRole");
const aadharSaver = require("../middleware/multerMiddleware");

//Controller
const categoryController = require("../controllers/categoryControllers");
const companyController = require("../controllers/companyControllers");
const requestController = require("../controllers/requestController");
const subCategoryController = require("../controllers/subCategoryControllers");
const userController = require("../controllers/userControllers");
const notificationController = require("../controllers/notificationController");

//routes (all tested)

//user routes (all tested)
router.get("/", (req, res) => {
  res.send("Working");
});
router.post("/users", aadharSaver.single("file"), userController.signup); //tested
router.delete(
  //tested
  "/employees/delete/:id",
  userAuthentication,
  userController.deleteEmployee
);
router.post("/employees", userAuthentication, userController.getEmployee); //tested
router.post(
  "/employees/create",
  userAuthentication,
  userController.createEmployee
); //tested
router.post("/users/fetch", roleAuthentication(1), userController.fetchUsers); //tested
router.get("/users/wallet", userAuthentication, userController.getWallet); //tested
router.get("/users/:id", roleAuthentication(1), userController.searchByCode); //tested
router.put("/users/", roleAuthentication(1), userController.updateById); //to update status of user //tested
router.delete("/users/:id", roleAuthentication(1), userController.deleteById); //tested

router.post("/login", userController.login); //tested

router.put(
  //tested
  "/requests/update/:id",
  roleAuthentication(1),
  requestController.updateRequest
);
router.post(
  //tested
  "/requests/",
  roleAuthentication(1),
  requestController.fetchRequests
);
router.post(
  //tested
  "/requests/id/",
  roleAuthentication(1),
  requestController.fetchRequestsById
);
router.post(
  "/connections",
  roleAuthentication(1),
  userController.getConnections
);

router.post("/analytics/", roleAuthentication(1), userController.analytics);

// Category routes (all tested)
router.post(
  //tested
  "/categories",
  roleAuthentication(1),
  categoryController.fetchCategories
);
router.post("/category", categoryController.fetchOnlyCategories); //tested
router.post(
  //tested
  "/categories/create",
  roleAuthentication(1),
  categoryController.createCategory
);
router.delete(
  //tested
  "/categories/delete/:id",
  roleAuthentication(1),
  categoryController.deleteCategory
);
router.put(
  //tested
  "/categories/update/:id",
  roleAuthentication(1),
  categoryController.updateCategory
);

// Sub Category routes (all tested)
router.post(
  //tested
  "/subcategories/create",
  roleAuthentication(1),
  subCategoryController.createSubCategory
);
router.delete(
  //tested
  "/subcategories/delete/:id",
  roleAuthentication(1),
  subCategoryController.deleteSubCategory
);

// Company routes (all tested)
router.post("/company", roleAuthentication(1), companyController.fetchCompany); //tested
router.post(
  //tested
  "/company/create",
  roleAuthentication(1),
  companyController.createCompany
);
router.delete(
  //tested
  "/company/delete/:id",
  roleAuthentication(1),
  companyController.deleteCompany
);
router.put(
  //tested
  "/company/update/:id",
  roleAuthentication(1),
  companyController.updateCompany
);

//notifications routes (all tested)
router.post(
  "/notification",
  userAuthentication,
  notificationController.createNotification
); // tested
router.get(
  "/notification",
  userAuthentication,
  notificationController.getNotification
); //teseted
router.delete(
  "/notification/:id",
  userAuthentication,
  notificationController.deleteNotification
); //teseted

module.exports = router;
