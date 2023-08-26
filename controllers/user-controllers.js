const User = require("../model/user");
const { convertToCSV } = require("../utils/convert-to-csv");

module.exports = {
  // Add user
  addUser: async (req, res) => {
    try {
      const {
        firstname,
        email,
        phone,
        gender,
        state,
        city,
        zip,
        address,
        dob,
        user_type,
        account_id,
        policy_id,
      } = req.body;
      const user = await User.findOne({ email: email });

      if (user) {
        // Email already exists, send a response indicating failure
        res.json({
          status: "failed",
          message: "Email already exists.",
        });
      } else {
        await User.create({
          firstname,
          email,
          phone,
          gender,
          state,
          city,
          zip,
          address,
          dob,
          user_type,
          account_id,
          policy_id,
        }).then((data) => {
          // User created successfully, send a success response with the data
          res.status(200).json({
            result: data,
            message: "User created successfully!",
          });
        });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get all users
  getUsers: async (req, res) => {
    try {
      const users = await User.find({});
      users.reverse();

      // Send a success response with the retrieved users
      res.status(200).json({ result: users });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get user by ID
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      // Send a success response with the retrieved user
      res.status(200).json({ result: user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Delete user
  deleteUsers: async (req, res) => {
    try {
      const id = req.params.id;
      const deletedUser = await User.findByIdAndDelete(id);

      if (!deletedUser) {
        // Policy not found
        return res.status(404).json({ error: "User not found" });
      }
      // Send a success response with the remaining users
      res.status(200).json({ result: deletedUser });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Edit user details
  editUsers: async (req, res) => {
    try {
      const {
        id,
        firstname,
        email,
        phone,
        gender,
        state,
        city,
        zip,
        address,
        dob,
        user_type,
        account_id,
        policy_id,
      } = req.body;

      const updatedUser = await User.findByIdAndUpdate(id, {
        firstname,
        email,
        phone,
        gender,
        state,
        city,
        zip,
        address,
        dob,
        user_type,
        account_id,
      });
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      const policyExit = updatedUser.policy_id.findIndex(
        (id) => id == policy_id
      );

      if (policyExit === -1) {
        User.updateOne({ _id: id }, { $push: { policy_id: policy_id } }).then(
          () => {}
        );
      }

      const users = await User.find({});

      // Send a success response with the updated users
      res.status(200).json({
        result: users,
        message: "User details updated successfully!",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Export CSV of user data
  exportCsv: async (req, res) => {
    try {
      const data = await User.find({});
      data.reverse();
      // Convert the data to CSV format
      const csvData = convertToCSV(data);

      // Set the HTTP headers
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=export.csv");

      // Send the CSV data as the response
      res.status(200).send(csvData);
    } catch (error) {
      res.status(500).json({ status: "failed", message: "Server error" });
    }
  },
};
