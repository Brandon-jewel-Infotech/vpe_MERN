const Product = require("../models/productsModel");
const Cart = require("../models/cartModel");

// to get all  the products added to the cart  (customer's controller) (sequelized and tested)
exports.getCart = async (req, res) => {
  try {
    const cartItems = await Cart.findAll({
      where: {
        createdBy: req.user.userId,
      },
    });

    if (!cartItems) {
      return res.status(404).json({ error: "Cart is empty" });
    }

    let productIds = [];
    let quantities = [];
    let variantIds = [];

    cartItems.forEach((item) => {
      productIds.push(item.productId);
      quantities.push(item.qty);
      variantIds.push(item.variantId);
    });

    const products = await Product.findAll({
      where: {
        id: productIds,
      },
    });

    if (!products) {
      return res.status(404).json({ error: "Products not found" });
    }

    const output = {
      total: cartItems[0]?.total || 0,
      qty: quantities,
      variant_id: variantIds,
      result: products,
      createdBy: req.user.userId,
    };

    res.json(output);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// to add items to the cart  (customer's controller) (sequelized and tested)
exports.createCart = async (req, res) => {
  try {
    const { product_id, qty, total } = req.body;
    const createdBy = req.user.userId;
    let variant_id = 0;

    if (req.body.variant_id) {
      variant_id = req.body.variant_id;
    }

    // Check if cart item already exists for the user and product
    const existingCartItem = await Cart.findOne({
      where: { product_id, createdBy },
    });

    if (existingCartItem) {
      // If cart item exists, update the values
      await existingCartItem.update({ qty, variant_id, total });
    } else {
      // If cart item does not exist, create a new one
      await Cart.create({ product_id, qty, variant_id, total, createdBy });
    }

    return res.status(200).json({ message: "Successfully Added to Cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
