const Product = require("../models/productsModel");
const Cart = require("../models/cartModel");
const VariantsModel = require("../models/variantsModel");
const ImageModel = require("../models/imageModel");
const sequelize = require("../utils/database");
const RewardsModel = require("../models/rewardsModel");
const { Sequelize, where } = require("sequelize");

// to get all  the products added to the cart (customer's controller) (sequelized and tested)
exports.getCart = async (req, res) => {
  try {
    const { role, id, userId } = req.user;
    const rewardAttribute =
      role === 2 ? "seller_reward_id" : "employee_reward_id";
    const rewardField = role === 2 ? "seller_reward" : "employee_reward";

    const cartItems = await Cart.findAll({
      include: [
        {
          model: Product,
          as: "product",
          attributes: [
            "id",
            "name",
            role === 2 ? "price_b2b" : "price_b2c",
            "availability",
            "instock",
          ],
          include: [
            {
              model: ImageModel,
              attributes: ["id", "url"],
            },
            {
              model: RewardsModel,
              as: rewardField,
              attributes: ["id", "name", "coins", "conditions", "status"],
              where: { id: Sequelize.col(`product.${rewardAttribute}`) },
            },
          ],
        },
        {
          model: VariantsModel,
          as: "variant",
          attributes: [
            "id",
            role === 2 ? "price_b2b" : "price_b2c",
            "name",
            "qty",
          ],
          include: [
            {
              model: ImageModel,
              attributes: ["id", "url"],
            },
          ],
        },
      ],
      where: { createdBy: id || userId },
    });

    if (!cartItems.length) {
      return res.status(404).json({ message: "No items in the cart." });
    }

    res.status(200).json(cartItems);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ message: "Failed to fetch cart items.", error });
  }
};

// to add items to the cart  (customer's controller) (sequelized and tested)
exports.createCart = async (req, res) => {
  try {
    const { product_id, qty, total } = req.body;
    const createdBy = req.user.id;
    let variant_id = null;

    if (req.body.variant_id) {
      variant_id = req.body.variant_id;
    }
    // Check if cart item already exists for the user and product
    const existingCartItem = await Cart.findOne({
      include: [
        {
          model: Product,
          as: "product",
          attributes: ["availability", "instock"],
        },
        {
          model: VariantsModel,
          as: "variant",
          attributes: ["qty"],
        },
      ],
      where: { product_id, variant_id, createdBy },
    });

    if (existingCartItem) {
      const newQuantity =
        +existingCartItem.qty + +qty <=
        (existingCartItem?.variant?.qty != undefined
          ? existingCartItem?.variant?.qty
          : existingCartItem?.product?.availability)
          ? +existingCartItem?.qty + +qty
          : +qty;

      // If cart item exists, update the values
      await existingCartItem.update({
        total: sequelize.literal(`(total/qty) * ${newQuantity}`),
        qty: newQuantity,
      });
    } else {
      // If cart item does not exist, create a new one
      await Cart.create({
        product_id,
        qty,
        variant_id: variant_id || null,
        total,
        createdBy,
      });
    }
    // await Product.decrement("availability", {
    //   by: qty,
    //   where: { id: product_id },
    // });

    return res.status(200).json({ message: "Successfully Added to Cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteCartItem = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the cart item
    const cartItem = await Cart.findOne({
      id,
      createdBy: req.user.id,
    });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found." });
    }

    // Delete the cart item
    await cartItem.destroy();

    // await Product.increment("availability", {
    //   by: cartItem.qty,
    //   where: { id: cartItem?.product_id },
    // });

    res.status(200).json({ message: "Cart item deleted successfully." });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).json({ message: "Failed to delete cart item.", error });
  }
};

exports.updateCartItemQuantity = async (req, res) => {
  const { id } = req.params;
  const { qty } = req.body;

  try {
    const cartItem = await Cart.findOne({
      id,
      createdBy: req.user.id,
    });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found." });
    }

    if (qty < 0) {
      return res.status(400).json({ message: "Quantity cannot be negative." });
    }

    // if (cartItem?.qty < qty) {
    //   await Product.decrement("availability", {
    //     by: qty - cartItem?.qty,
    //     where: { id: cartItem?.product_id },
    //   });
    // } else {
    //   await Product.increment("availability", {
    //     by: cartItem?.qty - qty,
    //     where: { id: cartItem?.product_id },
    //   });
    // }

    cartItem.total = (cartItem.total / cartItem.qty) * qty;
    cartItem.qty = qty;

    await cartItem.save();

    res
      .status(200)
      .json({ message: "Cart item quantity updated successfully.", cartItem });
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    res
      .status(500)
      .json({ message: "Failed to update cart item quantity.", error });
  }
};
