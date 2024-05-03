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

//Routes

//Cart routes
router.post("/cart", roleAuthentication(2), cartController.createCart); //tested
router.get("/cart", roleAuthentication(2), cartController.getCart); //tested

//seller category routes
router.post(
  "/categories",
  roleAuthentication(2),
  sellerCategoryController.fetchSellerCategories
);
router.post(
  "/products/outofstock",
  roleAuthentication(2),
  sellerCategoryController.markOutOfStock
);

router.get("/get-all-products", sellerCategoryController.getAllProducts);

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
router.post(
  "/products/update/:id",
  roleAuthentication(2),
  sellerCategoryController.updateProduct
);
router.post(
  "/products/delete/:id",
  roleAuthentication(2),
  sellerCategoryController.deleteSellerProducts
);
router.post(
  "/variants/delete/:id",
  roleAuthentication(2),
  sellerCategoryController.deleteSellerVariants
);

//order routes
router.post(
  "/orders",
  roleAuthentication(2),
  sellerOrderController.getSellerOrders
);
router.post(
  "/orders/create",
  roleAuthentication(2),
  sellerOrderController.createSellerOrders
);
router.post(
  "/orders/update",
  roleAuthentication(2),
  sellerOrderController.updateSellerOrders
);
router.post(
  "/orders/cancel",
  roleAuthentication(2),
  sellerOrderController.cancelOrder
);
router.post(
  "/order_request",
  userAuthentication,
  sellerOrderController.getOrderlists
);
router.post(
  "/order_requests",
  userAuthentication,
  sellerOrderController.getAllOrderlists
);
router.post(
  "/order_requests/myorders",
  userAuthentication,
  sellerOrderController.getMyAllOrderlists
);
router.post(
  "/order_requests/create",
  userAuthentication,
  sellerOrderController.createOrderslist
);
router.post(
  "/order_requests/update",
  userAuthentication,
  sellerOrderController.updateOrderslists
);

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

module.exports = router;
