const ImageModel = require("../models/imageModel");
const path = require("path");
const fs = require("fs");

async function deleteProductImages(id, transaction = null, type) {
  try {
    const images = await ImageModel.findAll({
      where: { [type == "product" ? "product_id" : "variant_id"]: id },
      transaction,
    });
    const imageUrls = images.map((img) => path.join(__dirname, "../", img.url));

    for (const url of imageUrls) {
      if (fs.existsSync(url)) {
        fs.unlinkSync(url);
      }
    }

    await ImageModel.destroy({
      where: { [type == "product" ? "product_id" : "variant_id"]: id },
      transaction,
    });
  } catch (error) {
    console.error("Error in deleting Product Image:", error);
    throw error;
  }
}

module.exports = { deleteProductImages };
