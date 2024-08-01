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
  employerId: {
    type: Sequelize.INTEGER,
    references: {
      model: UserModel,
      key: "id",
    },
  },
  employeeId: {
    type: Sequelize.INTEGER,
    references: {
      model: UserModel,
      key: "id",
    },
  },
});

EmployeeModel.belongsTo(UserModel, {
  as: "employer",
  foreignKey: "employerId",
});
EmployeeModel.belongsTo(UserModel, {
  as: "employee",
  foreignKey: "employeeId",
});

UserModel.hasMany(EmployeeModel, { as: "employees", foreignKey: "employerId" });
UserModel.hasOne(EmployeeModel, { as: "employer", foreignKey: "employeeId" });

module.exports = EmployeeModel;
