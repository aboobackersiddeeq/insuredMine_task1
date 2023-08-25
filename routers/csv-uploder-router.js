const express = require("express");
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const CSVFileUploader = require("../controllers/csv-uploder");
const router = express.Router();
 
// Route for  upload csv file to mongodb
router.post("/upload",upload.single('file'),CSVFileUploader.CSVFileUploader );
 


module.exports = router;