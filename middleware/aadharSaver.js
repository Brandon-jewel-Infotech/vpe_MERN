const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../public", "aadhar");

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    return cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    return cb(null, file.originalname);
  },
});

const upload = multer({ storage });

module.exports = upload;
