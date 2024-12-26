const { Op, fn, col } = require("sequelize");
const OrderListModel = require("../models/orderListModel");
const moment = require("moment");
const UserModel = require("../models/userModel");
const SubCategoriesModel = require("../models/subCategoriesModel");
const ProductModel = require("../models/productsModel");
const CategoriesModel = require("../models/categoriesModel");
const CompanyModel = require("../models/companyModel");
const EmployeeModel = require("../models/employeesModel");

exports.getAdminStatistics = async (req, res) => {
  try {
    const weekDates = getStartAndEndDate("week");
    const monthDates = getStartAndEndDate("month");
    const yearDates = getStartAndEndDate("year");

    const salesStats = await Promise.all([
      UserModel.count({
        where: { role: 2 },
      }),
      OrderListModel.count(),
      CategoriesModel.count(),
      CompanyModel.count(),
      OrderListModel.sum("prices", {
        where: {
          createdAt: {
            [Op.between]: [weekDates.startDate, weekDates.endDate],
          },
        },
      }),
      OrderListModel.sum("prices", {
        where: {
          createdAt: {
            [Op.between]: [monthDates.startDate, monthDates.endDate],
          },
        },
      }),
      OrderListModel.sum("prices", {
        where: {
          createdAt: {
            [Op.between]: [yearDates.startDate, yearDates.endDate],
          },
        },
      }),
    ]);

    res.status(200).json(salesStats);
  } catch (error) {
    console.error("Error fetching sales statistics:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getStartAndEndDate = (period) => {
  const now = new Date();
  let startDate, endDate;

  switch (period) {
    case "week":
      startDate = new Date(now.setDate(now.getDate() - now.getDay()));
      endDate = new Date(now.setDate(now.getDate() + 6 - now.getDay()));
      break;
    case "month":
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      break;
    case "year":
      startDate = new Date(now.getFullYear(), 0, 1);
      endDate = new Date(now.getFullYear(), 11, 31);
      break;
    default:
      throw new Error("Invalid period");
  }

  return { startDate, endDate };
};

exports.getAdminChartData = async (req, res) => {
  try {
    const topSellers = await OrderListModel.findAll({
      attributes: ["receiver", [fn("SUM", col("prices")), "totalSales"]],
      include: [
        {
          model: UserModel,
          attributes: ["name"],
          as: "reciever_details",
        },
      ],
      where: {
        stage: 6,
      },
      group: ["receiver"],
      order: [[fn("SUM", col("prices")), "DESC"]],
      limit: 10,
    });

    const topSellerSales = topSellers.map((seller) => ({
      name: seller.reciever_details.name,
      value: +seller?.dataValues?.totalSales || 0,
    }));

    const otherSellersSales = await OrderListModel.findAll({
      attributes: ["receiver", [fn("SUM", col("prices")), "totalSales"]],
      include: [
        {
          model: UserModel,
          attributes: ["name"],
          as: "reciever_details",
        },
      ],
      where: {
        receiver: {
          [Op.notIn]: topSellers.map((seller) => seller.receiver),
        },
        stage: 6,
      },
      group: ["receiver"],
    });

    const othersTotalSales = otherSellersSales.reduce(
      (sum, seller) => sum + parseFloat(seller.dataValues.totalSales),
      0
    );

    topSellerSales.push({
      name: "Others",
      value: +othersTotalSales || 0,
    });

    const lineChartData = await generateSalesChart(
      req.user.role,
      req.user.userId
    );

    res.status(200).json({
      pieChartData: topSellerSales,
      lineChartData,
    });
  } catch (error) {
    console.error("Error fetching chart data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getSellerStatistics = async (req, res) => {
  try {
    const userId = req.user.userId;

    const staticsData = await Promise.all([
      ProductModel.count({
        where: { created_by: userId },
      }),

      ProductModel.findAll({
        attributes: ["subCategory_id"],
        where: { created_by: userId },
        group: ["subCategory_id"],
      }).then((productSubCategoryIds) => {
        const subCategoryIds = productSubCategoryIds.map(
          (product) => product.subCategory_id
        );
        return SubCategoriesModel.count({
          where: { id: subCategoryIds },
        });
      }),

      OrderListModel.findAll({
        attributes: [[fn("SUM", col("prices")), "totalSales"]],
        where: {
          receiver: userId,
          stage: 6,
        },
      }).then((result) => result[0].dataValues.totalSales),

      EmployeeModel.count({
        where: { employerId: userId },
      }),

      OrderListModel.count({
        where: {
          receiver: userId,
          stage: 6,
        },
      }),

      OrderListModel.count({
        where: {
          receiver: userId,
          stage: 1,
        },
      }),

      OrderListModel.count({
        where: {
          receiver: userId,
          stage: 5,
        },
      }),
    ]);

    res.status(200).json(staticsData);
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getSellerChartData = async (req, res) => {
  try {
    const topGroups = await OrderListModel.findAll({
      attributes: ["prod_id", [fn("SUM", col("prices")), "totalSales"]],
      include: [
        {
          model: ProductModel,
          attributes: ["name"],
        },
      ],
      where: {
        stage: 6,
        receiver: req.user.userId,
      },
      group: ["prod_id"],
      order: [[fn("SUM", col("prices")), "DESC"]],
      limit: 10,
    });

    const topGroupSales = topGroups.map((group) => ({
      name: group?.dataValues?.product?.dataValues?.name,
      value: +group.dataValues.totalSales || 0,
    }));

    const totalSalesResult = await OrderListModel.findAll({
      attributes: [[fn("SUM", col("prices")), "totalSales"]],
      where: {
        stage: 6,
        receiver: req.user.userId,
      },
    });
    const totalSales = totalSalesResult[0].dataValues.totalSales;

    const topGroupsTotalSales = topGroupSales.reduce(
      (sum, group) => sum + group.value,
      0
    );

    const othersTotalSales = totalSales - topGroupsTotalSales;

    topGroupSales.push({
      name: "Others",
      value: +othersTotalSales || 0,
    });

    const lineChartData = await generateSalesChart(
      req.user.role,
      req.user.userId
    );

    res.status(200).json({ pieChartData: topGroupSales, lineChartData });
  } catch (error) {
    console.error("Error fetching pie chart data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const generateSalesChart = async (role, userId) => {
  const endDate = moment().endOf("month").toDate();
  const startDate = moment().subtract(11, "months").startOf("month").toDate();

  const whereClause = {
    createdAt: {
      [Op.between]: [startDate, endDate],
    },
    stage: 6,
  };

  if (role === 2) {
    whereClause.receiver = userId;
  }

  const lineChartData = await OrderListModel.findAll({
    attributes: [
      [fn("DATE_FORMAT", col("createdAt"), "%Y-%m"), "month"],
      [fn("SUM", col("prices")), "totalSales"],
    ],
    where: whereClause,
    group: ["month"],
    order: [["month", "ASC"]],
  });

  const allMonths = [];
  for (
    let m = moment(startDate);
    m.isBefore(moment(endDate));
    m.add(1, "month")
  ) {
    allMonths.push(m.format("YYYY-MM"));
  }

  const formattedLineChartData = allMonths.map((month) => {
    const existingData = lineChartData.find(
      (data) => data.dataValues.month === month
    );
    return {
      name: moment(month, "YYYY-MM").format("MMMM YYYY"),
      Sale: existingData ? +existingData?.dataValues?.totalSales : 0,
    };
  });

  return formattedLineChartData;
};
