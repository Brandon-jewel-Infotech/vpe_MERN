const Company = require("../models/companyModel");

//sequelized and tested
exports.fetchCompany = async (req, res) => {
  try {
    const result = await Company.findAll({ order: ["name"] });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//sequelized and tested
exports.createCompany = async (req, res) => {
  try {
    const { name, contact, whatsapp, email } = req?.body;

    await Company.create({ name, contact, whatsapp, email });

    res.status(201).json({ message: "Successfully Added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//sequelized and tested
exports.deleteCompany = async (req, res) => {
  try {
    const { id } = req?.params;

    await Company.destroy({
      where: { id },
    });

    res.json({ message: "Company deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//sequelized and tested
exports.updateCompany = async (req, res) => {
  try {
    const { id } = req?.params;
    const { name, contact, whatsapp, email } = req?.body;
    const updatedCompany = await Company.update(
      { name, contact, whatsapp, email },
      { where: { id } }
    );

    res
      .status(200)
      .json({ message: "Company updated successfully", updatedCompany });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
