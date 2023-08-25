const mongoose = require("mongoose");

// Define the user schema
const agentSchema = new mongoose.Schema(
  {
    agent_name: {
      type: String,
      required: true,
      trim: true,
    },
  },
   
);

// Create the user model using the schema
const UserModel = mongoose.model("Agent", agentSchema);
module.exports = UserModel;