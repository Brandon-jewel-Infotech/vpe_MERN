const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

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
});

module.exports = RewardsModel;
