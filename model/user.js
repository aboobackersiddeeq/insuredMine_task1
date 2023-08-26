const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
      required: true,
    },
    gender: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    userType: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      trim: true,
    },
    dob: {
      type: String,
      required: true,
      trim: true,
    },
    account_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
    policy_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Policy",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Create the user model using the schema
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
