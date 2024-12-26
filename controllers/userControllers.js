const bcrypt = require("bcrypt");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const { randomInt } = require("crypto");

const sequelize = require("../utils/database");

//Models
const User = require("../models/userModel");
const AddressDetail = require("../models/addressDetailsModel");
const BankDetail = require("../models/bankDetailsModel");
const Request = require("../models/requestModel");
const Employee = require("../models/employeesModel");
const { Op } = require("sequelize");
const CartModel = require("../models/cartModel");
const NotificationsModel = require("../models/notificationsModel");
const OrderListModel = require("../models/orderListModel");
const sendEmail = require("../utils/sendEmail");
const path = require("path");

const temporaryUserData = {};

function cleanupExpiredTemporaryUserData() {
  const currentTime = Date.now();
  for (const email in temporaryUserData) {
    if (temporaryUserData.hasOwnProperty(email)) {
      if (temporaryUserData[email?.toLowerCase()].expiryTime <= currentTime) {
        delete temporaryUserData[email?.toLowerCase()];
      }
    }
  }
  console.log("Temporary User Data Cleared Successfully");
}

setInterval(cleanupExpiredTemporaryUserData, 60 * 60 * 1000);

function generateOTP() {
  const OTP = randomInt(100000, 999999);
  return OTP;
}

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
    addressLine1,
    addressLine2,
    city,
    state,
    zip,
    gmaplink,
    upi,
    category,
    accountHolderName,
    accountNumber,
    bankAddress,
    bankName,
    ifsc,
  } = req.body;

  const t = await sequelize.transaction();

  try {
    const hashed = await encrypt(password);
    const code = await generateUniqueCode();
    const role = req.body.role ? req.body.role : 2;
    const status = req.body.status ? req.body.status : 1;

    const user = await User.create(
      {
        name: name,
        email: email,
        contact: contact,
        password: hashed,
        role: role,
        code: code,
        status: status,
        gstin: gstin,
        categoryId: category,
      },
      { transaction: t }
    );

    if (!req.file) {
      await t.rollback();
      return res
        .status(400)
        .json({ error: "Something went wrong with image upload" });
    }

    const fileName = `/public/aadhar/${path.basename(req.file.path)}`;

    await AddressDetail.create(
      {
        address_line_1: addressLine1,
        address_line_2: addressLine2,
        city: city,
        state: state,
        zip: zip,
        aadhar_pic: fileName,
        gmap_link: gmaplink,
        user_id: user.id,
      },
      { transaction: t }
    );

    await BankDetail.create(
      {
        holder_name: accountHolderName,
        account_number: accountNumber,
        ifsc_code: ifsc,
        bank_name: bankName,
        bank_address: bankAddress,
        upi: upi,
        user_id: user.id,
      },
      { transaction: t }
    );

    await Request.create({ createdBy: user.id }, { transaction: t });

    const usersToNotify = await User.findAll(
      {
        where: {
          role: { [Op.in]: [1, 3] },
        },
      },
      { transaction: t }
    );

    const notificationPromises = usersToNotify.map((user) =>
      NotificationsModel.create(
        {
          sender: req.user.id,
          receiver: user.id,
          content: `A new Account Creation request has been created by user ${email}.`,
        },
        { transaction: t }
      )
    );

    await Promise.all(notificationPromises);

    await t.commit();

    return res.status(200).json({ message: "Application Successful" });
  } catch (error) {
    await t.rollback();
    console.log(error);
    if (
      error?.errors?.length > 0 &&
      error?.errors?.some((e) => e.type.includes("unique violation"))
    )
      return res
        .status(400)
        .json({ error: "Email address already registered." });
    return res.status(400).json({ error: "Error encountered." });
  }
};

exports.createEmployee = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id: userId } = req.user;
    const { name, email, password, contact } = req.body;

    if (
      !name?.length ||
      !email?.length ||
      contact?.length !== 10 ||
      password?.length < 8
    ) {
      await transaction.rollback();
      return res
        .status(400)
        .json({ error: "Please fill all required details" });
    }

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { contact }],
      },
      attributes: ["id"],
      transaction,
    });

    if (existingUser?.id) {
      await transaction.rollback();
      return res
        .status(400)
        .json({ error: "Email or Contact already registered" });
    }

    const hashed = await encrypt(password);
    const role = req.user.role === 1 ? 3 : 4;

    const newUser = await User.create(
      {
        name,
        email,
        contact,
        password: hashed,
        status: 3,
        role,
      },
      { transaction }
    );

    if (role === 4) {
      await Employee.create(
        {
          employerId: userId,
          employeeId: newUser.id,
        },
        { transaction }
      );
    }

    await transaction.commit();
    return res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    await transaction.rollback();
    console.error("Error:", error);
    return res.status(400).json({ error: "Failed to add User" });
  }
};

