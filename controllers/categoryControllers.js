const connection = require("../utils/dbcon");
const Category = require("../models/categoriesModel");
const SubCategory = require("../models/subCategoriesModel");
const sequelize = require("../utils/database");

// to get all  the category (seller's controller) )
// exports.fetchCategories = (req, res) => {
//   const { id } = req?.body;

//   let condition = "";
//   if (id) {
//     condition = "WHERE c.id = ? ";
//   }

//   const sql =
//     "SELECT c.id, c.name, GROUP_CONCAT(s.id,' ' , s.name) AS subcategories FROM categories c LEFT JOIN subcategories s ON c.id = s.cat_id ";
//   const gb = " GROUP BY c.id, c.name";
//   connection.query(sql + condition + gb, [id], (err, result) => {
//     if (err) throw err;
//     res.json(result);
//   });
// };

exports.fetchCategories = async (req, res) => {
  try {
    const { id } = req.body;

    let condition = {};
    if (id) {
      condition = { where: { id } };
    }

    const categories = await Category.findAll({
      ...condition,
      include: [
        {
          model: SubCategory,
          attributes: ["id", "name"],
          as: "subcategories",
        },
      ],
      attributes: ["id", "name"],
    });

    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// to get   the category (seller's controller) (sequelized and tested)
exports.fetchOnlyCategories = async (req, res) => {
  try {
    const { id } = req?.body;

    const categories = await Category.findAll({
      where: id ? { id } : undefined,
      attributes: ["id", "name"],
    });

    const result = categories
      .map((category) => `${category.id}|${category.name}`)
      .join(",");

    res.json({ categories: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// to get   the category (seller's controller) (sequelized and tested)
exports.createCategory = async (req, res) => {
  try {
    const { name } = req?.body;

    await Category.create({ name });

    res.status(201).json({ message: "Successfully Added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// to get   the category (seller's controller) (sequelized and tested)

exports.deleteCategory = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;

    const category = await Category.findByPk(id);
    if (!category) {
      await transaction.rollback();
      return res.status(404).json({ error: "Category not found" });
    }

    await SubCategory.destroy({
      where: { cat_id: id },
      transaction,
    });

    const result = await Category.destroy({
      where: { id },
      transaction,
    });

    await transaction.commit();

    res.json({
      message: `Category with ID ${id} and its subcategories deleted`,
      deletedCount: result,
    });
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// to get   the category (seller's controller) (sequelized and tested)
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    // Update the category
    const updatedCategory = await Category.update(
      { name: name },
      { where: { id } }
    );
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
