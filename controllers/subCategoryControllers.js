const connection = require("../utils/dbcon");

const SubCategory = require("../models/subCategoriesModel");

exports.createSubCategory = async (req, res) => {
  const { name, cat_id } = req?.body;

  try {
    // Create a new subcategory
    await SubCategory.create({ name, cat_id });

    res.status(201).json({ message: "Successfully Added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteSubCategory = async (req, res) => {
  const { id } = req?.params;

  try {
    // Delete the subcategory
    await SubCategory.destroy({ where: { id } });

    res.status(200).json({ message: "Successfully Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
