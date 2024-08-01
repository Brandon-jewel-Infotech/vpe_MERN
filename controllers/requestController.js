const connection = require("../utils/dbcon");

const sequelize = require("../utils/database");

const Request = require("../models/requestModel");
const User = require("../models/userModel");
const Category = require("../models/categoriesModel");
const AddressDetails = require("../models/addressDetailsModel");
const BankDetails = require("../models/bankDetailsModel");

const fs = require("fs");
const { Op } = require("sequelize");

// to create  the request to  the seller  (seller's controller) (sequelized and tested)
exports.createRequest = async (req, res) => {
  const { description, receiver, role } = req?.body;

  try {
    // Create a new request using Sequelize model
    const newRequest = await Request.create({
      createdBy: req.user.id,
      description,
      role,
      receiver,
    });

    return res
      .status(200)
      .json({ message: "Request Sent Successfully", data: newRequest });
  } catch (err) {
    console.error("Error creating request:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// to fetch  the request of  the seller  (seller's controller) (sequelized and tested)
exports.fetchRequests = async (req, res) => {
  try {
    let requests;

    if (req.user.role === 1 || req.user.role === 3) {
      // If user role is 1 (assuming 1 is an admin role)
      requests = await Request.findAll({
        attributes: [
          "id",
          "description",
          "status",
          "role",
          "response",
          "createdBy",
          "createdAt",
          "updatedAt",
        ],
        include: {
          model: User,
          attributes: ["name"],
          where: {
            id: sequelize.literal("`requests`.`createdBy` = `user`.`id`"),
          },
        },

        // where: {
        //   role: {
        //     [sequelize.literal("NOT")]: 1, // Exclude requests with role 1
        //   },
        // },
        order: [["status"], ["createdAt", "DESC"]],
      });
    } else {
      // If user role is not 1
      requests = await Request.findAll({
        attributes: [
          "id",
          "description",
          "status",
          "role",
          "response",
          "createdBy",
          "createdAt",
          "updatedAt",
        ],
        include: {
          model: User,
          attributes: ["name"],
          // where: {
          //   id: sequelize.literal("`requests`.`receiver` = `user`.`id`"),
          // },
        },
        where: {
          role: {
            [Op.not]: 0,
          },
          createdBy: req.user.id,
        },
        order: [["updatedAt", "DESC"], ["status"]],
      });
    }

    res.json(requests);
  } catch (err) {
    console.error("Error fetching requests:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//sequelized and tested
exports.fetchRequestsById = async (req, res) => {
  const { id } = req?.body;

  try {
    const requestDetails = await Request.findOne({
      attributes: [
        "id",
        [sequelize.literal("`user`.`name`"), "userName"],
        [sequelize.literal("`user`.`email`"), "userEmail"],
        [sequelize.literal("`user`.`contact`"), "userContact"],
        [sequelize.literal("`user`.`gstin`"), "userGstin"],
        "description",
        "status",
        "role",
        "response",
      ],
      include: [
        {
          model: User,
          attributes: [],
          include: [
            {
              model: Category,
              attributes: ["name"],
            },
            // {
            //   model: AddressDetails,
            //   attributes: [
            //     "gmap_link",
            //     "address_line_1",
            //     "address_line_2",
            //     "city",
            //     "state",
            //     "zip",
            //     "aadhar_pic",
            //   ],
            //   as: "addressDetails",
            // },
            // {
            //   model: BankDetails,
            //   attributes: [
            //     "holder_name",
            //     "account_number",
            //     "ifsc_code",
            //     "bank_name",
            //     "bank_address",
            //     "upi",
            //   ],
            // },
          ],
          // as: "userDetails",
        },
      ],
      where: {
        id: id,
      },
    });

    if (!requestDetails) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.json(requestDetails);
  } catch (err) {
    console.error("Error fetching request details by ID:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//sequelized but not being used anywhere
exports.searchByCode = async (req, res) => {
  const { id } = req.params;

  try {
    const requests = await Request.findAll({
      where: {
        createdBy: id,
      },
    });

    res.json(requests);
  } catch (err) {
    console.error("Error searching requests by code:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//sequelized and tested
exports.updateRequest = async (req, res) => {
  const { id } = req?.params;
  const { status, user_id, response } = req?.body;

  if (req?.body?.aadhar_pic) {
    try {
      // Perform the file deletion using your preferred method or library
      fs.unlinkSync(req?.body?.aadhar_pic);
      console.log("Delete File successfully.");
    } catch (error) {
      console.log(error);
    }
  }

  try {
    // Using a transaction for updating multiple tables
    await sequelize.transaction(async (t) => {
      // Update requests table
      let request = await Request.findOne({
        where: {
          id,
        },
        transaction: t,
      });

      request.status = status;
      request.response = response;

      await request.save();

      if (request.role === 0) {
        await AddressDetails.update(
          { aadhar_pic: "" },
          {
            where: {
              user_id,
            },
            transaction: t,
          }
        );

        await User.update(
          { status },
          {
            where: {
              id: user_id,
            },
            transaction: t,
          }
        );
      }
    });

    res.json({ message: "Successful" });
  } catch (err) {
    console.error("Error updating request:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//not sequelized
exports.updateConnection = (req, res) => {
  const { status, name } = req.body;

  const request = `UPDATE requests set status = ? requests WHERE id = ?`;
  const sql = `UPDATE users set supplier  requests WHERE id = ?`;
  connection.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send(`request deleted with ID: ${id}`);
  });
  // connection.end();
};

//sequelized but not being used anywhere
exports.deleteById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRows = await Request.destroy({
      where: {
        id,
      },
    });

    if (deletedRows > 0) {
      res.send(`Request deleted with ID: ${id}`);
    } else {
      res.status(404).send(`Request with ID ${id} not found`);
    }
  } catch (err) {
    console.error("Error deleting request by ID:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
