const express = require("express");
const userController = require("../controllers/user-controllers");
const router = express.Router();

// Route for getting all users
router.get("/get-users", userController.getUsers);

// Route for searching user data
router.get("/search", userController.searchUserData);

// Route for exporting user data as CSV
router.get("/export-csv", userController.exportCsv);

// Route for getting a specific user by ID
router.post("/get-user", userController.getUser);

// Route for adding a new user
router.post("/add-user", userController.addUser);

// Route for delete  user
router.post("/delete-user", userController.deleteUsers);

// Route for updating the active status of a user
router.post("/active-user", userController.activeUser);

// Route for editing user details
router.post("/edit-user", userController.editUsers);


module.exports = router;
