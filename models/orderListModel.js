const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const UserModel = require("./userModel");
const ProductsModel = require("./productsModel");
const VariantsModel = require("./variantsModel");

const OrderListModel = sequelize.define("order_list", {
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
      model: UserModel,
      key: "id",
    },
  },
  receiver: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: UserModel,
      key: "id",
    },
  },
  prod_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: ProductsModel,
      key: "id",
    },
  },
  stage: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  qty: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  rewarded_coins: {
    type: Sequelize.INTEGER,
  },
  variant_id: {
    type: Sequelize.INTEGER,
    references: {
      model: VariantsModel,
      key: "id",
    },
  },
  prices: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  order_group: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

//Associations
OrderListModel.belongsTo(UserModel, {
  as: "creator_details",
  foreignKey: "createdBy",
});
OrderListModel.belongsTo(UserModel, {
  as: "reciever_details",
  foreignKey: "receiver",
});
OrderListModel.belongsTo(ProductsModel, { foreignKey: "prod_id" });
OrderListModel.belongsTo(VariantsModel, { foreignKey: "variant_id" });

module.exports = OrderListModel;
