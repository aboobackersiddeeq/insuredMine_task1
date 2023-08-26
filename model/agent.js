const mongoose = require("mongoose");

// Define the agent schema
const agentSchema = new mongoose.Schema({
  agent: {
    type: String,
    required: true,
    trim: true,
  },
});

// Create the agent model using the schema
const agentModel = mongoose.model("Agent", agentSchema);
module.exports = agentModel;