exports.getEmployee = async (req, res) => {
  try {
    let employees = await Employee.findAll({
      where: {
        employerId: req.user.id,
      },
      include: {
        model: User,
        as: "employee",
        attributes: ["id", "name", "email", "contact", "status"],
      },
    });

    employees = employees.map((employee) => employee.employee);

    return res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;
  const { id: employerId } = req.user;

  const transaction = await sequelize.transaction();

  try {
    const employeeRecord = await Employee.findOne({
      where: {
        employeeId: id,
        employerId: employerId,
      },
      transaction,
    });

    if (!employeeRecord) {
      await transaction.rollback();
      return res.status(403).json({
        error: "You do not have permission to delete this employee",
      });
    }

    const deletedEmployee = await Employee.destroy({
      where: {
        employeeId: id,
      },
      transaction,
    });

    const deletedUser = await User.destroy({
      where: {
        id,
      },
      transaction,
    });

    await CartModel.destroy({
      where: {
        createdBy: id,
      },
      transaction,
    });

    await NotificationsModel.destroy({
      where: {
        createdBy: id,
      },
      transaction,
    });

    await OrderListModel.destroy({
      where: {
        createdBy: id,
      },
      transaction,
    });

    if (!deletedEmployee || !deletedUser) {
      await transaction.rollback();
      return res
        .status(404)
        .json({ error: `Employee with ID ${id} not found` });
    }

    await transaction.commit();

    return res.status(200).send(`Employee deleted with ID: ${id}`);
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    if (user.status === 1) {
      return res.status(401).json({ error: "Unapproved Account" });
    }

    if (user.status === 2 || user.status === 4) {
      // await Promise.all([
      //   User.destroy({ where: { id: user.id } }),

      //   Request.destroy({ where: { createdBy: user.id } }),
      //   AddressDetail.destroy({ where: { user_id: user.id } }),
      //   BankDetail.destroy({ where: { user_id: user.id } }),
      // ]);

      return res.status(403).json({
        error:
          user.status === 2
            ? "Your Account Request is Declined."
            : "Your Account is Suspended.",
      });
    }

    let employerId = null;
    if (user.role === 4) {
      const employee = await Employee.findOne({
        where: { employeeId: user.id },
      });
      employerId = employee ? employee.employerId : null;
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
        category: user.categoryId,
        employerId,
      },
      process.env.SECRET_KEY
      // { expiresIn: "5h" }
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
        `%${code?.toLowerCase()}%`
      ),
      order: [["name"]],
    });

    // Find customers
    const customers = await User.findAll({
      attributes: ["name", "email", "code"],
      where: sequelize.where(
        sequelize.fn("LOWER", sequelize.col("customers")),
        "LIKE",
        `%${code.toLowerCase()}%`
      ),
      order: [["name"]],
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
    let users;

    if (role === 4) {
      users = await User.findAll({
        where: {
          role,
          status: 3,
        },
        include: [
          {
            model: Employee,
            as: "employer",
            attributes: ["id", "employerId"],
            include: [
              {
                model: User,
                as: "employer",
                attributes: ["id", "name"],
              },
            ],
          },
        ],
        order: [["name"]],
        attributes: [
          "id",
          "name",
          "email",
          "contact",
          "role",
          "status",
          "code",
        ],
      });
    } else {
      users = await User.findAll({
        where: {
          role,
          status: 3,
        },
        order: [["name"]],
        attributes: [
          "id",
          "name",
          "email",
          "contact",
          "role",
          "status",
          "code",
        ],
      });
    }

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
  const { id, deleted, role } = req?.body;
  const status = req?.body?.status ? req.body.status : 2;

  if (!req.body?.id) {
    return res.json({ message: "User not found" });
  }

  try {
    let result;

    if (deleted) {
      if (role === 2) {
        result = await User.destroy({
          where: {
            status: [status],
            id,
          },
        });
      } else {
        result = await Employee.destroy({
          where: {
            status: [status],
            id,
          },
        });
      }
    } else {
      result = await User.findByPk(id);

      if (!result.id) {
        return res.status(404).json({ error: "User not found" });
      }

      result.status = status;
      await result.save();
    }

    res.status(200).json({ message: "Successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch User Details" });
  }
};

exports.deleteById = async (req, res) => {
  const { id } = req.params;

  try {
    await AddressDetail.destroy({
      where: { user_id: id },
    });

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

exports.getWallet = async (req, res) => {
  const { id } = req.user;

  try {
    const user = await User.findByPk(id, { attributes: ["wallet"] });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.wallet || 0);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getForgotPasswordOTP = async (req, res, next) => {
  try {
    const { email } = req.body;

    const userData = await User.findOne({
      where: {
        email: email?.toLowerCase(),
      },
    });

    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }

    if (userData.email) {
      const emailOTP = generateOTP();
      await sendEmail({
        email,
        subject: "Verification Mail for VPE Forgot Password",
        message: "Your VPE Account Verification OTP is: " + emailOTP,
      });

      temporaryUserData[email?.toLowerCase()] = {
        ...temporaryUserData[email?.toLowerCase()],
        email: email?.toLowerCase(),
        emailOTP,
        expiresIn: Date.now() + 5 * 60 * 1000,
      };
    } else {
      return res.status(400).json({ error: "Please enter Email Address" });
    }

    res.status(201).json({ message: "OTP sent Successfully." });
  } catch (error) {
    console.error("Error sending Login OTP: ", error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email, emailOTP = "", password } = req.body;
    const hashedPw = await bcrypt.hash(password, 12);

    let user = await User.findOne({
      where: {
        email: email?.toLowerCase(),
      },
    });

    const currentTime = Date.now();

    if (
      !(
        temporaryUserData[email?.toLowerCase()]?.emailOTP == emailOTP &&
        temporaryUserData[email?.toLowerCase()]?.expiresIn >= currentTime
      )
    ) {
      return res.status(403).json({ error: "Invalid or Expired OTP" });
    }

    user.password = hashedPw;

    await user.save();

    let employerId = null;
    if (user.role === 4) {
      const employee = await Employee.findOne({
        where: { employeeId: user.id },
      });
      employerId = employee ? employee.employerId : null;
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
        category: user.categoryId,
        employerId,
      },
      process.env.SECRET_KEY
      // { expiresIn: process.env.JWT_EXPIRE || "1d" }
    );

    delete temporaryUserData[email?.toLowerCase()];

    res.status(200).json({
      message: "LoggedIn",
      name: user.name,
      role: user.role,
      contact: user.contact,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to reset password" });
  }
};

exports.getUserDetails = async (req, res) => {
  const userId = req.user.id;

  try {
    let userDetails = await User.findOne({
      where: { id: userId },
      attributes: ["name", "email", "contact", "gstin", "categoryId"],
      include: [
        {
          model: AddressDetail,
          as: "address_details",
          attributes: [
            "address_line_1",
            "address_line_2",
            "city",
            "state",
            "zip",
            "aadhar_pic",
            "gmap_link",
          ],
        },
        {
          model: BankDetail,
          as: "bank_details",
          attributes: [
            "holder_name",
            "account_number",
            "ifsc_code",
            "bank_name",
            "bank_address",
            "upi",
          ],
        },
      ],
    });

    if (!userDetails) {
      return res.status(404).json({ message: "User not found" });
    }

    const formattedDetails = {
      name: userDetails.name,
      email: userDetails.email,
      contact: userDetails.contact,
      gstin: userDetails.gstin,
      address_line_1: userDetails.address_details?.address_line_1 || null,
      address_line_2: userDetails.address_details?.address_line_2 || null,
      city: userDetails.address_details?.city || null,
      state: userDetails.address_details?.state || null,
      zip: userDetails.address_details?.zip || null,
      gmap_link: userDetails.address_details?.gmap_link || null,
      upi: userDetails.bank_details?.upi || null,
      category: userDetails.categoryId, // Ensure this matches your actual category data if needed
      holder_name: userDetails.bank_details?.holder_name || null,
      account_number: userDetails.bank_details?.account_number || null,
      bank_address: userDetails.bank_details?.bank_address || null,
      bank_name: userDetails.bank_details?.bank_name || null,
      ifsc_code: userDetails.bank_details?.ifsc_code || null,
    };

    return res.status(200).json(formattedDetails);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to fetch Profile details." });
  }
};

exports.updateUser = async (req, res) => {
  const {
    name,
    email,
    contact,
    password,
    gstin,
    address_line_1,
    address_line_2,
    city,
    state,
    zip,
    gmap_link,
    upi,
    category,
    holder_name,
    account_number,
    bank_address,
    bank_name,
    ifsc_code,
  } = req.body;

  const t = await sequelize.transaction();

  try {
    const userId = req.user.id;

    const user = await User.findByPk(userId, { transaction: t });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updateData = {
      name,
      email,
      contact,
      gstin,
      categoryId: category,
      ...(password && { password: await encrypt(password) }),
    };

    await user.update(updateData, { transaction: t });

    if ([1, 2].includes(req.user.role)) {
      const addressDetail = await AddressDetail.findOne({
        where: { user_id: userId },
        transaction: t,
      });

      if (addressDetail) {
        await AddressDetail.update(
          {
            address_line_1,
            address_line_2,
            city,
            state,
            zip,
            gmap_link,
          },
          { where: { user_id: userId } },
          { transaction: t }
        );
      } else {
        await AddressDetail.create({
          address_line_1,
          address_line_2,
          city,
          state,
          zip,
          gmap_link,
          user_id: req.user.id,
        });
      }

      const bankDetail = await BankDetail.findOne({
        where: { user_id: userId },
        transaction: t,
      });

      if (bankDetail) {
        await BankDetail.update(
          {
            holder_name,
            account_number,
            ifsc_code,
            bank_name,
            bank_address,
            upi,
          },
          { where: { user_id: userId } },
          { transaction: t }
        );
      } else {
        await BankDetail.create({
          holder_name,
          account_number,
          ifsc_code,
          bank_name,
          bank_address,
          upi,
          user_id: req.user.id,
        });
      }
    }

    await t.commit();

    return res
      .status(200)
      .json({ message: "User details updated successfully" });
  } catch (error) {
    await t.rollback();
    console.log(error);
    return res.status(500).json({ error: "Failed to update Profile." });
  }
};
