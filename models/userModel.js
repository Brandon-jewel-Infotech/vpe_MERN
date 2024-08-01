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
  },
  customers: {
    type: Sequelize.TEXT,
  },
  suppliers: {
    type: Sequelize.TEXT,
  },
  wallet: {
    type: Sequelize.INTEGER,
    default: 0,
  },
});

//Associations
UserModel.belongsTo(CategoriesModel, { foreignKey: "categoryId" });

module.exports = UserModel;
