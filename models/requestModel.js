const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const UserModel = require("./userModel");

const RequestModel = sequelize.define("requests", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  createdBy: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      Model: "UserModel",
      key: "id",
    },
  },
  description: {
    type: Sequelize.TEXT,
  },
  status: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
  role: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  receiver: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  response: {
    type: Sequelize.TEXT,
  },
});

//Associations
RequestModel.belongsTo(UserModel, { foreignKey: "createdBy" });

module.exports = RequestModel;
