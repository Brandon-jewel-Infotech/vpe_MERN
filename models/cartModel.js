const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const ProductsModel = require("./productsModel");
const VariantsModel = require("./variantsModel");
const UserModel = require("./userModel");

const CartModel = sequelize.define("cart", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  createdBy: {
    type: Sequelize.INTEGER,
    references: {
      model: UserModel,
      key: "id",
    },
  },
  qty: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  total: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  variant_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: VariantsModel,
      key: "id",
    },
  },
  product_id: {
    type: Sequelize.INTEGER,
    references: {
      model: ProductsModel,
      key: "id",
    },
  },
});

CartModel.belongsTo(UserModel, { foreignKey: "createdBy" });
CartModel.belongsTo(ProductsModel, { foreignKey: "product_id" });
CartModel.belongsTo(VariantsModel, { foreignKey: "variant_id" });

module.exports = CartModel;

// cart has one product
// product has many many carts

// cart has one variant
// variant has many carts
