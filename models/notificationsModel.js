const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const UserModel = require("./userModel");

const NotificationsModel = sequelize.define("notifications", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  sender: {
    type: Sequelize.INTEGER,
    references: {
      model: UserModel,
      key: "id", // The column in UserModel that sender references
    },
  },
  reciever: {
    type: Sequelize.INTEGER,
    references: {
      model: UserModel,
      key: "id", // The column in UserModel that receiver references
    },
  },
  content: {
    type: Sequelize.TEXT,
  },
  status: {
    type: Sequelize.INTEGER,
    defaultValue: 3,
  },
  seen: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
});

NotificationsModel.belongsTo(UserModel, { foreignKey: "sender" });
NotificationsModel.belongsTo(UserModel, { foreignKey: "receiver" });

module.exports = NotificationsModel;
