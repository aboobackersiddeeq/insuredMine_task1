const express = require("express");
const router = express.Router();
const policyController = require("../controllers/policy-controllers");

// Route for getting all policys
router.get("/get-policy", policyController.getPolicys);

// Route for getting a specific policy by ID
router.get("/get-policy/:id", policyController.getPolicy);

// Route for adding a new policy
router.post("/add-policy", policyController.addPolicy);

// Route for delete  policy
router.delete("/delete-policy/:id", policyController.deletePolicy);

// Route for editing policy details
router.put("/edit-policy/:id", policyController.updatePolicy);

module.exports = router;
