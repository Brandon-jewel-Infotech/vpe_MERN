const express = require("express");
const router = express.Router();

//Middlewares
const userAuthentication = require("../middleware/auth");
const roleAuthentication = require("../middleware/authRole");

//Controllers
const cartController = require("../controllers/cartController");
const requestController = require("../controllers/requestController");
const rewardsController = require("../controllers/rewardsControllers");
const sellerCategoryController = require("../controllers/sellerCategoryControllers");
const sellerOrderController = require("../controllers/sellerOrderControllers");
const userController = require("../controllers/userControllers");
const upload = require("../middleware/multerMiddleware");
const {
  deleteAnnouncement,
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
} = require("../controllers/announcementController");
const {
  getSellerStatistics,
  getSellerChartData,
} = require("../controllers/analytics");

//Routes

//seller category routes
router.post(
  "/categories",
  roleAuthentication(2),
  sellerCategoryController.fetchSellerCategories
);

router.post(
  "/products",
  roleAuthentication(2),
  upload.array("images"),
  sellerCategoryController.addProduct
);

router.post(
  "/products/:prodId/variants",
  roleAuthentication(2),
  upload.array("images"),
  sellerCategoryController.addVariant
);

router.patch(
  "/products/:prodId/outofstock",
  roleAuthentication(2),
  sellerCategoryController.markOutOfStock
);

// router.get(
//   "/get-all-products",
//   userAuthentication,
//   sellerCategoryController.getAllProducts
// );

router.post(
  //tested
  "/getproducts",
  roleAuthentication(2),
  sellerCategoryController.getSellerProducts
);
router.post(
  "/products/edit/",
  roleAuthentication(2),
  sellerCategoryController.editProduct
);
router.put(
  "/products/update/:id",
  roleAuthentication(2),
  sellerCategoryController.updateProduct
);

router.delete(
  "/products/delete/:id",
  roleAuthentication(2),
  sellerCategoryController.deleteSellerProducts
);
router.delete(
  "/variants/delete/:id",
  roleAuthentication(2),
  sellerCategoryController.deleteSellerVariants
);

router.put(
  "/variants/update/:id",
  roleAuthentication(2),
  sellerCategoryController.updateSellerVariants
);

//Images routes
router.put(
  "/images",
  roleAuthentication(2),
  upload.array("images"),
  sellerCategoryController.addImages
);
router.delete(
  "/images/:id",
  roleAuthentication(2),
  sellerCategoryController.deleteImage
);

//order routes
// router.post(
//   "/orders",
//   roleAuthentication(2),
//   sellerOrderController.getSellerOrders
// );
// router.post(
//   "/orders/create",
//   roleAuthentication(2),
//   sellerOrderController.createSellerOrders
// );
// router.post(
//   "/orders/update",
//   roleAuthentication(2),
//   sellerOrderController.updateSellerOrders
// );
// router.post(
//   "/orders/cancel",
//   roleAuthentication(2),
//   sellerOrderController.cancelOrder
// );
// router.post(
//   "/order_requests",
//   userAuthentication,
//   sellerOrderController.getAllOrderlists
// );

// router.get(
//   "/admin_requests",
//   roleAuthentication(2),
//   sellerOrderController.getMyAllOrderlists
// );

//reward router (ALL TESTED AND WORKING)
router.post("/rewards", roleAuthentication(2), rewardsController.getReward); //tested
router.post(
  //tested
  "/rewards/create",
  roleAuthentication(2),
  rewardsController.createReward
);
router.post(
  "/rewards/update", //tested
  roleAuthentication(2),
  rewardsController.updateReward
);
router.post(
  "/rewards/delete", //tested
  roleAuthentication(2),
  rewardsController.deleteReward
);

router.post(
  "/getvariants",
  roleAuthentication(2),
  sellerCategoryController.getSellerVariants
);
router.post(
  "/all",
  userAuthentication,
  sellerCategoryController.getAllProducts
);

//Request routes (all tested)
router.post("/requests", userAuthentication, requestController.fetchRequests); //tested
router.post(
  //tested
  "/requests/create",
  userAuthentication,
  requestController.createRequest
);
router.post(
  //tested
  "/requests/id",
  userAuthentication,
  requestController.fetchRequestsById
);

router.post(
  //tested
  "/connections",
  roleAuthentication(2),
  userController.getConnections
);
router.post(
  "/connections/update",
  roleAuthentication(2),
  userController.editConnections
);

router.post("/announcements", roleAuthentication(2), createAnnouncement);
router.get("/announcements", roleAuthentication(2), getAnnouncements);
router.delete("/announcements/:id", roleAuthentication(2), deleteAnnouncement);
router.put("/announcements/:id", roleAuthentication(2), updateAnnouncement);

// Statistics
router.get("/statistics", roleAuthentication(2), getSellerStatistics);

router.get("/chart-data", roleAuthentication(2), getSellerChartData);

module.exports = router;
