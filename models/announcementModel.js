const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const UserModel = require("./userModel");

const AnnouncementModel = sequelize.define("announcements", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  employerId: {
    type: Sequelize.INTEGER,
    references: {
      model: UserModel,
      key: "id",
    },
    allowNull: false,
  },
});

AnnouncementModel.belongsTo(UserModel, {
  as: "employer",
  foreignKey: "employerId",
});

UserModel.hasMany(AnnouncementModel, {
  as: "announcements",
  foreignKey: "employerId",
});

module.exports = AnnouncementModel;
