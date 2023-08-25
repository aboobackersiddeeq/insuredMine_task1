const mongoose = require("mongoose");

// Define the user schema
const accountSchema = new mongoose.Schema(
  {
    account_name: {
      type: String,
      required: true,
      trim: true,
    },
    account_type: {
      type: String,
      required: true,
      trim: true,
    }, 
  },
   
);

// Create the user model using the schema
const UserModel = mongoose.model("Account", accountSchema);
module.exports = UserModel;