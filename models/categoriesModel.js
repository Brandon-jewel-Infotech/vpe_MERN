const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const CategoriesModel = sequelize.define("categories", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
});

module.exports = CategoriesModel;
