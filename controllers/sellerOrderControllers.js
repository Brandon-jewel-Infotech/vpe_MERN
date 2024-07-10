const connection = require("../utils/dbcon");
const fs = require("fs");
const sequelize = require("../utils/database");

//models
const Order = require("../models/ordersModel");
const Product = require("../models/productsModel");
const User = require("../models/userModel");
const Notification = require("../models/notificationsModel");
const OrderList = require("../models/orderListModel");
const NotificationsModel = require("../models/notificationsModel");
const CartModel = require("../models/cartModel");
const VariantsModel = require("../models/variantsModel");

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

const getLastOrderGroupAndIncrement = async () => {
  const lastOrder = await OrderList.findOne({
    order: [["order_group", "DESC"]],
  });

  return lastOrder ? lastOrder.order_group + 1 : 1;
};

//sequelized
exports.createOrderslist = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const userId = req.user.id;

    const cartItems = await CartModel.findAll({
      where: { createdBy: userId },
      include: [
        {
          model: Product,
          as: "product",
          attributes: ["id", "name", "availability", "instock", "created_by"],
        },
        {
          model: VariantsModel,
          as: "variant",
          attributes: ["id", "name", "qty"],
        },
      ],
      transaction: t,
    });

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "No items in the cart" });
    }

    const order_group = await getLastOrderGroupAndIncrement();
    const data = [];

    for (const cartItem of cartItems) {
      const { qty, product_id, variant_id, product, variant } = cartItem;

      if (variant_id) {
        if (variant.qty < qty) {
          return res.status(400).json({
            message: `Not enough quantity of variant ${variant.name}`,
          });
        }

        await VariantsModel.decrement("qty", {
          by: qty,
          where: { id: variant_id },
          transaction: t,
        });
      } else {
        if (product.availability < qty || product.instock !== 1) {
          return res.status(400).json({
            message: `Not enough quantity of product ${product.name}`,
          });
        }

        await Product.decrement(
          { availability: qty, instock: 1 },
          { where: { id: product_id }, transaction: t }
        );
      }

      data.push({
        createdBy: userId,
        receiver: product.created_by,
        stage: req.body.stage || 1,
        prod_id: product_id,
        qty,
        variant_id,
        prices: cartItem.total,
        order_group,
      });
    }

    const result = await OrderList.bulkCreate(data, { transaction: t });

    await CartModel.destroy({ where: { createdBy: userId }, transaction: t });

    await t.commit();

    res.status(201).json({ message: "Successfully requested order", result });
  } catch (error) {
    await t.rollback();

    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// to get specific order recieved to the seller (seller controller) sequelized
exports.getOrderlists = async (req, res) => {
  const { id } = req.body;

  try {
    const { prod_id } = await OrderList.findOne({
      attributes: [
        [sequelize.fn("GROUP_CONCAT", sequelize.col("prod_id")), "prod_id"],
      ],
      where: { order_group: id },
      raw: true,
    });

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
      prod_image: order["Product.image"].split(",")[0],
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

//sequelized
exports.getSellerOrders = async (req, res) => {
  try {
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
        reciever: req.user.userId,
      },
      order: [["createdAt", "DESC"]],
    });

    res.json(sellerOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// to get the sellers customer's list of orders seller controller (sequelized)
exports.getMyAllOrderlists = async (req, res) => {
  try {
    const { type } = req.body;
    const userId = req.user.id;

    const orders = await OrderList.findAll({
      where: { [type === "created" ? "createdBy" : "receiver"]: userId },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "role"],
        },
        {
          model: Product,
          as: "product",
          attributes: ["id", "name"],
        },
        {
          model: VariantsModel,
          as: "variant",
          attributes: ["id", "name"],
        },
      ],
      raw: true,
    });

    const orderMap = {};
    orders?.forEach((order) => {
      const orderId = order.order_group;

      if (!orderMap[orderId]) {
        orderMap[orderId] = {
          createdBy: {
            id: order["user.id"],
            name: order["user.name"],
            role:
              order["user.role"] === 1
                ? "Admin"
                : order["user.role"] === 2
                ? "Business"
                : order["user.role"] === 3
                ? "Moderator"
                : "Accepted",
          },
          id: orderId,
          createdAt: order.createdAt,
          orderItems: [],
        };
      }

      orderMap[orderId].orderItems.push({
        id: order.id,
        receiver: order.receiver,
        prod_id: order.prod_id,
        stage: order.stage,
        qty: order.qty,
        variant_id: order.variant_id,
        price: order.prices,
        product: order["product.name"],
        variant: order["variant.name"],
      });
    });

    const formattedOrders = Object.values(orderMap);

    res.json(formattedOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// to  change the status of the order by the seller (sequelized)
exports.updateOrderslists = async (req, res) => {
  const { qty, stage = 1 } = req?.body;

  const { id } = req?.params;

  let content = "";

  try {
    const orderlist = await OrderList.findOne({
      include: [
        {
          model: VariantsModel,
          attributes: ["name"],
          as: "variant",
        },
        {
          model: Product,
          attributes: ["name"],
          as: "product",
        },
      ],
      where: { id, receiver: req.user.id },
    });

    if (stage === 2) {
      content = "processed successfully";
    } else if (stage === 3) {
      orderlist.prices = (orderlist.prices / +orderlist.qty) * +qty;
      orderlist.qty = qty;
      content = "processed but partially accepted";
    } else if (stage === 4) {
      content = "rejected";
    } else {
      content = "replied";
    }

    content = `Order request for ${orderlist?.product?.name} ${
      (orderlist?.variant?.name && " - " + orderlist?.variant?.name) || ""
    } ${content} by ${req.user.name}`;

    await sequelize.transaction(async (t) => {
      orderlist.stage = stage;

      orderlist.save();

      await NotificationsModel.create(
        { content, sender: req.user.userId, reciever: orderlist?.createdBy },
        { transaction: t }
      );

      res.status(200).json({
        message: "Successfully updated order list",
        qty: orderlist.qty,
        prices: orderlist.prices,
        stage: orderlist.stage,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//seller can change the order request and cancel the order (sequelized)
exports.updateCreatedOrderslists = async (req, res) => {
  const { id } = req?.params;
  const { stage } = req?.body;

  try {
    const orderlist = await OrderList.findOne({
      include: [
        {
          model: VariantsModel,
          attributes: ["name"],
          as: "variant",
        },
        {
          model: Product,
          attributes: ["name"],
          as: "product",
        },
      ],
      where: { id, createdBy: req.user.id },
    });

    await sequelize.transaction(async (t) => {
      if (stage !== 2 && stage !== 5) {
        return res.status(400).json({ error: "Bad request" });
      }

      orderlist.stage = stage === 2 && orderlist.stage === 3 ? 2 : 5;

      await orderlist.save();

      let content;

      if (stage === 2) {
        content = `Partial Order request of ${orderlist?.product?.name} ${
          (orderlist?.variant?.name && " - " + orderlist?.variant?.name) || ""
        } accepted by ${req.user.name}`;
      } else {
        content = `Order of ${orderlist?.product?.name} ${
          (orderlist?.variant?.name && " - " + orderlist?.variant?.name) || ""
        } cancelled by ${req.user.name}`;
      }
      await Notification.create(
        { content, sender: req.user.id, reciever: orderlist?.receiver },
        { transaction: t }
      );

      // await t.commit();

      res
        .status(200)
        .json({ message: "Order Cancelled", stage: orderlist.stage });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
