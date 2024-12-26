const express = require("express");

const {
  getAllEmployeeProducts,
} = require("../controllers/sellerCategoryControllers");
const { getWallet } = require("../controllers/userControllers");

const authAll = require("../middleware/authRole");
const {
  updateRequest,
  fetchRequests,
  fetchRequestsById,
} = require("../controllers/requestController");
const { getAnnouncements } = require("../controllers/announcementController");

const router = express.Router();

router.get("/products/:id?", authAll(4), getAllEmployeeProducts);

router.get("/announcements", authAll(4), getAnnouncements);

router.put("/requests/update/:id", authAll(3), updateRequest);
router.post("/requests/", authAll(3), fetchRequests);
router.post("/requests/id/", authAll(3), fetchRequestsById);

module.exports = router;
