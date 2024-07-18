const fs = require("fs");
const sequelize = require("../utils/database");
//models
const Category = require("../models/categoriesModel");
const Subcategory = require("../models/subCategoriesModel");
const Company = require("../models/companyModel");
const Product = require("../models/productsModel");
const Reward = require("../models/rewardsModel");
const User = require("../models/userModel");
const Variant = require("../models/variantsModel");
const ProductModel = require("../models/productsModel");
const ImageModel = require("../models/imageModel");
const path = require("path");
const VariantsModel = require("../models/variantsModel");
const { deleteProductImages } = require("../utils/imageCleanup");

//sequelized
exports.fetchSellerCategories = async (req, res) => {
  try {
    const category = await Category.findByPk(req.user.category);

    const subcategories = await Subcategory.findAll({
      where: { cat_id: req.user.category },
    });
    const companies = await Company.findAll();

    res.json({ category, subcategories, companies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.addProduct = async (req, res) => {
  const {
    name,
    price_b2b,
    price_b2c,
    subCategory,
    company,
    availability,
    description,
    reward,
  } = req.body;

  const files = req.files;

  try {
    if (
      !name.length ||
      !description.length ||
      !+price_b2b ||
      !+price_b2c ||
      !+subCategory ||
      !+company
    ) {
      if (files && files.length > 0) {
        files.forEach((file) => fs.unlinkSync(file.path));
      }
      return res
        .status(400)
        .json({ error: "Please fill all required fields for product" });
    }

    const newProduct = await ProductModel.create({
      name,
      description,
      price_b2b: +price_b2b,
      price_b2c: +price_b2c,
      subCategory_id: +subCategory,
      company_id: +company,
      availability: +availability,
      reward_id: +reward || null,
      category_id: req.user.category,
      created_by: req.user.userId,
      instock: +availability ? 1 : 0,
    });

    // Save image paths
    const imageRecords = files.map((file) => ({
      url: `/public/products/${path.basename(file.path)}`,
      product_id: newProduct.id,
    }));

    await ImageModel.bulkCreate(imageRecords);

    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
      images: imageRecords,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      error: "Error creating product",
    });
  }
};

exports.addVariant = async (req, res) => {
  const { name, price_b2b, price_b2c, description, quantity } = req.body;

  const { prodId } = req.params;

  const files = req.files;

  try {
    if (!name.length || !description.length || !+price_b2b || !+price_b2c) {
      if (files && files.length > 0) {
        files.forEach((file) => fs.unlinkSync(file.path));
      }
      return res.status(400).json({ error: "Please fill all required fields" });
    }

    const newVariant = await VariantsModel.create({
      name,
      description,
      price_b2b: +price_b2b,
      price_b2c: +price_b2c,
      qty: +quantity,
      product_id: prodId,
    });

    // Save image paths
    const imageRecords = files.map((file) => ({
      url: `/public/products/${path.basename(file.path)}`,
      variant_id: newVariant.id,
    }));

    await ImageModel.bulkCreate(imageRecords);

    res.status(201).json({
      message: "Product created successfully",
      variant: newVariant,
      images: imageRecords,
    });
  } catch (error) {
    console.error("Error creating Variant:", error);
    res.status(500).json({
      error: "Error creating Variant",
    });
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
        "price_b2b",
        "price_b2c",
        "availability",
        "reward_id",
        "description",
        "instock",
        [
          sequelize.literal(`(
            SELECT COUNT(*)
            FROM variants AS variant
            WHERE variant.product_id = products.id
          )`),
          "variants",
        ],
      ],
      include: [
        { model: Category, attributes: ["id", "name"] },
        { model: Subcategory, attributes: ["id", "name"] },
        { model: Reward, attributes: ["id", "name"] },
        { model: Company, attributes: ["id", "name"] },
        { model: User, as: "user", attributes: ["id"] },
        { model: ImageModel, attributes: ["id", "url"], as: "images" },
        // { model: Variant, attributes: ["id"], as: "variants" },
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
// exports.getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.findAll({
//       attributes: [
//         "id",
//         "name",
//         "price_b2b",
//         "price_b2c",
//         "availability",
//         "reward_id",
//         "description",
//         "instock",
//       ],
//       include: [
//         { model: Category, attributes: ["id", "name"] },
//         { model: Subcategory, attributes: ["id", "name"] },
//         { model: Reward, attributes: ["id", "name"] },
//         { model: Company, attributes: ["id", "name"] },
//         { model: User, as: "user", attributes: ["id"] },
//         { model: Image, attributes: ["id", "url"], as: "images" },
//       ],
//     });

//     res.json(products);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

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
            "price_b2b",
            "price_b2c",
            "availability",
            "reward_id",
            "description",
            "instock",
          ],
          include: [
            { model: User, as: "user", attributes: ["id"] },
            { model: Image, attributes: ["id", "url"], as: "images" },
          ],
        },
      ],
      where: {
        [id ? "id" : "$product.user.id$"]: id || req.user.userId,
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
    const {
      name,
      price_b2c,
      price_b2b,
      availability,
      description,
      subCategory,
      company,
      reward,
    } = req.body;
    const { id } = req.params;

    const updatedProduct = await Product.update(
      {
        name,
        price_b2c,
        price_b2b,
        availability,
        description,
        subCategory_id: subCategory,
        company_id: company,
        reward_id: reward,
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
      // whereClause["$category.id$"] = req.user.category;
    }

    const products = await Product.findAll({
      attributes: [
        "id",
        "name",
        "price_b2b",
        "price_b2c",
        "availability",
        "description",
        "instock",
        [sequelize.col("reward.id"), "reward_id"],
        [sequelize.col("reward.coins"), "coins"],
        [sequelize.col("reward.conditions"), "conditions"],
        [sequelize.col("reward.status"), "status"],
        [sequelize.col("user.id"), "seller_id"],
        [sequelize.col("user.code"), "seller_code"],
        [sequelize.col("user.name"), "seller_name"],
      ],
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        },
        {
          model: Reward,
          as: "reward",
          attributes: ["id", "coins", "conditions", "status"],
          required: false,
        },
        {
          model: Subcategory,
          as: "subcategory",
          attributes: ["id", "name"],
        },
        {
          model: Company,
          as: "company",
          attributes: ["id", "name"],
        },
        {
          model: User,
          as: "user",
          attributes: [],
        },
        {
          model: ImageModel,
          as: "images",
          attributes: ["id", "url"],
        },
      ],
      where: whereClause,
    });

    if (req?.body?.id) {
      const product = products[0];
      const variants = await Variant.findAll({
        attributes: [
          "id",
          "name",
          "price_b2b",
          "price_b2c",
          "product_id",
          "description",
          "qty",
        ],
        include: [
          {
            model: ImageModel,
            as: "images",
            attributes: ["id", "url"],
          },
        ],
        where: { product_id: req.body.id },
      });

      const productWithVariants = {
        ...product.get({ plain: true }),
        variants: variants,
      };

      res.json(productWithVariants);
    } else {
      res.json(products);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//sequelized
exports.deleteSellerProducts = async (req, res) => {
  const { id } = req.params;

  const transaction = await sequelize.transaction();

  try {
    await deleteProductImages(id, transaction, "product");

    const variants = await VariantsModel.findAll({
      where: { product_id: id },
      transaction,
    });

    for (const variant of variants) {
      await deleteProductImages(variant.id, transaction, "variant");
    }

    await Variant.destroy({ where: { product_id: id }, transaction });

    await Product.destroy({ where: { id }, transaction });

    await transaction.commit();

    res.status(200).json({
      message: "Product and associated variants deleted successfully",
    });
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

//sequelized
exports.deleteSellerVariants = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteProductImages(id, null, "variant");

    await Variant.destroy({ where: { id } });

    res.json({ message: "Variant Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateSellerVariants = async (req, res) => {
  const { id } = req.params;
  const { name, price_b2b, price_b2c, description, qty } = req.body;
  const userId = req.user.userId;

  try {
    const variant = await VariantsModel.findByPk(id, {
      include: {
        model: ProductModel,
        attributes: ["created_by"],
      },
    });

    if (!variant) {
      return res.status(404).json({ error: "Variant not found" });
    }

    if (variant.product.created_by != userId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this variant" });
    }

    variant.name = name || variant.name;
    variant.price_b2b = price_b2b || variant.price_b2b;
    variant.price_b2c = price_b2c || variant.price_b2c;
    variant.description = description || variant.description;
    variant.qty = qty || variant.qty;

    await variant.save();

    res.status(200).json({ message: "Variant updated successfully" });
  } catch (error) {
    console.error("Error updating variant:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.addImages = async (req, res) => {
  try {
    const { product_id, variant_id } = req.body;
    const files = req.files;

    if (!product_id && !variant_id) {
      if (files && files.length > 0) {
        files.forEach((file) => fs.unlinkSync(file.path));
      }
    }

    if (product_id) {
      const product = await ProductModel.findByPk(product_id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
    }

    if (variant_id) {
      const variant = await VariantsModel.findByPk(variant_id);
      if (!variant) {
        return res.status(404).json({ message: "Variant not found" });
      }
    }

    if (files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const imageRecords = files.map((file) => ({
      url: `/public/products/${path.basename(file.path)}`,
      product_id: +product_id || null,
      variant_id: +variant_id || null,
    }));

    await ImageModel.bulkCreate(imageRecords);

    const insertedImages = await ImageModel.findAll({
      where: {
        url: imageRecords.map((record) => record.url),
      },
    });

    res
      .status(201)
      .json({ message: "Images added successfully", images: insertedImages });
  } catch (error) {
    console.error("Error adding images:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await ImageModel.findByPk(id);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    const url = path.join(__dirname, "../", image.url);

    if (fs.existsSync(url)) {
      fs.unlinkSync(url);
    }
    await image.destroy();
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ message: "Internal server error" });
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
    const { prodId } = req.params;
    let instock = req?.body?.instock === 0 ? 1 : 0;

    await Product.update({ instock }, { where: { id: prodId } });

    res.json({ message: "Updated", instock });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
