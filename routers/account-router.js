const express = require("express");
const accountController = require("../controllers/account-controllers");
const router = express.Router();

// Route for getting all accounts
router.get("/get-accounts", accountController.getAccounts);

// Route for getting a specific account by ID
router.get("/get-account/:id", accountController.getAccount);

// Route for adding a new account
router.post("/add-account", accountController.addAccount);

// Route for delete  account
router.delete("/delete-account/:id", accountController.deleteAccount);

// Route for editing account details
router.put("/edit-account", accountController.updateAccount);

module.exports = router;
