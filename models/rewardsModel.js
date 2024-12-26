const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const UserModel = require("./userModel");

const RewardsModel = sequelize.define("rewards", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  coins: {
    type: Sequelize.STRING,
    defaultValue: "0",
    allowNull: false,
  },
  stage: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    allowNull: false,
  },
  status: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  conditions: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  created_by: {
    type: Sequelize.INTEGER,
    references: {
      model: "users",
      key: "id",
    },
  },
});

RewardsModel.belongsTo(UserModel, { foreignKey: "created_by", as: "user" });

module.exports = RewardsModel;
