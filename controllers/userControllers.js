const bcrypt = require("bcrypt");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");

const sequelize = require("../utils/database");

//Models
const User = require("../models/userModel");
const AddressDetail = require("../models/addressDetailsModel");
const BankDetail = require("../models/bankDetailsModel");
const Request = require("../models/requestModel");
const Employee = require("../models/employeesModel");

async function generateUniqueCode() {
  let code;
  let isUnique = false;

  while (!isUnique) {
    code = uuid.v4().substr(0, 6).toUpperCase();

    const existingUser = await User.findOne({ where: { code: code } });

    if (!existingUser) {
      isUnique = true;
    }
  }

  return code;
}

const encrypt = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

// Register new user (sequelized and tested)
exports.signup = async (req, res) => {
  const {
    name,
    email,
    password,
    contact,
    gstin,
    addressline1,
    addressline2,
    city,
    state,
    zip,
    gmaplink,
    upi,
    category,
    holdername,
    accountNumber,
    bankAddress,
    bankName,
    ifsc,
  } = req.body;

  try {
    const hashed = await encrypt(password);
    // console.log("hashed" + hashed);
    const code = await generateUniqueCode();
    const role = req.body.role ? req.body.role : 2;
    const status = req.body.status ? req.body.status : 1;

    const user = await User.create({
      name: name,
      email: email,
      contact: contact,
      password: hashed,
      role: role,
      code: code,
      status: status,
      gstin: gstin,
      categoryId: category,
    });

    const fileName = "public/uploads/" + req.file.fileName;

    if (!req.file) {
      return res
        .status(400)
        .json({ message: "Something went wrong with image upload" });
    }

    await AddressDetail.create({
      address_line_1: addressline1,
      address_line_2: addressline2,
      city: city,
      state: state,
      zip: zip,
      aadhar_pic: fileName,
      gmap_link: gmaplink,
      user_id: user.id,
    });

    await BankDetail.create({
      holder_name: holdername,
      account_number: accountNumber,
      ifsc_code: ifsc,
      bank_name: bankName,
      bank_address: bankAddress,
      upi: upi,
      user_id: user.id,
    });

    //Don't know why Request is created
    await Request.create({ createdBy: user.id });

    // const token = jwt.sign(
    //   { id: user.id, name, email, role },
    //   process.env.SECRET_KEY,
    //   {
    //     expiresIn: "1h",
    //   }
    // );

    return res.status(200).json({ message: "Application Successful" });
  } catch (error) {
    if (
      error?.errors?.length > 0 &&
      error?.errors?.some((e) => e.type.includes("unique violation"))
    )
      return res
        .status(400)
        .json({ message: "Email address already register." });
    return res.status(400).json({ message: "Error encountered." });
  }
};

// to add new employee under the seller (sequelized and tested)
exports.createEmployee = async (req, res) => {
  try {
    const { name, email, password, contact } = req?.body;
    if (
      !name?.length ||
      !email?.length ||
      contact?.length !== 10 ||
      password?.length < 8
    ) {
      return res
        .status(400)
        .json({ error: "Please fill all required details" });
    }

    const hashed = await encrypt(password);
    const role = req.user.role === 1 ? 3 : 4;
    await Employee.create({
      name: name,
      email: email,
      contact: contact,
      password: hashed,
      employer: req.user.id,
      role: role,
    });
    return res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(400).json({ message: "User already exists", error });
  }
};

// to get  employees  under the seller  (sequelized and tested)
exports.getEmployee = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      where: {
        employer: req.user.id,
      },
    });

    if (employees.length === 0) {
      return res.status(404).json({ message: "No employees found" });
    }

    return res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// to delete the  employee under the seller  (sequelized and tested)
exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEmployee = await Employee.destroy({
      where: {
        id: id,
      },
    });

    if (!deletedEmployee) {
      return res
        .status(404)
        .json({ message: `Employee with ID ${id} not found` });
    }

    return res.status(200).send(`Employee deleted with ID: ${id}`);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//login user ( sequelized and tested )
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (user.status === 1) {
      return res.status(200).json({ message: "Unapproved Account" });
    }

    if (user.status === 2 || user.status === 4) {
      await Promise.all([
        User.destroy({ where: { id: user.id } }),
        Request.destroy({ where: { createdBy: user.id } }),
        AddressDetail.destroy({ where: { user_id: user.id } }),
        BankDetail.destroy({ where: { user_id: user.id } }),
      ]);

      console.log(`Deleted: ${user.id} from users`);

      return res.status(200).json({ message: "Account request Declined" });
    }

    console.log(user);
    // Create token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
        category: user.categoryId,
      },
      process.env.SECRET_KEY
      // ,{ expiresIn: "5h" }
    );

    return res.status(200).json({
      userId: user.id,
      message: "Login successful",
      token,
      role: user.role,
      email: user.email,
      code: user.code,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// to get the connections of the seller  (sequelized and tested)
exports.getConnections = async (req, res) => {
  const { code } = req.body;

  try {
    // Find suppliers
    const suppliers = await User.findAll({
      attributes: ["name", "email", "code"],
      where: sequelize.where(
        sequelize.fn("LOWER", sequelize.col("suppliers")),
        "LIKE",
        `%${code.toLowerCase()}%`
      ),
    });

    // Find customers
    const customers = await User.findAll({
      attributes: ["name", "email", "code"],
      where: sequelize.where(
        sequelize.fn("LOWER", sequelize.col("customers")),
        "LIKE",
        `%${code.toLowerCase()}%`
      ),
    });

    return res.status(200).json({ suppliers, customers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// to edit  the connections of the seller  (sequelized and tested)
exports.editConnections = async (req, res) => {
  const { createdBy, receiver } = req.body;

  try {
    const users = await User.findAll({
      attributes: ["code"],
      where: {
        id: [createdBy, receiver],
      },
    });

    const customer = users[0].code;
    const supplier = users[1].code;

    console.log(customer);
    console.log(supplier);

    await User.update(
      {
        customers: sequelize.fn(
          "CONCAT",
          sequelize.col("customers"),
          customer,
          ","
        ),
      },
      {
        where: {
          id: createdBy,
          customers: {
            [Op.notLike]: `%${customer}%`,
          },
        },
      }
    );

    await User.update(
      {
        suppliers: sequelize.fn(
          "CONCAT",
          sequelize.col("suppliers"),
          supplier,
          ","
        ),
      },
      {
        where: {
          id: receiver,
          suppliers: {
            [Op.notLike]: `%${supplier}%`,
          },
        },
      }
    );

    return res.status(200).send("Connections updated successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// to get all the users ( seller)  (sequelized and teeted)
exports.fetchUsers = async (req, res) => {
  try {
    const role = req?.body?.role ? req.body.role : 2;
    const users = await User.findAll({
      where: {
        role,
        status: 3,
      },
    });

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch Users" });
  }
};

// to get the employee of the seller by his code  (sequelized and tested)
exports.searchByCode = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// to update the status of the seller by his id  (seller's controller) (sequelized and tested)
exports.updateById = async (req, res) => {
  const { code, deleted } = req?.body;
  const status = req?.body?.status ? req.body.status : 2;

  if (!req.body?.code) {
    return res.json({ message: "User not found" });
  }

  try {
    let result;

    if (deleted) {
      result = await User.destroy({
        where: {
          status: [status],
          code: code,
        },
      });
    } else {
      result = await User.update(
        { status: status },
        {
          where: {
            code: code,
          },
        }
      );
    }

    res.json({ message: "Successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch User Details" });
  }
};

// to delete  the connections of the seller by his id  (seller's controller) ( sequelized and tested)
exports.deleteById = async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete associated address details
    await AddressDetail.destroy({
      where: { user_id: id },
    });

    // Find and delete associated bank details
    await BankDetail.destroy({
      where: { user_id: id },
    });

    const result = await User.destroy({
      where: {
        id: id,
      },
    });

    if (result === 0) {
      return res.status(404).json({ message: `User with ID ${id} not found` });
    }

    res.send(`User deleted with ID: ${id}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Analytics (sequelized)
exports.analytics = async (req, res) => {
  try {
    const todayCount = await User.count({
      where: sequelize.literal(`DATE(created_at) = CURDATE()`),
    });

    const thisMonthCount = await User.count({
      where: sequelize.literal(
        `YEAR(created_at) = YEAR(CURDATE()) AND MONTH(created_at) = MONTH(CURDATE())`
      ),
    });

    const thisYearCount = await User.count({
      where: sequelize.literal(`YEAR(created_at) = YEAR(CURDATE())`),
    });

    const totalCount = await User.count();

    res.json({
      today: todayCount,
      "this month": thisMonthCount,
      "this year": thisYearCount,
      total: totalCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
