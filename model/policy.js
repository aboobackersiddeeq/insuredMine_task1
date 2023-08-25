const mongoose = require("mongoose");

// Define the user schema
const polcySchema = new mongoose.Schema(
  {
    policy_number: {
      type: Number,
      required: true,
      trim: true,
    },
    policy_mode: {
      type: String,
      required: true,
      trim: true,
    },
    policy_type: {
      type: Number,
      trim: true,
      required: true,
    },
    policy_start_date: {
      type: Date,
      required: false,
    },
    policy_end_date: {
      type: Date,
      required: false,
    },
    csr: {
      type: String,
      required: true,
      trim: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    company_id: {
      type: Schema.Types.ObjectId,
      ref: "Carrier",
    },
    lob_id: {
      type: Schema.Types.ObjectId,
      ref: "LOB",
    },
    agent_id: {
      type: Schema.Types.ObjectId,
      ref: "Agent",
    },
  },
  {
    timestamps: true,
  }
);

// Create the user model using the schema
const UserModel = mongoose.model("Po", userSchema);

module.exports = UserModel;
