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
  },
  cat_id: {
    type: Sequelize.INTEGER,
    references: {
      model: CategoriesModel,
      key: "id",
    },
  },
});

//Associations
SubCategoriesModel.belongsTo(CategoriesModel, { foreignKey: "cat_id" });

module.exports = SubCategoriesModel;
