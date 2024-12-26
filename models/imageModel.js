const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const ProductModel = require("./productsModel");
const VariantsModel = require("./variantsModel");

const ImageModel = sequelize.define("images", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  product_id: {
    type: Sequelize.INTEGER,
    references: {
      model: ProductModel,
      key: "id",
    },
  },
  variant_id: {
    type: Sequelize.INTEGER,
    references: {
      model: VariantsModel,
      key: "id",
    },
  },
  url: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

ImageModel.belongsTo(ProductModel, { foreignKey: "product_id" });
ProductModel.hasMany(ImageModel, { foreignKey: "product_id" });
VariantsModel.hasMany(ImageModel, { foreignKey: "variant_id" });

module.exports = ImageModel;
