const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const UserModel = require("./userModel");

const AddressModel = sequelize.define("address_details", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  gmap_link: {
    type: Sequelize.STRING,
  },
  address_line_1: {
    type: Sequelize.STRING,
  },
  address_line_2: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  state: {
    type: Sequelize.STRING,
  },
  state: {
    type: Sequelize.STRING,
  },
  zip: {
    type: Sequelize.STRING,
  },
  aadhar_pic: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: UserModel,
      key: "id",
    },
  },
});

AddressModel.belongsTo(UserModel, { foreignKey: "user_id" });
UserModel.hasOne(AddressModel, {
  as: "address_details",
  foreignKey: "user_id",
});

module.exports = AddressModel;
