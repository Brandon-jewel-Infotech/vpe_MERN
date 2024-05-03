const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const UserModel = require("./userModel");

const BankDetailsModel = sequelize.define("bank_details", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  holder_name: {
    type: Sequelize.STRING,
  },
  account_number: {
    type: Sequelize.STRING,
  },
  ifsc_code: {
    type: Sequelize.STRING,
  },
  bank_name: {
    type: Sequelize.STRING,
  },
  bank_address: {
    type: Sequelize.STRING,
  },
  upi: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  user_id: {
    type: Sequelize.INTEGER,
    refernces: {
      Model: UserModel,
      key: "id",
    },
  },
});

//Associations
BankDetailsModel.belongsTo(UserModel, { foreignKey: "user_id" });

module.exports = BankDetailsModel;
