const mongoose = require("mongoose");

// Define the user schema
const lobSchema = new mongoose.Schema({
  category_name: {
    type: String,
    required: true,
    trim: true,
  },
});

// Create the user model using the schema
const lobModel = mongoose.model("LOB", lobSchema);
module.exports = lobModel;
