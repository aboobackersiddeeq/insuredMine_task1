const express = require("express");
const userController = require("../controllers/user-controllers");
const router = express.Router();

// Route for getting all users
router.get("/get-users", userController.getUsers);

// Route for getting a specific user by ID
router.get("/get-user/:id", userController.getUser);

// Route for adding a new user
router.post("/add-user", userController.addUser);

// Route for delete  user
router.delete("/delete-user", userController.deleteUsers);

// Route for editing user details
router.put("/edit-user", userController.editUsers);

// Route for exporting user data as CSV
router.get("/export-csv", userController.exportCsv);

module.exports = router;
