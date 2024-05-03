const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const CategoriesModel = require("./categoriesModel");

const UserModel = sequelize.define("users", {
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
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  contact: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  categoryId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: CategoriesModel,
      key: "id",
    },
  },
  code: {
    type: Sequelize.STRING,
    unique: true,
  },
  status: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  gstin: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  customers: {
    type: Sequelize.TEXT,
  },
  suppliers: {
    type: Sequelize.TEXT,
  },
  wallet: {
    type: Sequelize.INTEGER,
  },
});

//Associations
UserModel.belongsTo(CategoriesModel, { foreignKey: "categoryId" });

module.exports = UserModel;
