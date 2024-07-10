const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const CategoriesModel = require("./categoriesModel");

const SubCategoriesModel = sequelize.define("subcategory", {
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
  cat_id: {
    type: Sequelize.INTEGER,
    references: {
      model: CategoriesModel,
      key: "id",
    },
    allowNull: false,
  },
});

// Define associations
CategoriesModel.hasMany(SubCategoriesModel, {
  foreignKey: "cat_id",
  as: "subcategories",
});
SubCategoriesModel.belongsTo(CategoriesModel, { foreignKey: "cat_id" });

module.exports = SubCategoriesModel;
