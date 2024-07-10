// const { uploadProduct } = require("./controllers/seller/productsController");
const router = require("express").Router();
const { createCart, getCart } = require("../controllers/cartController");
const {
  fetchrequests,
  fetchrequestsById,
  createRequest,
} = require("../controllers/requestController");
const {
  getReward,
  createReward,
  updateReward,
  deleteReward,
} = require("../controllers/rewardsControllers");
const {
  fetchSellerCategories,
  getSellerProducts,
  deleteSellerProducts,
  getAllProducts,
  getSellerVariants,
  deleteSellerVariants,
  editProduct,
  markOutOfStock,
  updateProduct,
} = require("../controllers/sellerCategoryControllers");
const {
  getSellerOrders,
  createSellerOrders,
  updateSellerOrders,
  createOrderslist,
  getOrderlists,
  getAllOrderlists,
  getMyAllOrderlists,
  updateOrderslists,
  cancelOrderslists,
  cancelOrder,
} = require("../controllers/sellerOrderControllers");
const {
  getConnections,
  editConnections,
} = require("../controllers/userControllers");
const auth = require("../utils/auth");
const authAll = require("../utils/authAll");
const connection = require("../utils/dbcon");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/"); // Specify the directory where the uploaded images will be stored
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`; // Generate a unique filename
    cb(null, fileName);
  },
});

const upload = multer({ storage });

// Products CRUD

/*
{
  name: 'Saksham',
  price: 'Goyal',
  price_b2b: 'Goyal',
  quantity: 'Goyal',
  description: 'This is desc',
  company: 'Refrigerators',
  subcategory: 'AC',
  category: 'Mobile'
}
*/
//Create new Product
router.post(
  "/products/create",
  auth(2),
  upload.array("images[]"),
  (req, res) => {
    try {
      // console.log("request called from serverRouter.js line:43 ");
      // console.log(req.files);
      // console.log(req.body);
      // const { images } = req.files;
      // Process the uploaded images (e.g., save paths to the database)
      // console.log(req.files);
      urls = "";
      req.files.map((data) => {
        urls += data.path + ",";
      });
      console.log(urls);
      const {
        name,
        price,
        price_b2b,
        quantity,
        description,
        company,
        subcategory,
        category,
        reward_id,
      } = req?.body;
      // console.log(req.user);
      console.log(reward_id);
      const instock = req?.body?.instock ? 0 : 1;
      const sql =
        "INSERT INTO `products` ( `name`, `image`, `price_b2b`, `price_b2c`, `category_id`, `subcategory_id`, `company_id`, `availability`, `description` ,`instock`, `created_by`,`reward_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?);";

      connection.query(
        sql,
        [
          name,
          urls,
          parseInt(price_b2b),
          parseInt(price),
          category,
          subcategory,
          company,
          parseInt(quantity),
          description,
          instock,
          req.user.userId,
          reward_id,
        ],
        (err, result) => {
          if (err) throw err;
          res.status(200).json({ message: "Successfully Uploaded " });
        }
      );
      // res.status(200).json({ message: "Images uploaded successfully"});
    } catch (err) {
      console.log(err);
    }
  }
);
// Variants create
router.post(
  "/variants/create",
  auth(2),
  upload.array("images[]"),
  (req, res) => {
    try {
      // console.log("request called from serverRouter.js line:43 ");
      // console.log(req.files);
      // console.log(req.body);
      // const { images } = req.files;
      // Process the uploaded images (e.g., save paths to the database)
      // console.log(req.files);
      urls = "";
      req.files.map((data) => {
        urls += data.path + ",";
      });
      console.log(urls);
      const { name, price, price_b2b, prod_id, desc } = req?.body;
      // console.log(req.user);
      const instock = req?.body?.instock ? 0 : 1;
      const sql =
        "INSERT INTO `variants` ( `name`, `image`, `price_b2b`, `price_b2c`,description , `product_id`) VALUES (?, ?, ?,? ,?, ?);";

      connection.query(
        sql,
        [name, urls, parseInt(price_b2b), parseInt(price), desc, prod_id],
        (err, result) => {
          if (err) throw err;
          res.status(200).json({ message: "Successfully Uploaded " });
        }
      );
      // res.status(200).json({ message: "Images uploaded successfully"});
    } catch (err) {
      console.log(err);
    }
  }
);

//seller category routes
router.post("/categories", auth(2), fetchSellerCategories);
router.post("/products/outofstock", auth(2), markOutOfStock);
router.post("/getproducts", auth(2), getSellerProducts);
router.post("/products/edit/", auth(2), editProduct);
router.post("/products/update/:id", auth(2), updateProduct);
router.post("/products/delete/:id", auth(2), deleteSellerProducts);
router.post("/variants/delete/:id", auth(2), deleteSellerVariants);

//Orders router
router.post("/orders", auth(2), getSellerOrders);
router.post("/orders/create", auth(2), createSellerOrders);
router.post("/orders/update", auth(2), updateSellerOrders);
router.post("/orders/cancel", auth(2), cancelOrder);

router.post("/order_request", authAll(), getOrderlists);
router.post("/order_requests", authAll(), getAllOrderlists);
router.post("/order_requests/myorders", authAll(), getMyAllOrderlists);
router.post("/order_requests/create", authAll(), createOrderslist);
router.post("/order_requests/update", authAll(), updateOrderslists);
// router.post("/order_requests/cancel/", authAll(), cancelOrderslists);

//reward router
router.post("/rewards", auth(2), getReward);
router.post("/rewards/create", auth(2), createReward);
router.post("/rewards/update", auth(2), updateReward);
router.post("/rewards/delete", auth(2), deleteReward);

//Cart routes
router.post("/cart", auth(2), createCart);
router.get("/cart", auth(2), getCart);

//Orders router end

router.post("/getvariants", auth(2), getSellerVariants);
router.post("/all", authAll(), getAllProducts);

router.post("/requests", authAll(), fetchrequests);
router.post("/requests/create", authAll(), createRequest);
router.post("/requests/id/", authAll(), fetchrequestsById);

router.post("/connections/", auth(2), getConnections);
router.post("/connections/update", auth(2), editConnections);

const fetchCategories = (req, res) => {
  const { id } = req?.body;

  let condition = "";
  if (id) {
    condition = "WHERE c.id = ? ";
  }

  const sql =
    "SELECT c.id, c.name, GROUP_CONCAT(s.id,' ' , s.name) AS subcategories FROM categories c LEFT JOIN subcategory s ON c.id = s.cat_id ";
  const gb = " GROUP BY c.id, c.name";
  connection.query(sql + condition + gb, [id], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};
const fetchOnlyCategories = (req, res) => {
  const { id } = req?.body;

  let condition = "";
  if (id) {
    condition = "WHERE id = ? ";
  }

  const sql =
    "SELECT GROUP_CONCAT(id,'|',name) 'categories' FROM `categories`;";

  connection.query(sql + condition, [id], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

const createCategory = (req, res) => {
  const { name } = req?.body;

  const sql = "insert into categories(name) values(?)";

  connection.query(sql, [name], (err, result) => {
    if (err) throw err;
    res.json({ message: "Successfully Added" });
  });
};

const deleteCategory = (req, res) => {
  const { id } = req?.params;
  const sql = "delete from categories where id = ? ";
  console.log(id);
  connection.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.json(result);
    console.log(result);
  });
};

const updateCategory = (req, res) => {
  const { id, subcategoires } = req?.body;
  const sql = "update categories set subcategories = ? where id = ? ";
  connection.query(sql, [id, subcategoires], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

module.exports = router;
