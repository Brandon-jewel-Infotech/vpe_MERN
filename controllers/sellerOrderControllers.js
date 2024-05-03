const connection = require("../utils/dbcon");
const fs = require("fs");
const sequelize = require("../utils/database");

//models
const Order = require("../models/ordersModel");
const Product = require("../models/productsModel");
const User = require("../models/userModel");
const Notification = require("../models/notificationsModel");
const OrderList = require("../models/orderListModel");

//sequelized
exports.getSellerOrders = async (req, res) => {
  try {
    const sellerOrders = await Order.findAll({
      attributes: ["id", "createdAt", "updatedAt", "reciever"],
      include: [
        {
          model: Product,
          as: "product",
          attributes: ["name", "image"],
        },
        {
          model: User,
          as: "customer",
          attributes: ["name", "email", "contact"],
        },
      ],
      where: {
        reciever: req.user.userId,
      },
      order: [["createdAt", "DESC"]],
    });

    const createdByOrders = await Order.findAll({
      attributes: ["id", "createdAt", "updatedAt", "reciever"],
      include: [
        {
          model: Product,
          as: "product",
          attributes: ["name", "image"],
        },
        {
          model: User,
          as: "customer",
          attributes: ["name", "email", "contact"],
        },
      ],
      where: {
        createdBy: req.user.userId,
      },
      order: [["createdAt", "DESC"]],
    });

    res.json([...sellerOrders, ...createdByOrders]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//sequelized
exports.createSellerOrders = async (req, res) => {
  try {
    const { createdBy, reciever, prod_id, qty, prices } = req?.body;
    let stage = 1;
    if (req?.body?.stage) stage = req.body.stage;
    let variant_id = 0;
    if (req?.body?.variant_id) variant_id = req.body.variant_id;
    const order_id = randomNumber(); // Assuming you have a function for generating random numbers

    await Order.create({
      createdBy,
      reciever,
      stage,
      prod_id,
      qty,
      variant_id,
      prices,
      group_id: order_id,
    });

    res.status(200).json({ message: "Successfully ordered" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

//sequelized
exports.cancelOrder = async (req, res) => {
  try {
    const { reciever, id } = req?.body;
    let stage = 1;
    if (req?.body?.stage) stage = req.body.stage;
    let variant_id = 0;
    if (req?.body?.variant_id) variant_id = req.body.variant_id;
    const content = "Your order has been cancelled";

    await Promise.all([
      Order.destroy({ where: { id } }),
      Notification.create({ content, sender: req.user.userId, reciever }),
    ]);

    res.status(200).json({ message: "Order Declined" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Stages of order :
/*
 * 1 :  Pending
 * 2 :  Accepted
 * 3 :  Payment received
 * 4 :  Order completed
 * 5 :  Declined
 * 6 :  Cancelled By User
 */

function createFileFromBase64(base64Data, filePath) {
  // Remove the data URL prefix from the base64 data
  const base64DataWithoutPrefix = base64Data.replace(
    /^data:image\/\w+;base64,/,
    ""
  );

  // Create a buffer from the base64 data
  const buffer = Buffer.from(base64DataWithoutPrefix, "base64");

  // Write the buffer to a file
  fs.writeFile(filePath, buffer, (error) => {
    if (error) {
      console.log("Error creating file:", error);
      return false;
    } else {
      console.log("File created successfully.");
      return true;
    }
  });
}

exports.updateSellerOrders = async (req, res) => {
  const { stage, order_id, id, reciever } = req?.body;
  console.log(req.body);
  console.log({ id });
  let image = "";
  let content = "";
  if (req?.body?.image) {
    created = createFileFromBase64(
      req?.body?.image,
      `./public/uploads/txns/${order_id}.jpg`
    );
    if (created) image = `./public/uploads/txns/${order_id}.jpg`;
  }

  let sql2 = "";
  let sql3 = "";
  if (stage === 3) {
    sql2 = `insert into transactions (order_id,txn_image) values (?,?) `;
  }
  if (stage === 4) {
    sql2 = `update products `;
  }
  if (stage === 5) {
    content = `Order Declined`;
  }
  // const sql1 = "update orders set stage = ?  where id = ?; insert into notifications(content,sender,reciever) values(?,?,?) ";+
  sql3 =
    "update orders set stage = ?  where id = ?; update users set wallet = wallet+? where id = ?";

  // const sql = "update orders set stage = ?  where id = ?; insert into notifications(content,sender,reciever) values(?,?,?) ";+
  // Add sql2 to post data into transactions table for admin to approve
  // Removing for now
  // sql + sql3,
  connection.query(sql3, [stage, id, reciever], (err, result) => {
    console.log(
      `update orders set stage = ?  where id = %`
        .replace("?", stage)
        .replace("%", id)
    );
    if (err) throw err;
    console.log(result);
    return res.status(200).json({ message: "Successfully updated" });
  });
  // connection.end();
};

const randomNumber = () => {
  return Math.ceil(Math.random() * 999999) + 1000;
};

//sequelized
exports.createOrderslist = async (req, res) => {
  const { reciever, prod_id, qty, prices } = req?.body;
  let stage = 1;
  if (req?.body?.stage) stage = req.body.stage;
  let variant_id = 0;
  if (req?.body?.variant_id) variant_id = req.body.variant_id;
  const order_group = randomNumber();

  let data = [];
  for (let i = 0; i < prod_id.split(",").length; i++) {
    data.push({
      createdBy: req.user.userId,
      reciever: reciever.split(",")[i],
      stage: stage.split(",")[i],
      prod_id: prod_id.split(",")[i],
      qty: qty.split(",")[i],
      variant_id: variant_id.split(",")[i],
      prices: prices.split(",")[i],
      order_group: order_group,
    });
  }

  try {
    const result = await OrderList.bulkCreate(data);
    res.status(200).json({ message: "Successfully requested order", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// to get specific order recieved to the seller (seller controller) sequelized
exports.getOrderlists = async (req, res) => {
  const { id } = req.body;

  try {
    // Fetching product IDs for the given order group
    const { prod_id } = await OrderList.findOne({
      attributes: [
        [sequelize.fn("GROUP_CONCAT", sequelize.col("prod_id")), "prod_id"],
      ],
      where: { order_group: id },
      raw: true,
    });

    // Fetching orders along with associated product and user details
    const orders = await OrderList.findAll({
      attributes: ["qty", "prices", "variant_id", "prod_id", "createdAt"],
      where: { order_group: id },
      include: [
        {
          model: Product,
          attributes: ["name", "image", "created_by"],
          where: { id: prod_id.split(",") },
        },
        {
          model: User,
          attributes: ["name", "id", "email", "contact"],
        },
      ],
      raw: true,
    });

    // Mapping the output as required
    const output = orders.map((order) => ({
      qty: parseInt(order.qty),
      prices: parseInt(order.prices),
      variant_id: parseInt(order.variant_id),
      prod_id: parseInt(order.prod_id),
      customer_email: order["User.email"],
      customer_name: order["User.name"],
      customer_id: order["User.id"],
      customer_contact: order["User.contact"],
      prod_name: order["Product.name"],
      createdBy: order.createdBy,
      prod_image: order["Product.image"].split(",")[0], // Assuming image is comma-separated list
      stage: parseInt(order.stage),
      createdAt: order.createdAt,
    }));

    res.json(output);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// to get all orders recieved to the seller (seller controller) sequelized
exports.getAllOrderlists = (req, res) => {
  // const {order_id} = req.body
  // console.log(req.user);
  // const query = `SELECT ol.*, u.name 'customer_name' , u.email 'customer_email' from order_list ol JOIN users u on ol.createdBy = u.id `;
  // const query=`SELECT DISTINCT GROUP_CONCAT(ol.createdBy) 'createdBy',GROUP_CONCAT(ol.reciever) 'reciever',GROUP_CONCAT(ol.prod_id) 'prod_id' ,GROUP_CONCAT(ol.stage) 'stage', GROUP_CONCAT(ol.qty) 'qty',GROUP_CONCAT(ol.variant_id) 'variant_id',group_concat(ol.order_group) 'order_id', u.name 'customer_name' , u.email 'customer_email' from order_list ol JOIN users u on ol.createdBy = u.id group by order_group; `
  const query = `SELECT DISTINCT ol.createdBy 'createdBy',GROUP_CONCAT(ol.reciever) 'reciever',GROUP_CONCAT(ol.prod_id) 'prod_id' ,GROUP_CONCAT(ol.stage) 'stage', GROUP_CONCAT(ol.qty) 'qty',GROUP_CONCAT(ol.variant_id) 'variant_id',ol.order_group 'order_id', ol.createdAt 'createdAt',ol.prices 'prices' , u.name 'customer_name' ,group_concat(ol.id) 'id', u.email 'customer_email' from order_list ol JOIN users u on ol.reciever = u.id  `;
  // const sql = `${query} where   ol.createdBy like '%?%' group by order_group`

  // const sql = `${query} where  reciever = ? `
  const sql = `${query} where   ol.reciever like '%?%'  group by order_group`;
  // console.log(req.user.userId)

  connection.query(sql, [req.user.userId], (err, results) => {
    if (err) throw err;
    console.log(results);
    res.json(results);
    // console.log(sql)
    // console.log({sql})
  });
};

// to get the sellers customer's list of orders seller controller (sequelized)
exports.getMyAllOrderlists = async (req, res) => {
  try {
    const orders = await OrderList.findAll({
      attributes: [
        [
          sequelize.fn("DISTINCT", sequelize.col("order_list.createdBy")),
          "createdBy",
        ],
        [
          sequelize.fn("GROUP_CONCAT", sequelize.col("order_list.receiver")),
          "receiver",
        ],
        [
          sequelize.fn("GROUP_CONCAT", sequelize.col("order_list.prod_id")),
          "prod_id",
        ],
        [
          sequelize.fn("GROUP_CONCAT", sequelize.col("order_list.stage")),
          "stage",
        ],
        [sequelize.fn("GROUP_CONCAT", sequelize.col("order_list.qty")), "qty"],
        [
          sequelize.fn("GROUP_CONCAT", sequelize.col("order_list.variant_id")),
          "variant_id",
        ],
        ["order_group", "order_id"],
        [sequelize.literal("MAX(`order_list`.`createdAt`)"), "createdAt"], // Specify the createdAt column from order_lists table
        [sequelize.literal("MAX(`order_list`.`prices`)"), "prices"], // Aggregate prices separately
      ],
      include: [
        {
          model: User,
          attributes: ["name", "email"],
        },
      ],
      where: { createdBy: req.user.id },
      group: ["order_group", "order_list.createdBy"],
      raw: true,
    });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// to  change the status of the order by the seller (sequelized)
exports.updateOrderslists = async (req, res) => {
  const { reciever, prod_id, qty, prices } = req?.body;
  const { id } = req?.body;

  let stage = 1;
  if (req?.body?.stage) stage = req.body.stage;
  let variant_id = 0;
  let content = "";
  if (req?.body?.variant_id) variant_id = req.body.variant_id;

  if (stage === 2) {
    content = "Your order request has been processed successfully";
  } else if (stage === 3) {
    content =
      "Your order request has been processed and the seller can accept it partially";
  } else if (stage === 4) {
    content = "Your order request has been denied by the seller";
  } else {
    content = "The seller has replied to your requested order list";
  }

  try {
    // Start a transaction
    await sequelize.transaction(async (t) => {
      // Update order_list
      await OrderList.update(
        { qty, stage },
        { where: { id } },
        { transaction: t }
      );

      // Insert into notifications
      await Notifications.create(
        { content, sender: req.user.userId, reciever },
        { transaction: t }
      );

      // Commit the transaction
      await t.commit();

      res.status(200).json({ message: "Successfully updated order list" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//seller can change the order request and cancel the order (sequelized)
exports.cancelOrderslists = async (req, res) => {
  const { reciever, id } = req?.body;

  try {
    const content = "The seller has declined to your requested order list";

    // Start a transaction
    await sequelize.transaction(async (t) => {
      // Delete from order_list
      await OrderList.destroy({ where: { id } }, { transaction: t });

      // Insert into notifications
      await Notifications.create(
        { content, sender: req.user.userId, reciever },
        { transaction: t }
      );

      // Commit the transaction
      await t.commit();

      res.status(200).json({ message: "Order Declined" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
