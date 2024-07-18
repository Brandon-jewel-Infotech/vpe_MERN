const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const UserModel = require("./userModel");

const EmployeeModel = sequelize.define("employees", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  employer: {
    type: Sequelize.INTEGER,
    references: {
      model: UserModel,
      key: "id", // The column in UserModel that employer references
    },
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  contact: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  status: {
    type: Sequelize.DataTypes.ENUM(2, 3),
    default: 3,
  },
});

//Associations
EmployeeModel.belongsTo(UserModel, { foreignKey: "employer" });

module.exports = EmployeeModel;

// user has many employers
// employee has one employer (user)
