const fs = require("fs").promises;
const sequelize = require("../utils/database");
//models
const Category = require("../models/categoriesModel");
const Subcategory = require("../models/subCategoriesModel");
const Company = require("../models/companyModel");
const Product = require("../models/productsModel");
const Reward = require("../models/rewardsModel");
const User = require("../models/userModel");
const Variant = require("../models/variantsModel");

//sequelized
exports.fetchSellerCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    const subcategories = await Subcategory.findAll({
      where: { cat_id: req.user.category },
    });
    const companies = await Company.findAll();

    res.json({ categories, subcategories, companies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//sequelized and tested
exports.getSellerProducts = async (req, res) => {
  try {
    const id = req.body.id || null;

    const products = await Product.findAll({
      attributes: [
        "id",
        "name",
        "image",
        "price_b2b",
        "price_b2c",
        "availability",
        "reward_id",
        "description",
        "instock",
      ],
      include: [
        { model: Category, attributes: ["id", "name"] },
        { model: Subcategory, attributes: ["id", "name"] },
        { model: Reward, attributes: ["id", "name"] },
        { model: Company, attributes: ["id", "name"] },
        { model: User, as: "user", attributes: ["id"] },
      ],
      where: {
        created_by: req.user.userId,
        // id: id,
      },
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//sequelized and tested
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: [
        "id",
        "name",
        "image",
        "price_b2b",
        "price_b2c",
        "availability",
        "reward_id",
        "description",
        "instock",
      ],
      include: [
        { model: Category, attributes: ["id", "name"] },
        { model: Subcategory, attributes: ["id", "name"] },
        { model: Reward, attributes: ["id", "name"] },
        { model: Company, attributes: ["id", "name"] },
        { model: User, as: "user", attributes: ["id"] },
      ],
    });

    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//sequelized
exports.getSellerVariants = async (req, res) => {
  try {
    const id = req.body.id || null;

    const variants = await Variant.findAll({
      include: [
        {
          model: Product,
          as: "product",
          attributes: [
            "id",
            "name",
            "image",
            "price_b2b",
            "price_b2c",
            "availability",
            "reward_id",
            "description",
            "instock",
          ],
          include: [{ model: User, as: "createdBy", attributes: ["id"] }],
        },
      ],
      where: {
        [id ? "id" : "$createdBy.id$"]: id || req.user.userId,
      },
    });

    res.json(variants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//sequelized
exports.updateProduct = async (req, res) => {
  try {
    const { name, price, price_b2b, quantity, description } = req.body;
    const { id } = req.params;

    const updatedProduct = await Product.update(
      {
        name,
        price_b2c: price,
        price_b2b,
        availability: quantity,
        description,
      },
      { where: { id } }
    );

    if (updatedProduct[0] === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Successfully updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//sequelized
exports.editProduct = async (req, res) => {
  try {
    const { qty, prod_id } = req.body;

    // Update the availability of the product in the products table
    const updatedProduct = await Product.update(
      { availability: sequelize.literal("availability - " + qty) },
      { where: { id: prod_id } }
    );

    if (updatedProduct[0] === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Successfully updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//sequelized
exports.getAllProducts = async (req, res) => {
  try {
    let whereClause = {};

    if (req?.body?.id) {
      whereClause.id = req.body.id;
    } else {
      whereClause["$category.id$"] = req.user.category;
    }

    const products = await Product.findAll({
      attributes: [
        "id",
        "name",
        [
          sequelize.fn("SUBSTRING_INDEX", sequelize.col("image"), ",", 1),
          "images",
        ],
        "price_b2b",
        "price_b2c",
        "availability",
        "description",
        "instock",
        [sequelize.col("reward.id"), "reward_id"],
        [sequelize.col("reward.coins"), "coins"],
        [sequelize.col("reward.conditions"), "conditions"],
        [sequelize.col("reward.status"), "status"],
        [sequelize.col("category.name"), "category"],
        [sequelize.col("subcategory.name"), "subcategory"],
        [sequelize.col("company.name"), "company"],
        [sequelize.col("user.id"), "seller_id"],
        [sequelize.col("user.code"), "seller_code"],
      ],
      include: [
        {
          model: Category,
          as: "category",
          attributes: [],
        },
        {
          model: Reward,
          as: "reward",
          attributes: ["coins", "conditions", "status"],
          required: false,
        },
        {
          model: Subcategory,
          as: "subcategory",
          attributes: [],
        },
        {
          model: Company,
          as: "company",
          attributes: [],
        },
        {
          model: User,
          as: "user",
          attributes: [],
        },
      ],
      where: whereClause,
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//sequelized
exports.deleteSellerProducts = async (req, res) => {
  const { id } = req?.params;
  const urls = req.body;

  try {
    await Promise.all([
      Product.destroy({ where: { id } }),
      Variant.destroy({ where: { product_id: id } }),
    ]);

    // Delete associated images
    if (urls?.length > 0) {
      await Promise.all(
        urls.map(async (url) => {
          await fs.unlink(url);
        })
      );
      s;
    }

    res.json({ message: "Product Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

//sequelized
exports.deleteSellerVariants = async (req, res) => {
  const { id } = req?.params;
  const urls = req.body;

  try {
    await Variant.destroy({ where: { id } });

    // Delete associated images
    if (urls?.length > 0) {
      await Promise.all(
        urls.map(async (url) => {
          await fs.unlink(url);
        })
      );
    }

    res.json({ message: "Variant Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

//sequelized
exports.fetchSellerRequests = async (req, res) => {
  try {
    let requests;

    if (req.user.role === 1) {
      requests = await Request.findAll({
        attributes: ["id", "name", "description", "status", "role", "response"],
        include: [
          {
            model: User,
            as: "createdBy",
            attributes: [],
          },
        ],
        where: {
          role: { [sequelize.Op.ne]: 1 },
        },
        order: [["status", "ASC"]],
      });
    } else {
      requests = await Request.findAll({
        attributes: ["id", "name", "description", "status", "role", "response"],
        include: [
          {
            model: User,
            as: "createdBy",
            attributes: [],
          },
        ],
        where: {
          status: 3,
          role: 1,
        },
      });
    }

    res.send(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//sequelized
exports.markOutOfStock = async (req, res) => {
  try {
    const { prod_id } = req.body;
    let instock = req?.body?.instock === 0 ? 1 : 0;

    await Product.update({ instock }, { where: { id: prod_id } });

    res.json({ message: "Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
