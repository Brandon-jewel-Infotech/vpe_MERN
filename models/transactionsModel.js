const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const OrderModel = require("./ordersModel");

const TransactionsModel = sequelize.define("transaction", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  order_id: {
    type: Sequelize.INTEGER,
    references: {
      model: OrderModel,
      key: "id",
    },
  },
  status: {
    type: Sequelize.INTEGER,
  },
  txn_image: {
    type: Sequelize.TEXT,
  },
});

//Associations
TransactionsModel.belongsTo(OrderModel, { foreignKey: "order_id" });

module.exports = TransactionsModel;
