const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const CategoryModel = require("./categoriesModel");
const SubCategoryModel = require("./subCategoriesModel");
const CompanyModel = require("./companyModel");
const UserModel = require("./userModel");
const RewardsModel = require("./rewardsModel");

const ProductModel = sequelize.define("products", {
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
  image: {
    type: Sequelize.TEXT,
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
  category_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      Model: CategoryModel,
      key: "id",
    },
  },
  subCategory_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      Model: SubCategoryModel,
      key: "id",
    },
  },
  company_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      Model: CompanyModel,
      key: "id",
    },
  },
  availability: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  instock: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  created_by: {
    type: Sequelize.INTEGER,
    references: {
      Model: UserModel,
      key: "id",
    },
  },
  reward_id: {
    type: Sequelize.INTEGER,
    references: {
      Model: RewardsModel,
      key: "id",
    },
  },
});

//Associations
ProductModel.belongsTo(CategoryModel, { foreignKey: "category_id" });
ProductModel.belongsTo(SubCategoryModel, { foreignKey: "subCategory_id" });
ProductModel.belongsTo(CompanyModel, { foreignKey: "company_id" });
ProductModel.belongsTo(UserModel, { foreignKey: "created_by", as: "user" });
ProductModel.belongsTo(RewardsModel, { foreignKey: "reward_id" });

module.exports = ProductModel;
