const mongoose = require("mongoose");

// Define the user schema
const companySchema = new mongoose.Schema({
  company_name: {
    type: String,
    required: true,
    trim: true,
  },
});

// Create the user model using the schema
const companyModel = mongoose.model("Carrier", companySchema);
module.exports = companyModel;
