const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: Number,
      trim: true,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    zip: {
      type: String,
      required: true,
      trim: true,
    },
    dob: {
      type: String,
      required: true,
      trim: true,
    },
    account_id: {
      type: Schema.Types.ObjectId,
      ref: "Account",
    },
    policy_id: {
      type: Schema.Types.ObjectId,
      ref: "Policy",
    },
  },
  {
    timestamps: true,
  }
);

// Create the user model using the schema
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
