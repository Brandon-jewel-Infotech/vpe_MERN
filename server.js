const express = require("express");
const cors = require("cors");
// const { Server } = require("socket.io");
const app = express();
// const http = require("http").Server(app);
// const { message } = require("./socket");
// const connection = require("./utils/dbcon");
require("dotenv").config();

//new routes
const sellerRouter = require("./routes/sellerRoutes");
const employeeRouter = require("./routes/employeeModRoutes");
const router = require("./routes/router");
const sequelize = require("./utils/database");

//models
// const Address = require("./models/addressDetailsModel");
// const Bank = require("./models/bankDetailsModel");
// const Cart = require("./models/cartModel");
// const Category = require("./models/categoriesModel");
// const Coins = require("./models/coinsModel");
// const Company = require("./models/companyModel");
// const Employee = require("./models/employeesModel");
// const Notification = require("./models/notificationsModel");
// const OrderList = require("./models/orderListModel");
// const Order = require("./models/ordersModel");
// const Product = require("./models/productsModel");
// const Request = require("./models/requestModel");
// const Rewards = require("./models/rewardsModel");
// const SubCategory = require("./models/subCategoriesModel");
// const Transaction = require("./models/transactionsModel");
// const User = require("./models/userModel");
// const Variant = require("./models/variantsModel");

app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));
app.use(cors());

const port = process.env.PORT || 5500;

app.use("/public/uploads", express.static("public/uploads"));
app.use("/public/products", express.static("public/products"));
app.use(router);
app.use("/seller", sellerRouter);
app.use("/employee", employeeRouter);

sequelize
  .sync({})
  .then(() => {
    console.log("DB synced");
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });
