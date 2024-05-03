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
const router = require("./routes/router");
const sequelize = require("./utils/database");

//models
const Address = require("./models/addressDetailsModel");
const Bank = require("./models/bankDetailsModel");
const Cart = require("./models/cartModel");
const Category = require("./models/categoriesModel");
const Coins = require("./models/coinsModel");
const Company = require("./models/companyModel");
const Employee = require("./models/employeesModel");
const Notification = require("./models/notificationsModel");
const OrderList = require("./models/orderListModel");
const Order = require("./models/ordersModel");
const Product = require("./models/productsModel");
const Request = require("./models/requestModel");
const Rewards = require("./models/rewardsModel");
const SubCategory = require("./models/subCategoriesModel");
const Transaction = require("./models/transactionsModel");
const User = require("./models/userModel");
const Variant = require("./models/variantsModel");

app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));
app.use(cors());

const port = process.env.PORT || 5500;

// const instance = app.listen(process.env.PORT, () => {
//   console.log("listening at backend");
// });
// // console.log(port)

// const server = new Server(instance, {
//   cors: {
//     origin: ["http://localhost:3000"],
//     methods: ["GET", "POST"],
//   },
//   allowEIO3: true, // false by default
// });

//routes

// app.use(router);
// app.use("/seller/", sellerRouter);
              
//new routes

app.use("/public/uploads", express.static("public/uploads"));
app.use(router);
app.use("/seller", sellerRouter);
// app.use("/seller", sellerRouter);

sequelize
  .sync({})
  .then(() => {
    console.log("DB synced");
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });

// // Add this middleware after defining your routes and before any error handlers
// app.use((err, req, res, next) => {
//   // console.log("request called from server.js line:21 ");
//   // console.log(req.user);
//   if (err instanceof multer.MulterError) {
//     // Multer error occurred

//     console.log("Multer Error:", err.field); // Log the unexpected field
//     res.status(400).json({ error: "Unexpected field in the request" });
//   } else {
//     console.log("Error : req.fields");
//     next(err); // Forward other errors to the default error handler
//   }
// });

// connection.connect(function (err) {
//   if (err) {
//     console.error("Error connecting: " + err.stack);
//     return;
//   }
//   connection.query(
//     `SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))`
//   );
//   console.log("Connected as id " + connection.threadId);
// });

// http.listen(port, () => {
//   console.log("Listening at : " + port);
// });
