const multer = require("multer");

// Set up Multer storage
const fileStorage = multer.diskStorage({
  // Destination to store the image
  destination: "public/images",
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

// Set up Multer file filter
const fileFilter = (req, file, callback) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/webp"
  ) {
    // Upload only png, jpeg, webp, and jpg formats
    callback(null, true);
  } else {
    callback(null, false);
  }
};

// Export the file filter and storage
module.exports = {
  fileFilter,
  fileStorage,
};

