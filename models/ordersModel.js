const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const UserModel = require("./userModel");
const ProductsModel = require("./productsModel");
const VariantsModel = require("./variantsModel");

const OrdersModel = sequelize.define("orders", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  createdBy: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      Model: UserModel,
      key: "id",
    },
  },
  receiver: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      Model: UserModel,
      key: "id",
    },
  },
  stage: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
  prod_id: {
    type: Sequelize.INTEGER,
    references: {
      Model: ProductsModel,
      key: "id",
    },
  },
  qty: {
    type: Sequelize.INTEGER,
  },
  variant_id: {
    type: Sequelize.INTEGER,
    references: {
      Model: VariantsModel,
      key: "id",
    },
  },
  prices: {
    type: Sequelize.INTEGER,
  },
  group_id: {
    type: Sequelize.INTEGER,
  },
});

//Associations
OrdersModel.belongsTo(UserModel, { foreignKey: "createdBy" });
OrdersModel.belongsTo(UserModel, { foreignKey: "receiver" });
OrdersModel.belongsTo(ProductsModel, { foreignKey: "prod_id" });
OrdersModel.belongsTo(VariantsModel, { foreignKey: "variant_id" });

module.exports = OrdersModel;
