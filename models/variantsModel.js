const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const ProductsModel = require("./productsModel");

const VariantsModel = sequelize.define("variants", {
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
  price_b2b: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  price_b2c: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  product_id: {
    type: Sequelize.INTEGER,
    references: {
      model: ProductsModel,
      key: "id",
    },
  },
  description: {
    type: Sequelize.STRING,
  },
  qty: {
    type: Sequelize.INTEGER,
  },
});

//Association
VariantsModel.belongsTo(ProductsModel, { foreignKey: "product_id" });

module.exports = VariantsModel;
