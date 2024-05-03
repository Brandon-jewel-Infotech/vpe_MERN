const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const CoinsModel = sequelize.define("coins", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  numOfCoins: {
    type: Sequelize.INTEGER,
  },
  perUnit: {
    type: Sequelize.INTEGER,
  },
});

module.exports = CoinsModel;
