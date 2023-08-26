const mongoose = require("mongoose");

// Define the user schema
const accountSchema = new mongoose.Schema({
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
  user_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

// Create the user model using the schema
const accountModel = mongoose.model("Account", accountSchema);
module.exports = accountModel;
