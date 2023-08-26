const express = require("express");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const FileUploader = require("../controllers/file-uploder");
const router = express.Router();

// Route for  upload csv file to mongodb
router.post("/upload", upload.single("file"), FileUploader.FileUploader);

module.exports = router;
